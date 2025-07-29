import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Meal } from "./Meal";

const MealsPage = () => {
  const { mealTypeId, countryId } = useParams<{ mealTypeId: string; countryId: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // API'den yemekleri çekme
  useEffect(() => {
    console.log("Meal Type ID:", mealTypeId);
    console.log("Country ID:", countryId);
    const queryParams = new URLSearchParams();
    if (mealTypeId) queryParams.append("mealTypeId", mealTypeId);
    if (countryId) queryParams.append("countryId", countryId);

    fetch(`http://localhost:5113/api/Meals/FilteredMeals?${queryParams.toString()}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        setMeals(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  }, [mealTypeId, countryId]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Yemekler
      </h2>

      {loading ? (
        <p
          style={{
            fontSize: "1.2rem",
            color: "#888",
          }}
        >
          Yemekler Yükleniyor...
        </p>
      ) : meals.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            margin: "0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {meals.map((meal) => (
            <li
              key={meal.mealId}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Link
                to={`/recipes/${meal.mealId}`}
                style={{
                  textDecoration: "none",
                  color: "#4CAF50",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  transition: "color 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2e7d32")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#4CAF50")}
              >
                {meal.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            fontSize: "1.2rem",
            color: "#f44336",
          }}
        >
          Bu filtreler için yemekler bulunamadı.
        </p>
      )}
    </div>
  );
};

export default MealsPage;
