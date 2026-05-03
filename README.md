[Vlaamse versie - de Engelse versie staat hieronder.]

# 🍳 Receptendoos

Een Vue 3-app voor receptbeheer met TypeScript strict mode, Pinia, Vue Router en Tailwind CSS. De gebruikersinterface is in het Nederlands.

## Functies
- 📋 Receptenoverzicht met responsieve rasterindeling
- ➕ Recepten toevoegen/bewerken via modal met volledige formuliervalidatie
- 🗑️ Recepten verwijderen met bevestigingsdialoog
- 🔍 Filteren op categorie, moeilijkheidsgraad, bereidingstijd + vrije tekstzoekfunctie
- 🔃 Sorteren op nieuwste, naam (A–Z) of bereidingstijd
- ❤️ Favoriet aan/uitzetten op kaarten en detailpagina
- 📄 Detailpagina met portieaanpassing (past ingrediënthoeveelheden aan)
- 🍳 Kookmodus — schermvullend stap voor stap met Wake Lock API
- 🌙 Donkere/lichte modus (navigatiebalk)
- 💾 localStorage-persistentie
- 🧪 Eenheidstests voor stores (Vitest)

## Technologiestack
- Vue 3 (Composition API + `<script setup>`)
- TypeScript strict mode (geen `any`)
- Pinia (stores)
- Vue Router 4
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vite 5
- Vitest + @vue/test-utils + happy-dom

## Projectstructuur
```
src/
├── components/
│   ├── AppNavbar.vue
│   ├── ui/           # BaseButton, BaseInput, BaseSelect, Badge, FavButton,
│   │                 # DifficultyStars, ConfirmDialog, ToastContainer
│   └── recipe/       # RecipeCard, RecipeModal, CookingMode
├── composables/      # useFormValidation, useRecipeFilter, useWakeLock
├── config/           # recipeConfig (categorieën, moeilijkheidsgraden, eenheden met Tailwind-klassen)
├── constants/        # recipeConstants (getypeerde arrays afgeleid van config)
├── helpers/          # recipeHelpers (categoryColor, difficultyColor)
├── stores/           # recipeStore, toastStore, darkModeStore
├── types/            # TypeScript-interfaces (Recipe, Ingredient, Step, FilterState, …)
├── views/            # HomeView, DetailView
├── router/           # Vue Router-configuratie
└── data/             # sampleRecipes
```

## Aan de slag
```bash
npm install
npm run dev       # ontwikkelingsserver
npm run build     # productiebuild
npm run test      # eenheidstests uitvoeren
```

---

# 🍳 Recipe Box

A Vue 3 recipe management app with TypeScript strict mode, Pinia, Vue Router, and Tailwind CSS. The UI is in Dutch.

## Features
- 📋 Recipe overview with responsive grid layout
- ➕ Add/Edit recipes via modal with full form validation
- 🗑️ Delete recipes with confirmation dialog
- 🔍 Filter by category, difficulty, prep time + free text search
- 🔃 Sort by newest, name (A–Z), or prep time
- ❤️ Favourite toggle on cards and detail page
- 📄 Detail page with portion scaler (updates ingredient quantities)
- 🍳 Cooking mode — fullscreen step-by-step with Wake Lock API
- 🌙 Dark / light mode toggle (navbar)
- 💾 localStorage persistence
- 🧪 Unit tests for stores (Vitest)

## Tech Stack
- Vue 3 (Composition API + `<script setup>`)
- TypeScript strict mode (no `any`)
- Pinia (stores)
- Vue Router 4
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vite 5
- Vitest + @vue/test-utils + happy-dom

## Project Structure
```
src/
├── components/
│   ├── AppNavbar.vue
│   ├── ui/           # BaseButton, BaseInput, BaseSelect, Badge, FavButton,
│   │                 # DifficultyStars, ConfirmDialog, ToastContainer
│   └── recipe/       # RecipeCard, RecipeModal, CookingMode
├── composables/      # useFormValidation, useRecipeFilter, useWakeLock
├── config/           # recipeConfig (categories, difficulties, units with Tailwind classes)
├── constants/        # recipeConstants (typed arrays derived from config)
├── helpers/          # recipeHelpers (categoryColor, difficultyColor)
├── stores/           # recipeStore, toastStore, darkModeStore
├── types/            # TypeScript interfaces (Recipe, Ingredient, Step, FilterState, …)
├── views/            # HomeView, DetailView
├── router/           # Vue Router config
└── data/             # sampleRecipes
```

## Getting Started
```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run test      # run unit tests
```
