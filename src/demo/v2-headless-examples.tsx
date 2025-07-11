import React from "react";
import { DateFilter } from "../components/v2/DateFilter";
import "./v2-headless-styles.css";

/**
 * Clean demo showing headless UI component styling examples
 * No functional filtering - just visual demonstrations
 */
export function V2HeadlessExamples() {
  return (
    <div className="space-y-12">
      <div className="space-y-12">
        {/* Info boxes */}
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> The filter type selector (equals, before,
              after, between) is coming soon. This example shows the date input
              functionality with different styling approaches.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              🧠 What the Component Handles (The "Brain")
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h3 className="font-semibold mb-1">✅ Behavior & Logic</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Date parsing ("-7d", "yesterday", "last week")</li>
                  <li>Input validation and error states</li>
                  <li>Mode toggling (relative vs absolute)</li>
                  <li>State management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">✅ Accessibility</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>ARIA attributes (aria-pressed, aria-invalid)</li>
                  <li>Keyboard navigation</li>
                  <li>Focus management</li>
                  <li>Screen reader support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-3">
              🎨 What You Control (The "Looks")
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
              <div>
                <h3 className="font-semibold mb-1">❌ No Built-in Styles</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>No CSS files included</li>
                  <li>No default theme</li>
                  <li>No color schemes</li>
                  <li>No spacing or layout</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">🎯 Complete Freedom</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use any CSS framework</li>
                  <li>Match your design system</li>
                  <li>Implement any theme</li>
                  <li>Control every pixel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Example 1: Unstyled */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              1. Completely Unstyled
            </h2>
            <p className="text-gray-600">
              This is what you get out of the box - raw HTML elements with zero
              styling.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
            <div className="text-gray-900">
              <DateFilter>
                <DateFilter.Root>
                  <DateFilter.ModeToggle>
                    <DateFilter.ModeButton mode="relative">
                      Relative
                    </DateFilter.ModeButton>
                    <DateFilter.ModeButton mode="absolute">
                      Absolute
                    </DateFilter.ModeButton>
                  </DateFilter.ModeToggle>
                  <DateFilter.RelativeInput placeholder="Enter relative date" />
                  <DateFilter.Actions>
                    <DateFilter.ApplyButton>Apply</DateFilter.ApplyButton>
                    <DateFilter.ResetButton>Reset</DateFilter.ResetButton>
                  </DateFilter.Actions>
                </DateFilter.Root>
              </DateFilter>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-700">
            <strong>Note:</strong> No classes applied. This shows the raw HTML
            structure.
          </div>
        </section>

        {/* Example 2: Tailwind CSS */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              2. Styled with Tailwind CSS
            </h2>
            <p className="text-gray-600">
              Using utility classes and data attribute modifiers for state-based
              styling.
            </p>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-6">
            <DateFilter>
              <DateFilter.Root className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Date Filter Mode
                    </label>
                    <DateFilter.ModeToggle className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                      <DateFilter.ModeButton
                        mode="relative"
                        className="
                          flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all
                          data-[active=true]:bg-white data-[active=true]:shadow-sm 
                          data-[active=true]:text-gray-900
                          data-[inactive=true]:text-gray-500 data-[inactive=true]:hover:text-gray-700
                        "
                      >
                        Relative
                      </DateFilter.ModeButton>
                      <DateFilter.ModeButton
                        mode="absolute"
                        className="
                          flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all
                          data-[active=true]:bg-white data-[active=true]:shadow-sm 
                          data-[active=true]:text-gray-900
                          data-[inactive=true]:text-gray-500 data-[inactive=true]:hover:text-gray-700
                        "
                      >
                        Specific Dates
                      </DateFilter.ModeButton>
                    </DateFilter.ModeToggle>
                  </div>

                  <DateFilter.RelativeSection className="space-y-2">
                    <DateFilter.RelativeInput
                      className="
                        w-full px-4 py-2 text-gray-900
                        bg-white border border-gray-300 rounded-lg
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        data-[invalid=true]:border-red-500 data-[invalid=true]:focus:ring-red-500
                      "
                      placeholder="e.g., -7d, today, last week"
                    />
                    <DateFilter.HelpText className="text-sm text-gray-500">
                      Try entering "yesterday" or "-7d"
                    </DateFilter.HelpText>
                    <DateFilter.ErrorMessage className="text-sm text-red-600 font-medium" />
                  </DateFilter.RelativeSection>

                  <DateFilter.Actions className="flex gap-3 pt-2">
                    <DateFilter.ApplyButton
                      className="
                        flex-1 px-4 py-2 text-sm font-medium text-white
                        bg-blue-600 hover:bg-blue-700 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        transition-colors
                        data-[disabled=true]:bg-gray-300 data-[disabled=true]:cursor-not-allowed
                      "
                    >
                      Apply Filter
                    </DateFilter.ApplyButton>
                    <DateFilter.ResetButton
                      className="
                        px-4 py-2 text-sm font-medium text-gray-700
                        bg-white hover:bg-gray-50 rounded-lg
                        border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                        transition-colors
                      "
                    >
                      Reset
                    </DateFilter.ResetButton>
                  </DateFilter.Actions>
                </div>
              </DateFilter.Root>
            </DateFilter>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              View Tailwind Classes Used
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-x-auto">
              {`data-[active=true]:bg-white data-[active=true]:shadow-sm
data-[invalid=true]:border-red-500
data-[disabled=true]:bg-gray-300`}
            </pre>
          </details>
        </section>

        {/* Example 3: Custom Theme */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              3. Custom Design System
            </h2>
            <p className="text-gray-600">
              Using CSS classes that might come from your design system or CSS
              modules.
            </p>
          </div>

          <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
            <DateFilter>
              <DateFilter.Root className="custom-date-filter">
                <DateFilter.ModeToggle className="custom-mode-toggle">
                  <DateFilter.ModeButton
                    mode="relative"
                    className="custom-mode-btn"
                  >
                    Relative
                  </DateFilter.ModeButton>
                  <DateFilter.ModeButton
                    mode="absolute"
                    className="custom-mode-btn"
                  >
                    Absolute
                  </DateFilter.ModeButton>
                </DateFilter.ModeToggle>

                <DateFilter.RelativeSection className="custom-input-section">
                  <DateFilter.RelativeInput
                    className="custom-input"
                    placeholder="When do you want to filter?"
                  />
                  <DateFilter.ErrorMessage className="custom-error" />
                </DateFilter.RelativeSection>

                <DateFilter.Actions className="custom-actions">
                  <DateFilter.ApplyButton className="custom-btn custom-btn-primary">
                    Apply Filter
                  </DateFilter.ApplyButton>
                  <DateFilter.ResetButton className="custom-btn custom-btn-secondary">
                    Clear
                  </DateFilter.ResetButton>
                </DateFilter.Actions>
              </DateFilter.Root>
            </DateFilter>
          </div>
        </section>

        {/* Example 4: Minimal Dark Theme */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              4. Minimal Dark Theme
            </h2>
            <p className="text-gray-600">
              A minimalist approach with dark mode styling.
            </p>
          </div>

          <div className="border border-gray-800 rounded-lg p-6 bg-gray-900">
            <DateFilter>
              <DateFilter.Root className="max-w-sm mx-auto" data-theme="dark">
                <DateFilter.ModeToggle className="flex gap-2 mb-6">
                  <DateFilter.ModeButton
                    mode="relative"
                    className="minimal-toggle-btn"
                  >
                    Relative
                  </DateFilter.ModeButton>
                  <DateFilter.ModeButton
                    mode="absolute"
                    className="minimal-toggle-btn"
                  >
                    Absolute
                  </DateFilter.ModeButton>
                </DateFilter.ModeToggle>

                <DateFilter.RelativeSection>
                  <DateFilter.RelativeInput
                    className="minimal-input"
                    placeholder="Enter date..."
                  />
                  <DateFilter.ErrorMessage className="minimal-error" />
                </DateFilter.RelativeSection>

                <DateFilter.Actions className="flex gap-4 mt-6">
                  <DateFilter.ApplyButton className="minimal-btn">
                    Apply
                  </DateFilter.ApplyButton>
                  <DateFilter.ResetButton className="minimal-btn minimal-btn-ghost">
                    Reset
                  </DateFilter.ResetButton>
                </DateFilter.Actions>
              </DateFilter.Root>
            </DateFilter>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Key Concepts
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Data Attributes for State
              </h3>
              <p className="text-gray-600 mb-3">
                The component exposes its internal state through data
                attributes, allowing you to style based on state:
              </p>
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2">
                  <span className="text-purple-600">data-active="true"</span> -
                  Element is active/selected
                </div>
                <div className="mb-2">
                  <span className="text-purple-600">data-invalid="true"</span> -
                  Input validation failed
                </div>
                <div className="mb-2">
                  <span className="text-purple-600">data-disabled="true"</span>{" "}
                  - Element is disabled
                </div>
                <div>
                  <span className="text-purple-600">data-open="true"</span> -
                  Dropdown/panel is open
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Works with Any CSS Solution
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <h4 className="font-semibold mb-2 text-gray-900">
                    Utility-First
                  </h4>
                  <p className="text-sm text-gray-700">Tailwind CSS, UnoCSS</p>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <h4 className="font-semibold mb-2 text-gray-900">
                    CSS-in-JS
                  </h4>
                  <p className="text-sm text-gray-700">
                    Styled Components, Emotion
                  </p>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <h4 className="font-semibold mb-2 text-gray-900">
                    Traditional CSS
                  </h4>
                  <p className="text-sm text-gray-700">
                    CSS Modules, Sass, PostCSS
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                The Power of Headless
              </h3>
              <p className="text-gray-600">
                All four examples above use the{" "}
                <strong>exact same component</strong>. The only difference is
                the CSS classes applied. This means:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
                <li>Your design system stays consistent</li>
                <li>No style conflicts or overrides needed</li>
                <li>Smaller bundle sizes (no unused CSS)</li>
                <li>Complete control over every pixel</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
