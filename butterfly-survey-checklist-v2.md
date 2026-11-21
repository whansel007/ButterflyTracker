# IS216 Butterfly Survey Mini-Project Checklist (v2)

A comprehensive checklist for building a Vue.js 3 single-page application (SPA) to conduct butterfly field surveys, persist state, query live weather data, navigate dynamic routes, protect views with route guards, and export survey reports.

---

## 1. HTML5 & Responsive Layouts (Bootstrap 5)
- [ ] **Semantic HTML5 Markup:** Structure the application using clean semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- [ ] **12-Column Responsive Grid:** Use Bootstrap container (`.container` or `.container-fluid`), rows (`.row`), and column breakpoints (`col-12 col-md-6 col-lg-4`) to ensure butterfly cards re-flow smoothly on mobile, tablet, and desktop viewports.
- [ ] **Bootstrap UI Components & Utilities:**
  - Render species items inside Bootstrap `.card` elements with images (`.card-img-top`), titles (`.card-title`), and badges (`.badge`).
  - Use `.btn` and `.btn-group` classes for `+` and `-` counter controls.
  - Apply spacing (`m-*`, `p-*`) and flexbox (`d-flex`, `justify-content-between`, `align-items-center`) utility classes.

---

## 2. Vue.js Core Reactivity, Directives & Attribute/Style Bindings
- [ ] **Reactive State (`ref` / `reactive`):** Declare reactive primitives and objects for species counts, search queries, surveyor notes, location, and API weather data.
- [ ] **Dynamic Class Binding (`:class`):**
  - Dynamically toggle CSS classes based on state (e.g., `:class="{ 'border-success bg-light': butterfly.count > 0, 'border-secondary': butterfly.count === 0 }"` to visually highlight cards with recorded counts).
- [ ] **Dynamic Style Binding (`:style`):**
  - Bind inline styles dynamically to HTML elements (e.g., `:style="{ color: selectedColor, backgroundColor: headerBgColor }"` or setting dynamic width for progress bars `:style="{ width: surveyCompletionPercentage + '%' }"`).
- [ ] **Essential Vue Directives:**
  - **`v-for`**: Dynamically render the list of butterfly cards from an array of species objects (`v-for="butterfly in filteredButterflies" :key="butterfly.id"`).
  - **`v-model`**: Two-way data binding for form controls (search input filter box, location input field, notes textarea).
  - **`v-if` / `v-else-if` / `v-else`**: Conditionally display UI elements (e.g., showing a loading spinner while fetching weather, displaying an error alert if the API call fails, or showing a "No species found" message when search filter yields zero matches).
  - **`v-bind` (`:src`, `:alt`, `:disabled`)**: Dynamically bind image URLs, alternative text, and disable the decrement (`-`) button when count is `0`.
  - **`v-on` (`@click`, `@input`)**: Attach event listeners for count updates, survey resets, and triggering report downloads.
- [ ] **Computed Properties (`computed`):**
  - **Substring Search Filtering:** Implement a computed property to filter the butterfly array based on user search text input:
    ```javascript
    const filteredButterflies = computed(() => {
      return butterflies.value.filter(b => 
        b.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
    ```
  - **Survey Statistics:** Calculate total butterfly count across all species and count of distinct species observed.
  - **Report Text Generator:** Construct the formatted plain text string ready for file export.

---

## 3. Modular Component Architecture
- [ ] **Directory Structure:** Organize source code into `src/components/` for reusable UI components and `src/views/` for screen-level routes (`SurveyView.vue`, `ButterflyDetailView.vue`, `ReportView.vue`).
- [ ] **Props (`defineProps`):** Pass butterfly data objects (name, image, current count) down from parent views to child components (`ButterflyCard.vue`).
- [ ] **Custom Events (`defineEmits`):** Emit custom events (e.g., `@increment`, `@decrement`) from child cards to parent components to trigger state mutations.
- [ ] **Slots (`<slot>`):** Use default or named slots inside card components to allow flexible insertion of custom status badges or observation tags.

---

## 4. Data Persistence (LocalStorage)
- [ ] **JSON Serialization:** Convert reactive survey state into a JSON string via `JSON.stringify()` and save to browser storage using `localStorage.setItem('butterflySurveyData', ...)` upon state updates.
- [ ] **State Restoration (`onMounted`):** Use the `onMounted` lifecycle hook to check `localStorage.getItem('butterflySurveyData')`, parse it with `JSON.parse()`, and hydrate application state so survey progress survives browser reloads.

---

## 5. Asynchronous Requests & Public API Integration (Axios)
- [ ] **Axios GET Request:** Fetch current weather conditions asynchronously from the OpenWeather REST API using `axios.get()`.
- [ ] **Async / Await & Error Handling:** Wrap asynchronous HTTP requests in `try...catch` blocks to gracefully catch and display network or API errors.
- [ ] **Query Configuration:** Pass required query parameters (location name, unit format, API key) via the Axios request configuration object (`params: { q: location, units: 'metric', appid: apiKey }`).

---

## 6. Centralized State Management & Routing (Vue Router & Pinia)
- [ ] **Pinia Store (`defineStore`):** Centralize shared survey state, species list, weather data, and computed totals in a Pinia store module utilizing `state`, `getters`, and `actions`.
- [ ] **Client-Side Routing (`vue-router`):** Configure SPA routes (`/`, `/survey`, `/butterfly/:id`, `/report`) with `createRouter` and `<RouterLink>` / `<RouterView>` for seamless navigation without full page reloads.
- [ ] **Dynamic Parameters (`/:id` Routes):**
  - Define dynamic routes for species details (e.g., path: `'/butterfly/:id'`, component: `ButterflyDetailView.vue`).
  - Extract route parameters using `useRoute().params.id` or by passing params as props (`props: true`) to display detailed species taxonomy, habitat information, high-res photos, and observation logs.
- [ ] **Navigation & Route Guards (`router.beforeEach`):**
  - Implement global or per-route navigation guards to check survey status or user session state before resolving navigation.
  - Redirect unauthorized or invalid access (e.g., redirecting users back to `/survey` if attempting to view `/report` when no counts have been recorded, or showing a 404 notice if `:id` does not match any valid species).
  - Use `meta` fields (e.g., `meta: { requiresActiveSurvey: true }`) to declaratively protect specific routes.

---

## 7. Automated Testing Suite
- [ ] **Unit Testing (Vitest):** Write unit tests with `describe()`, `it()`, and matchers (`toBe()`, `toEqual()`) for utility functions (e.g., substring matching logic, text report formatting, route guard logic).
- [ ] **Component Testing (Vue Test Utils):** Test `ButterflyCard.vue` and `ButterflyDetailView.vue` in isolation to confirm prop rendering, event emitting on button click, route parameter handling, and dynamic class/style updates.
- [ ] **Integration Testing:** Test collaboration between parent view components, child cards, router instances, and Pinia store to verify data flow and state updates across routes.
- [ ] **End-to-End (E2E) Testing (Playwright):** Record and script an E2E test verifying:
  1. Typing into the search field filters displayed cards.
  2. Clicking a card navigates to `/butterfly/:id` detail view and displays correct species info.
  3. Route guard restricts access to `/report` until initial survey details are entered.
  4. Incrementing/decrementing counts updates total tallies.
  5. Fetching live weather data.
  6. Reloading the browser retains counts (LocalStorage check).
  7. Exporting the final survey report file.

---

## 8. Report Export & File Handling
- [ ] **Text File Generation:** Convert the generated summary string into a downloadable `.txt` file using `Blob` and an HTML5 temporary `<a>` element with the `download` attribute.
