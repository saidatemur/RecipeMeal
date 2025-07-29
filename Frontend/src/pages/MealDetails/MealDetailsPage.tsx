import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MealDetail } from "./MealDetail";

const RecipePage = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const [recipe, setRecipe] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // API'den yemek tarifi çekme
  useEffect(() => {
    fetch(`http://localhost:5113/api/Meals/${mealId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        setRecipe(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [mealId]);

  if (loading) {
    return <p style={{ fontSize: "1.2rem", color: "#888" }}>Loading recipe...</p>;
  }

  if (!recipe) {
    return <p style={{ fontSize: "1.2rem", color: "#f44336" }}>Recipe not found.</p>;
  }

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        marginBottom: "20px",
        fontWeight: "bold",
        color: "#333",
      }}>
        {recipe.name}
      </h2>

      <div style={{ marginBottom: "30px" }}>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }} 
        />
      </div>

      <h3 style={{
        fontSize: "1.8rem",
        marginBottom: "15px",
        fontWeight: "bold",
        color: "#4CAF50",
      }}>
        Tarif
      </h3>
      <p style={{
        fontSize: "1.2rem",
        lineHeight: "1.6",
        color: "#555",
        marginBottom: "20px",
      }}>
        {recipe.recipe}
      </p>

      {recipe.videoUrl && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{
            fontSize: "1.8rem",
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#4CAF50",
          }}>
            Video
          </h3>
          <a 
            href={recipe.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              fontSize: "1.2rem",
              color: "#007BFF",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#007BFF")}
          >
            Video İzle
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
