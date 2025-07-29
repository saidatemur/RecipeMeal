import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MealType } from "./MealType";
import MealTypeDelete from "./MealTypeDelete";
import MealTypeAdd from "./MealTypeAdd";

const MealTypesPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API'den yemek türlerini çekme fonksiyonu
  const fetchMealTypes = () => {
    setLoading(true);
    setError(null); // Reset error on new fetch attempt
    fetch(`http://localhost:5113/api/MealTypes/${countryId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMealTypes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meal types:", error);
        setError("There was an error loading the meal types.");
        setLoading(false);
      });
  };

  // İlk yükleme sırasında mealTypes'ı çek
  useEffect(() => {
    fetchMealTypes();
  }, [countryId]);

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
        Yemek Türleri
        <MealTypeAdd
          countryId={parseInt(countryId!)}
          handleFetch={fetchMealTypes}
          buttonStyle={{
            fontSize: "12px", // Make the button smaller
            marginLeft: "20px",
            padding: "6px 10px", // Reduced padding
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        />
      </h2>

      {loading ? (
        <p style={{ fontSize: "1.2rem", color: "#888" }}>Loading meal types...</p>
      ) : error ? (
        <p style={{ fontSize: "1.2rem", color: "red" }}>{error}</p>
      ) : (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              justifyItems: "center",
              marginTop: "20px",
            }}
          >
            {mealTypes.map((mealType) => (
              <div
                key={mealType.mealTypeId}
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Link
                  to={`/countries/${countryId}/meal-types/${mealType.mealTypeId}/meals`}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    display: "block",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#4CAF50")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
                >
                  {mealType.name}
                </Link>

                <MealTypeDelete
                  mealTypeId={mealType.mealTypeId}
                  countryId={parseInt(countryId!)}
                  handleFetch={fetchMealTypes}
                  buttonStyle={{
                    position: "absolute",
                    bottom: "5px", // Adjusted for alignment
                    right: "5px",  // Adjusted for alignment
                    fontSize: "10px", // Smaller font size for the button
                    padding: "3px 6px", // Reduced padding for the delete button
                    cursor: "pointer",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealTypesPage;
