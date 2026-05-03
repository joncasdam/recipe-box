export const recipeConfig = {
  categories: {
    Voorgerecht: 'bg-violet-500 dark:bg-violet-500/20 dark:text-violet-400 text-white',
    Hoofdgerecht: 'bg-blue-500 dark:bg-blue-500/20 dark:text-blue-400 text-white',
    Dessert: 'bg-pink-500 dark:bg-pink-500/20 dark:text-pink-400 text-white',
    Ontbijt: 'bg-orange-400 dark:bg-orange-500/20 dark:text-orange-400 text-white',
    Drinks: 'bg-cyan-300 dark:bg-cyan-500/20 dark:text-cyan-400 text-white',
  },
  difficulties: {
    Makkelijk: 'bg-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-400 text-emerald-50',
    Gemiddeld: 'bg-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400 text-white',
    Moeilijk: 'bg-rose-500 dark:bg-rose-500/20 dark:text-rose-400 text-white',
  },
  units: ['g', 'ml', 'stuks', 'dl', 'el', 'tl', 'kopje'],
} as const