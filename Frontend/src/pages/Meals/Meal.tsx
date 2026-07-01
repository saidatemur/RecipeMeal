import { MealType } from "../MealTypes/MealType";

export type Meal = {
    mealId:number ;
    name: string;
    mealTypeId: MealType;
  }