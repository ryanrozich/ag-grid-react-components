// Quick debug script to understand the filter model structure
console.log("=== DEBUGGING FILTER MODEL STRUCTURES ===");

// What QuickFilterDropdown is sending
const quickFilterModel = {
  mode: "relative",
  type: "equals", 
  expressionFrom: "Today"
};

console.log("QuickFilterDropdown sends this model:", quickFilterModel);

// What AG Grid receives at the top level
const gridFilterModel = {
  date: quickFilterModel
};

console.log("AG Grid receives this filter model:", gridFilterModel);

// What DateFilter should expect in setModel
console.log("DateFilter.setModel should receive:", quickFilterModel);

// Expected structure based on DateFilterModel interface
const expectedInterface = {
  type: "equals | notEqual | before | after | inRange",
  mode: "absolute | relative", 
  dateFrom: "Date | null (for absolute mode)",
  dateTo: "Date | null (for absolute mode)", 
  expressionFrom: "string (for relative mode)",
  expressionTo: "string (for relative mode)",
  fromInclusive: "boolean (optional)",
  toInclusive: "boolean (optional)"
};

console.log("Expected DateFilterModel interface:", expectedInterface);

// Test data to verify
const testModels = [
  {
    name: "Today (equals)",
    model: { mode: "relative", type: "equals", expressionFrom: "Today" }
  },
  {
    name: "This Week (range)", 
    model: { mode: "relative", type: "inRange", expressionFrom: "Today-6d", expressionTo: "Today+1d" }
  },
  {
    name: "Future (after)",
    model: { mode: "relative", type: "after", expressionFrom: "Today" }
  }
];

console.log("Test models to verify:");
testModels.forEach(test => {
  console.log(`${test.name}:`, test.model);
});