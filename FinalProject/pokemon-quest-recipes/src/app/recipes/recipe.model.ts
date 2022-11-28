import { Ingredient, Quality, RecipeType } from './constants.model';

export class Recipe {
  public id: string;

  constructor(
    public type: RecipeType,
    public ingredients: Ingredient[],
    public quality: Quality,
    public pokemon?: string
  ) {}
}
