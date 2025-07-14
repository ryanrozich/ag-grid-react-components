# Tailwind CSS Styling Examples

## Headless UI + Tailwind CSS

### CategorySelector (Combobox)

```tsx
<Combobox value={value} onChange={onChange}>
  <div className="relative">
    <Combobox.Input
      className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 
                 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 
                 focus:ring-indigo-500 sm:text-sm"
      onChange={(event) => setQuery(event.target.value)}
    />
    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
    </Combobox.Button>
  </div>

  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
    <Combobox.Options
      className="absolute mt-1 max-h-60 w-full overflow-auto 
                                 rounded-md bg-white py-1 text-base shadow-lg 
                                 ring-1 ring-black ring-opacity-5 focus:outline-none 
                                 sm:text-sm"
    >
      {filteredCategories.map((category) => (
        <Combobox.Option
          key={category}
          value={category}
          className={({ active }) =>
            `relative cursor-default select-none py-2 pl-10 pr-4 
             ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`
          }
        >
          {({ selected, active }) => (
            <>
              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{category}</span>
              {selected && (
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 
                                 ${active ? "text-white" : "text-indigo-600"}`}
                >
                  <CheckIcon className="h-5 w-5" />
                </span>
              )}
            </>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  </Transition>
</Combobox>
```

### ViewManagementMenu

```tsx
<Menu as="div" className="relative inline-block text-left">
  <Menu.Button
    className="inline-flex w-full justify-center rounded-md 
                          bg-white px-3 py-2 text-sm font-semibold 
                          text-gray-900 shadow-sm ring-1 ring-inset 
                          ring-gray-300 hover:bg-gray-50"
  >
    <EllipsisVerticalIcon className="h-5 w-5" />
  </Menu.Button>

  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
    <Menu.Items
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right 
                          rounded-md bg-white shadow-lg ring-1 ring-black 
                          ring-opacity-5 focus:outline-none"
    >
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                         group flex w-full items-center px-4 py-2 text-sm`}
              onClick={onSaveView}
            >
              <ArrowDownTrayIcon
                className="mr-3 h-5 w-5 text-gray-400 
                                            group-hover:text-gray-500"
              />
              Save current view
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
</Menu>
```

## Radix UI + Tailwind CSS

### CategorySelector (Select)

```tsx
<Select.Root value={value} onValueChange={onChange}>
  <Select.Trigger
    className="inline-flex w-full items-center justify-between 
                            rounded-lg border border-gray-300 bg-white px-3 py-2 
                            text-sm shadow-sm hover:bg-gray-50 focus:outline-none 
                            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                            data-[state=open]:ring-2 data-[state=open]:ring-indigo-500"
  >
    <Select.Value placeholder="Select category" />
    <Select.Icon>
      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
    </Select.Icon>
  </Select.Trigger>

  <Select.Portal>
    <Select.Content
      className="overflow-hidden rounded-md bg-white shadow-lg 
                              ring-1 ring-black ring-opacity-5"
    >
      <Select.Viewport className="p-1">
        {categories.map((category) => (
          <Select.Item
            key={category}
            value={category}
            className="relative flex items-center rounded px-8 py-2 text-sm 
                       text-gray-900 focus:bg-indigo-600 focus:text-white 
                       focus:outline-none data-[highlighted]:bg-indigo-600 
                       data-[highlighted]:text-white"
          >
            <Select.ItemText>{category}</Select.ItemText>
            <Select.ItemIndicator
              className="absolute left-2 inline-flex 
                                            items-center"
            >
              <CheckIcon className="h-4 w-4" />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
```

### ViewManagementMenu (DropdownMenu)

```tsx
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button
      className="inline-flex h-10 w-10 items-center justify-center 
                       rounded-lg bg-white text-gray-900 shadow-sm ring-1 
                       ring-inset ring-gray-300 hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <EllipsisVerticalIcon className="h-5 w-5" />
    </button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className="z-50 min-w-[220px] rounded-md bg-white p-1 
                                    shadow-lg ring-1 ring-black ring-opacity-5"
      sideOffset={5}
    >
      <DropdownMenu.Item
        className="group relative flex cursor-default select-none 
                                   items-center rounded px-2 py-2 text-sm 
                                   text-gray-900 outline-none 
                                   data-[highlighted]:bg-indigo-600 
                                   data-[highlighted]:text-white"
      >
        <ArrowDownTrayIcon
          className="mr-3 h-5 w-5 text-gray-400 
                                      group-data-[highlighted]:text-white"
        />
        Save current view
      </DropdownMenu.Item>

      <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

      <DropdownMenu.Item
        className="group relative flex cursor-default select-none 
                                   items-center rounded px-2 py-2 text-sm 
                                   text-gray-900 outline-none 
                                   data-[highlighted]:bg-indigo-600 
                                   data-[highlighted]:text-white"
      >
        <ArrowUpTrayIcon
          className="mr-3 h-5 w-5 text-gray-400 
                                   group-data-[highlighted]:text-white"
        />
        Import views
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

## Key Styling Differences

### Headless UI

- Uses **render props** for dynamic classes: `className={({ active }) => ...}`
- Built-in **Transition** component for animations
- Simpler class application

### Radix UI

- Uses **data attributes** for state: `data-[highlighted]:bg-indigo-600`
- More semantic HTML structure
- Better for complex styling scenarios

## Tailwind CSS Integration Benefits

Both libraries work perfectly with Tailwind because:

1. **No style conflicts** - Completely unstyled
2. **Utility-first approach** - Apply classes directly
3. **State variants** - Both support dynamic styling
4. **Dark mode** - Easy with Tailwind's dark: prefix
5. **Responsive design** - Use Tailwind's responsive utilities

## Example: Dark Mode Support

### Headless UI

```tsx
<Combobox.Option
  className={({ active }) =>
    `${active
      ? 'bg-indigo-600 text-white dark:bg-indigo-500'
      : 'text-gray-900 dark:text-gray-100'}`
  }
>
```

### Radix UI

```tsx
<Select.Item
  className="text-gray-900 dark:text-gray-100
             data-[highlighted]:bg-indigo-600
             dark:data-[highlighted]:bg-indigo-500"
>
```

Both approaches are clean and maintainable!
