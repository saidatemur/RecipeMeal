//import { Continent } from "../Continents/Continent.tsx";
import { MealType } from "../MealTypes/MealType";

export type Country = {
  id: number;
  name: string;
  continentId: number;
  mealTypes: MealType[];
};