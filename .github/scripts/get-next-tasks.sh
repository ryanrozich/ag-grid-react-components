#!/bin/bash
# Script for AI agents to find next priority tasks

OWNER=ryanrozich
REPO=ag-grid-react-components

echo "🔴 CRITICAL PRIORITY TASKS:"
gh issue list --repo $OWNER/$REPO --label "priority: critical" --label "status: ready" --state open --json number,title,labels

echo -e "\n🟠 HIGH PRIORITY TASKS:"
gh issue list --repo $OWNER/$REPO --label "priority: high" --label "status: ready" --state open --json number,title,labels

echo -e "\n🟡 MEDIUM PRIORITY TASKS:"
gh issue list --repo $OWNER/$REPO --label "priority: medium" --label "status: ready" --state open --json number,title,labels

echo -e "\n🔍 ISSUES NEEDING TRIAGE:"
gh issue list --repo $OWNER/$REPO --label "status: triage" --state open --json number,title,labels

echo -e "\n📊 SUMMARY:"
echo "Ready to work: $(gh issue list --repo $OWNER/$REPO --label "status: ready" --state open --json number | jq '. | length')"
echo "In progress: $(gh issue list --repo $OWNER/$REPO --label "status: in-progress" --state open --json number | jq '. | length')"
echo "Needs triage: $(gh issue list --repo $OWNER/$REPO --label "status: triage" --state open --json number | jq '. | length')"