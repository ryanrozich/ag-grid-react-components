# AI-Powered Development Framework: A Velocity-Focused Approach

## 1. Executive Summary & Recommended Model

**Objective:** Achieve maximum development velocity by leveraging parallelized AI agents.

This document outlines a comprehensive framework for structuring a development lifecycle that places AI agents at the center of the coding process. It is designed to integrate seamlessly with your existing high-quality engineering practices, including TDD, CI/CD, and conventional commits.

After analyzing various topologies, this report recommends a **Hybrid Coordinator-Specialist Model**. This model balances centralized planning with decentralized execution, which is optimal for achieving velocity while maintaining quality.

- **Coordinator Agent:** A high-level agent responsible for interacting with the human developer, understanding requirements, breaking down tasks into granular GitHub issues, and creating a high-level plan.
- **Worker Agents:** Autonomous agents that are assigned individual GitHub issues. Each worker operates within its own isolated `git worktree`, develops the solution, writes tests, and creates a pull request for human review.
- **Specialist Agents (Optional but Recommended):** Post-PR creation, specialized agents can be triggered to perform tasks like generating a technical documentation summary, suggesting refactors based on a code quality scan, or creating an end-to-end test for the new feature.

**Why this model?**

- **Maximizes Parallelism:** Multiple worker agents can tackle different issues simultaneously without conflict.
- **Clear Separation of Concerns:** The Coordinator focuses on "what" and "why," while Workers focus on "how." This simplifies prompting and agent logic.
- **Scalability:** The model scales from a single developer orchestrating local agents to a distributed team where agents can be run in the cloud.
- **Leverages Existing Tooling:** It uses GitHub Issues and PRs as the central nervous system, avoiding the need for a complex, bespoke communication protocol.

---

## 2. Guiding Principles

These tenets should guide every implementation decision in this new workflow.

1.  **Human as Architect & Reviewer:** The developer's primary role shifts from writing line-by-line code to defining architecture, approving plans, and performing final quality assurance on pull requests. Your time is the most valuable resource; the system should maximize its leverage.
2.  **GitHub is the Source of Truth:** All tasks, communication, and status are managed through GitHub Issues, Projects, and Pull Requests. This provides a durable, asynchronous, and universally understood backbone for the entire process.
3.  **Isolate Everything:** Every task runs in a completely isolated environment. `git worktree` provides filesystem and branch isolation. Each agent runs as a separate process. This prevents state corruption and allows for fearless experimentation.
4.  **Embrace Asynchronous Operations:** The workflow is designed to be non-blocking. The developer can initiate a task and be notified upon completion, rather than polling or waiting for agents to finish.
5.  **Test-Driven Development is Non-Negotiable:** Agents MUST adhere to the TDD workflow defined in `GEMINI.md`. An agent's work is not "done" until it has written and passed the necessary tests. PRs with failing checks should be automatically rejected or flagged.
6.  **Automate the Automation:** The process of creating worktrees, installing dependencies, and running quality checks should be scripted and automated, callable by both the human and the coordinator agent.

---

## 3. Implementation Framework

### A. Git Worktree & Branching Strategy

`git worktree` allows you to have multiple working directories and branches checked out simultaneously. This is the cornerstone of our parallel workflow.

**Workflow:**

1.  **Setup:** Create a dedicated directory outside your project to house all worktrees.

    ```bash
    mkdir ~/ag-grid-worktrees
    ```

2.  **Task Initiation (Coordinator Agent):** When the Coordinator Agent creates a new issue (e.g., `issue-123-fix-datepicker-bug`), it will also execute a script to create the worktree.

    ```bash
    # Script: setup_worktree.sh <issue_number> <short_description>
    # Example: ./scripts/setup_worktree.sh 123 fix-datepicker-bug

    #!/bin/bash
    ISSUE_NUM=$1
    DESC=$2
    BRANCH_NAME="feature/${ISSUE_NUM}-${DESC}"
    WORKTREE_PATH="~/ag-grid-worktrees/${BRANCH_NAME}"

    # Create a new branch from main
    git fetch origin main
    git branch $BRANCH_NAME origin/main

    # Create the worktree
    git worktree add $WORKTREE_PATH $BRANCH_NAME

    # Each worktree needs its own dependencies
    cd $WORKTREE_PATH
    npm install
    ```

3.  **Agent Execution (Worker Agent):** The Worker Agent is launched and its working directory is set to `$WORKTREE_PATH`. It performs all its work there. It can commit to its branch (`feature/123-fix-datepicker-bug`) without affecting `main` or any other worktree.

4.  **Task Completion (Worker Agent):** Once the work is done, the agent pushes its branch and opens a PR.

5.  **Cleanup (Post-Merge):** After the PR is merged, a GitHub Action should automatically run a cleanup script.

    ```bash
    # Script: cleanup_worktree.sh <branch_name>
    # Example: ./scripts/cleanup_worktree.sh feature/123-fix-datepicker-bug

    #!/bin/bash
    BRANCH_NAME=$1
    WORKTREE_PATH="~/ag-grid-worktrees/${BRANCH_NAME}"

    # Remove the worktree directory
    rm -rf $WORKTREE_PATH

    # Remove the worktree metadata
    git worktree prune

    # Delete the local and remote branch
    git branch -d $BRANCH_NAME
    git push origin --delete $BRANCH_NAME
    ```

### B. Agent-to-Agent Communication & State

GitHub Issues are the communication bus.

