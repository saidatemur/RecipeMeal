import React, { useEffect, useState } from "react";
import { useLoggedInInfoContext } from "../../Contexts/LoggedInInfoContext";
import { Navigate } from "react-router-dom";

interface Meal {
    mealId: number;
    name:string;
    mealTypeId: number;
    countryId: number;
    recipe:string;   
  }

const MealsList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error,setError] = useState('');
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
    Name: "",
    Recipe: "",
    ImageUrl: "",
    VideoUrl: "",
    MealTypeId: 0,
    CountryId: 0,
  });
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;

  // Fetch meals from the API
  useEffect(() => {
    fetch("http://localhost:5113/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  // Handle meal deletion
  const deleteMeal = (mealId: number) => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }

    fetch(`http://localhost:5113/api/meals/${mealId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setMeals((prevMeals) => prevMeals.filter((meal) => meal.mealId !== mealId));
        }
      })
      .catch(() => {
        console.error("Error deleting meal:", error);
      });
  };

  // Handle form submission to add a new meal
  const handleAddMeal = () => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }

    fetch("http://localhost:5113/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeal),
    })
      .then((response) => response.json())
      .then((data) => {
        setMeals((prevMeals) => [...prevMeals, data]);
        setShowAddMealForm(false); // Close the form after adding the meal
        setNewMeal({
          Name: "",
          Recipe: "",
          ImageUrl: "",
          VideoUrl: "",
          MealTypeId: 0,
          CountryId: 0,
        }); // Reset form fields
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
      });
  };

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Yemek Listesi</h1>

      {/* Button to show the Add Meal form */}
      <div className="d-flex justify-content-between">
        <button
          onClick={() => setShowAddMealForm(!showAddMealForm)}
          className="btn btn-primary" 
          disabled={loggedInInfo.role !== "Admin"}
        >
          {showAddMealForm ? "İptal" : "Ekleme"}
        </button>
      </div>

      {/* Add Meal Form */}
      {showAddMealForm && (
        <div className="mt-4">
          <h2>Yeni Yemek Ekle</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMeal();
            }}
          >
            <div className="mb-3">
              <label>İsim:</label>
              <input
                type="text"
                name="Name"
                value={newMeal.Name}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label>Tarif:</label>
              <input
                type="text"
                name="Recipe"
                value={newMeal.Recipe}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label>Fotograf URL:</label>
              <input
                type="text"
                name="ImageUrl"
                value={newMeal.ImageUrl}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label>Video URL:</label>
              <input
                type="text"
                name="VideoUrl"
                value={newMeal.VideoUrl}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label>Yemek Türü ID:</label>
              <input
                type="number"
                name="MealTypeId"
                value={newMeal.MealTypeId}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label>Ülke ID:</label>
              <input
                type="number"
                name="CountryId"
                value={newMeal.CountryId}
                onChange={handleInputChange}
                className="form-control" 
              />
            </div>
            <button
              type="submit"
              className="btn btn-success" 
            >
              Ekle
            </button>
          </form>
        </div>
      )}

      {/* Display meals */}
      <ul className="list-group mt-4">
        {meals.map((meal) => (
          <li key={meal.mealId} className="list-group-item d-flex justify-content-between align-items-center">
            <h3>{meal.name}</h3>
            <p>Yemek Türü: {meal.mealTypeId}</p>
            <button
              onClick={() => deleteMeal(meal.mealId)}
              className="btn btn-danger btn-sm" 
              disabled={loggedInInfo.role !== "Admin"}
            >
              Silme
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default MealsList;
