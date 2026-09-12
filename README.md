# Lab 10.2: React Custom Hooks & Context API

A modern React application built with TypeScript, Vite, and DaisyUI demonstrating the creation and encapsulation of reusable logic using **Custom Hooks** (`usePagination` and `useDebounce`) alongside global state management with the **Context API**.

You can visit the site [here](https://chadgarc.github.io/lab10.2CustomHooks/)

---

## 🌟 Overview & Objectives

In modern React development, separating business logic from UI components is essential for writing scalable, clean, and maintainable code. Custom Hooks allow us to package stateful logic into pure, reusable functions that any component can consume without duplicating code.

This project showcases:

1. **`usePagination`**: Encapsulating client-side dataset chunking, page limits, index calculations, and boundary controls.
2. **`useDebounce`**: Managing rapidly changing input values with automatic cleanup timers to optimize performance and eliminate query spam.
3. **`DataContext` (`useContext`)**: Sharing data and pagination configuration globally without prop-drilling.
4. **State Preservation**: Multi-tab showcase interface allowing seamless switching between demos while keeping state intact.

---

## 🧩 Custom Hooks Explained

### 1. `usePagination` Hook (`src/hooks/usePagination.ts`)

#### **Purpose & Motivation**

Displaying large sets of data (like the 144 smartphone models in this lab) all at once degrades UX and performance. `usePagination` abstracts away all the mathematics of page slicing, boundary checking, and navigation buttons.

#### **How It Works**

- **Inputs**:
  - `totalItems`: Total number of elements to paginate.
  - `itemsPerPage`: Batch size per page (default: 10).
  - `initialPage`: Initial active page (default: 1).
- **Core Logic**:
  - **Dynamic Calculation**: `totalPages` is computed using `Math.ceil(totalItems / itemsPerPage)`.
  - **Safe Clamping**: A `useEffect` listens to `[totalPages, currentPage]` to ensure that if `itemsPerPage` changes or data shrinks, `currentPage` is automatically clamped within `[1, totalPages]`.
  - **Slice Indices**: Returns 0-based `startIndex` and `endIndex` alongside `itemsOnCurrentPage` for precise array slicing.
  - **Memoized Navigation**: Navigation functions (`setPage`, `nextPage`, `prevPage`) are memoized with `useCallback` to prevent unnecessary re-creations across renders.
  - **Boundary Flags**: Boolean helpers `canNextPage` and `canPrevPage` allow components to disable buttons directly.

```ts
const {
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  itemsOnCurrentPage,
  setPage,
  nextPage,
  prevPage,
  canNextPage,
  canPrevPage,
} = usePagination(items.length, itemsPerPage);
```

---

### 2. `useDebounce` Hook (`src/hooks/useDebounce.ts`)

#### **Purpose & Motivation**

When users type into a search input, an `onChange` event fires on every single keystroke. Triggering heavy operations or API queries on every keystroke causes lag and wastes network bandwidth. `useDebounce` postpones emitting the settled value until the user pauses typing for a specified delay.

#### **How It Works**

- **Generic Support (`<T>`)**: Accepts any value type (string, number, object).
- **Timer & Cleanup Cycle**:
  - Starts a `setTimeout` for the requested duration (`delay = 500ms`).
  - **The Cleanup Function (`clearTimeout`)**: Every time `value` or `delay` changes before the timer completes, React's `useEffect` cleanup automatically clears the previous timeout.
  - Only when the user stops typing for `delay` milliseconds does `setDebouncedValue` execute, triggering a re-render with the settled value.

```ts
const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);
```

---

## 🌐 Context API Integration (`DataContext.tsx`)

To avoid prop-drilling across different sections of the app:

- **`DataProvider`** (`src/context/DataContext.tsx`): Wraps the root application (`App.tsx`), holding the 144 smartphone items, current `itemsPerPage`, and the preset page options (`[5, 10, 15, 20]`).
- **`useDataContext()`**: Custom hook enabling any component (`PagesSetter`, `PaginationDemo`, `DebounceDemo`) to read or update the shared dataset seamlessly.

---

## 🖥️ Demo Showcase Components

The UI is built with Tailwind CSS and DaisyUI, featuring a two-tab toggle:

1. **Pagination Demo (`PaginationDemo.tsx`)**:
   - Allows selecting items per page (5, 10, 15, 20).
   - Shows current page count, items range (`Showing items X - Y (Total on this page: Z)`), and disabled states on Previous/Next buttons.
   - Includes numbered quick-jump page buttons.

2. **Debounce Search Demo (`DebounceDemo.tsx`)**:
   - Real-time search filter styled inside a DaisyUI browser mockup.
   - Live status indicator: dynamically displays **"Typing..."** while `debouncedValue !== searchTerm` and **"Waiting for input..."** once the debounce settles.
   - Adjustable delay input (in milliseconds).
   - Simulated API query via `useEffect` printing `Searching for: [value]` in the browser console.
   - Displays filtered results or a clear _"No matches"_ message.

3. **State Preservation**:
   - Both demo sections stay mounted in the DOM using CSS visibility toggling (`block` / `hidden`). Switching between tabs preserves input text, selected page, and scroll positions.

---

## 💡 Personal Reflections & Learning Insights

Building these custom hooks has been a great learning experience:

- **Encapsulation is powerful**: Moving calculations out of components made `ControlList` and `DebounceDemo` remarkably readable and declarative.
- **Rules of Hooks**: I gained a deeper understanding of why hooks must only be called at the top level of a component, never inside helper functions or JSX, to prevent React state desynchronization.
- **Cleanup in `useEffect`**: Understanding how `clearTimeout` works inside the effect return function made the debounce pattern click.
- **Continuous Learning**: While I am still mastering advanced patterns and edge cases, creating these hooks from scratch has given me much greater confidence in managing React state, side-effects, and custom abstractions.