1.  **Task Creation (Coordinator):**

    - The Coordinator creates a GitHub issue for each sub-task.
    - The issue body will contain the detailed prompt for the Worker Agent.
    - **Labels are critical for state management:**
      - `agent:todo`: New task, ready for a worker.
      - `agent:wip`: A worker has picked up the task.
      - `agent:needs-review`: The worker has created a PR.
      - `agent:done`: The PR has been merged.
      - `agent:failed`: The agent failed to complete the task.

2.  **Task Assignment:** A simple "dispatcher" script can find the oldest issue with the `agent:todo` label and assign it to an available agent. The first thing the agent does is change the label to `agent:wip` and assign the issue to itself.

3.  **PR Template:** The Worker Agent will use a structured PR template that links back to the issue and includes a summary of its work, making the human review process easier.

### C. CI/CD Integration

Your existing CI/CD pipeline (`.github/workflows/ci.yml`) is excellent and will be leveraged heavily.

- **Triggering:** The CI pipeline already triggers on `pull_request`, which is perfect. When a Worker Agent creates a PR, all the quality checks, tests, and build steps will run automatically.
- **Agent Feedback Loop:** The Worker Agent, after creating the PR, will monitor the status of these checks.
  - **Success:** If all checks pass, it will label the PR as `review:ready` and @-mention the human developer.
  - **Failure:** If checks fail, the agent can attempt to read the logs and fix the issue. This is an advanced capability. Initially, it should label the PR as `review:needs-work` and add a comment with the failure log.

### D. Prompting Strategies

1.  **Coordinator Agent Prompt (Initiation Phase):**

    - **Goal:** Decompose a high-level user request into actionable, isolated tasks.
    - **Context:** Access to the user's request, the `GEMINI.md` file, and the ability to search the codebase.
    - **Example Prompt:**
      > "You are a world-class Staff Software Engineer and project coordinator. The user wants to add a 'time zone selection' feature to the DateFilter component. Your task is to create a detailed technical plan.
      >
      > 1.  Analyze the existing `src/components/DateFilter/` directory.
      > 2.  Break down the feature into the smallest possible, independent sub-tasks that can be developed in parallel.
      > 3.  For each sub-task, create a GitHub issue with a title, a detailed description for another AI agent to implement, and the appropriate labels (`agent:todo`, `feature`, `DateFilter`).
      > 4.  The implementation must follow all rules in `GEMINI.md`, especially TDD."

2.  **Worker Agent Prompt (Execution Phase):**
    - **Goal:** Implement the code for a single, well-defined issue.
    - **Context:** The full text of the GitHub issue, the `GEMINI.md` file, and a live terminal in the correct `git worktree`.
    - **Example Prompt (from the body of a GitHub issue):**
      > "You are an expert React developer specializing in AG Grid. Your task is to add a new UI component for time zone selection.
      > **Working Directory:** `/Users/ryan/ag-grid-worktrees/feature/124-add-timezone-ui` > **Issue:** #124
      > **Requirements:**
      >
      > 1.  Create a new sub-component in `src/components/DateFilter/components/TimezoneSelector.tsx`.
      > 2.  The component should display a dropdown of common time zones.
      > 3.  The selected time zone must be stored in the filter's state.
      >     **TDD Workflow:**
      > 4.  First, create `TimezoneSelector.test.tsx`.
      > 5.  Write a failing test that checks if the dropdown renders.
      > 6.  Write the minimal code in `TimezoneSelector.tsx` to make the test pass.
      > 7.  Continue this cycle for all functionality.
      >     **Completion:**
      > 8.  Run `npm run pre-commit`.
      > 9.  If all checks pass, commit your changes with a conventional commit message, push the branch, and open a pull request."

---

## 4. The Human Developer Workflow

This new paradigm transforms your role and workflow.

**Setup:**

- You will have one primary terminal window for interacting with the Coordinator Agent.
- You might have a second terminal running a "dispatcher" that watches for `agent:todo` issues and spins up Worker Agents in the background.
- Your IDE/editor will remain on the `main` branch. You do not need to switch branches or deal with stashing. You can review PRs directly in the GitHub UI or your IDE's PR view.

**A Day in the Life:**

1.  **Morning (Planning):**

    - You open a chat with your local Coordinator Agent.
    - **You:** "Let's add support for custom date formats to the DateFilter."
    - The Coordinator asks clarifying questions. You provide answers.
    - The Coordinator presents a plan: "I will create 3 issues: 1. Update the UI to accept a format string. 2. Update the parsing logic to use the new format. 3. Update the documentation."
    - **You:** "Looks good. Proceed."
    - The Coordinator creates the issues and runs the `setup_worktree.sh` script for each. You see notifications from GitHub.

2.  **During the Day (Passive Monitoring):**

    - As you work on other things, background Worker Agents pick up the `agent:todo` issues.
    - You receive GitHub notifications as PRs are created and automatically moved to `review:ready` by the agents once CI passes.

3.  **Afternoon (Review):**
    - You open the first PR. The description is clear, it links to the issue, and all checks are green. You review the code, which is isolated to that one feature.
    - You find a small logical error. You comment on the PR: "@worker-agent Please add a check for null input here."
    - The agent (or a new one) picks up the comment, makes the change in its worktree, pushes a new commit, and the cycle repeats.
    - You review the second PR. It looks perfect. You click "Merge."
    - A GitHub Action fires, merging the code, and running the `cleanup_worktree.sh` script. Your local machine stays clean.

**Feedback Loop:**

- **Push (Notifications):** Your primary feedback mechanism is GitHub notifications. You are alerted when a plan is ready for approval, a PR is ready for review, or an agent has failed.
- **Pull (Polling):** You can always check the status of the work by viewing the GitHub Project board, which is kept up-to-date by the agents changing issue labels.
