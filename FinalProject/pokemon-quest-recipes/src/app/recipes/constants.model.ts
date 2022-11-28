export const Ingredients = [
  'Tiny Mushroom',
  'Bluk Berry',
  'Apricorn',
  'Fossil',
  'Big Root',
  'Icy Rock',
  'Honey',
  'Balm Mushroom',
  'Rainbow Matter',
  'Mystical Shell',
] as const;
export type Ingredient = typeof Ingredients[number];

export const RecipeTypes = [
  'Mulligan Stew à la Cube',
  'Red Stew à la Cube',
  'Blue Soda à la Cube',
  'Yellow Curry à la Cube',
  'Gray Porridge à la Cube',
  'Mouth-Watering Dip à la Cube',
  'Plain Crepe à la Cube',
  'Sludge Soup à la Cube',
  'Mud Pie à la Cube',
  'Veggie Smoothie à la Cube',
  'Honey Nectar à la Cube',
  'Brain Food à la Cube',
  'Stone Soup à la Cube',
  'Light-as-Air Casserole à la Cube',
  'Hot Pot à la Cube',
  'Watt a Risotto à la Cube',
  'Get Swole Syrup à la Cube',
  'Ambrosia of Legends à la Cube',
] as const;
export type RecipeType = typeof RecipeTypes[number];

export const Qualities = ['Special', 'Very Good', 'Good', 'Normal'] as const;
export type Quality = typeof Qualities[number];
