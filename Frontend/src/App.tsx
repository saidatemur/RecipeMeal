import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoggedInInfoContextProvider } from "./components/Contexts/LoggedInInfoContext";
import AnonymousLayout from "./components/LayOuts/AnonymousLayout";
import UserLayout from "./components/LayOuts/UserLayout";
import Login from "./components/Auth/Login";
import HomePage from "./pages/HomePage";
import CountryList from "./pages/Countries/CountryList";
import MealTypesPage from "./pages/MealTypes/MealTypeList";
import MealsPage from "./pages/Meals/MealList";
import RecipePage from "./pages/MealDetails/MealDetailsPage";
import RegisterPage from "./components/Auth/RegisterPage";
import ContinentsList from "./components/LayOuts/Lists.tsx/ContinentsList";
import CountriesList from "./components/LayOuts/Lists.tsx/CountriesList";
import MealTypesList from "./components/LayOuts/Lists.tsx/MealTypesList";
import MealsList from "./components/LayOuts/Lists.tsx/MealsList";

function App() {
  const router = createBrowserRouter([
    {
      path:"/register",
      element:<RegisterPage/>
    },
    {
      element: <AnonymousLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
          caseSensitive: false,
        },
        
      ],
    },
    {
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <p>Sayfa Yok</p>,
          caseSensitive: false,
        },
        {
          path: "/countries/:continentId",
          element: <CountryList />,
          caseSensitive: false,
        },
        {
          path: "/meal-types/:countryId",
          element: <MealTypesPage />,
          caseSensitive: false,
        },
        {
          path: "/countries/:countryId/meal-types/:mealTypeId/meals",
          element: <MealsPage />,
          caseSensitive: false,
        },
        {
          path: "/recipes/:mealId",
          element: <RecipePage />,
          caseSensitive: false,
        },
        {
          path: "/continents/",
          element: <ContinentsList />,
          caseSensitive: false,
        },
        {
          path: "/countries/",
          element: <CountriesList/>,
          caseSensitive: false,
        },
        {
          path: "/meal-types/",
          element: <MealTypesList/>,
          caseSensitive: false,
        },
        {
          path: "/meals/",
          element: <MealsList/>,
          caseSensitive: false,
        }
      ],
    },

  ]);

  return (
    <>
      <LoggedInInfoContextProvider>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </LoggedInInfoContextProvider>
    </>
  );
}

export default App;
