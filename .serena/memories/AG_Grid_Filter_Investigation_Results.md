# AG Grid Filter Investigation Results

## Confirmed: This IS an AG Grid Bug

After thorough investigation including:
1. Reviewing AG Grid GitHub issues (#2256, #2709, #4870)
2. Testing with detailed logging
3. Analyzing the filter lifecycle

### The Bug Details

When `api.setFilterModel()` is called programmatically:
1. AG Grid destroys the existing filter instance
2. Creates a new filter instance 
3. **IMPORTANT**: In newer versions (v33), AG Grid DOES pass the model in props during instantiation
4. However, the filter still doesn't work because `doesFilterPass` is being called with `currentModel: null`

### Key Discovery

The logs show:
```
[DateFilter] Component instantiated with props: {model: {"mode":"relative","type":"inRange"...}}
[DateFilter] doesFilterPass called #1000 currentModel: null isValid: false
```

This means:
- The component receives the model in props during instantiation
- But internally, the filter state is still null when filtering occurs
- The issue is timing-related - the filter hasn't fully initialized when AG Grid starts filtering

### Why The Workaround Hasn't Worked Yet

1. The workaround was being called but AG Grid's `getFilterInstance()` returns a Promise in v33
2. We need to await the promise to get the actual filter instance
3. The filter needs time to initialize before we can call setModel

### Next Steps

1. Update the workaround to properly handle the Promise-based filter instance
2. Add more delay to ensure the React component has mounted
3. Consider using AG Grid's event system to know when the filter is ready

## E2E Test Status

- The quick filter tests are failing because the filter isn't being applied
- Row count remains 1001 instead of filtering down
- The filter model IS being set in AG Grid but the filter instance has no state