import { useEffect, useState } from "react";
import { useLoggedInInfoContext } from "../../Contexts/LoggedInInfoContext";
import { Navigate } from "react-router-dom";

// Define the MealType type
interface MealType {
  mealTypeId: number;
  name: string;
}

const MealTypesList = () => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [newMealType, setNewMealType] = useState<string>("");
  const [error,setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;


  // yemek turlerının cek
  useEffect(() => {
    fetch("http://localhost:5113/api/mealtypes", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setMealTypes(data))
      .catch((error) => console.error("Error fetching meal types:", error));
  }, []);

  // yemek turu ekleme
  const handleAddMealType = () => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }

    if (!newMealType) return; 

    fetch("http://localhost:5113/api/mealtypes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: newMealType }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMealTypes((prev) => [...prev, data]);
        setNewMealType(""); 
      })
      .catch((error) => console.error("Error adding meal type:", error));
  };

  // yemek turu silme
  const handleDeleteMealType = (id: number) => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }
    fetch(`http://localhost:5113/api/mealtypes/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setMealTypes((prev) => prev.filter((mealType) => mealType.mealTypeId !== id));
        }
      })
      .catch((error) => console.error("Error deleting meal type:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Yemek Türleri</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="d-inline-block">Add a New Meal Type</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
          disabled={loggedInInfo.role !== "Admin"}
        >
          {showForm ? 'İptal' : 'Ekleme'}
        </button>
      </div>

      {showForm && (
        <div className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Yemek Turu Adı"
            value={newMealType}
            onChange={(e) => setNewMealType(e.target.value)}
          />
          <button 
            className="btn btn-success" 
            onClick={handleAddMealType}
            disabled={loggedInInfo.role !== "Admin"}
            >
            Kaydetme
          </button>
        </div>
      )}

      {/* List of Meal Types */}
      <h3>Yemek Türleri Listesi</h3>
      <ul className="list-group">
        {mealTypes.map((mealType) => (
          <li key={mealType.mealTypeId} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{mealType.name}</span>
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => handleDeleteMealType(mealType.mealTypeId)}
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

export default MealTypesList;
