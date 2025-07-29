import { useEffect, useState } from "react";
import { useLoggedInInfoContext } from "../../Contexts/LoggedInInfoContext";
import { Navigate } from "react-router-dom";

interface Continent {
  continentId: number;
  name: string;
  imageUrl: string;
}

const ContinentsList = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [newContinent, setNewContinent] = useState({ name: "", imageUrl: "" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;


  // tum kıtaları çek
  useEffect(() => {
    fetch("http://localhost:5113/api/continents", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch continents.");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched continents:", data);
        setContinents(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  // kıta ekleme
  const handleAddContinent = () => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }
  
    if (!newContinent.name || !newContinent.imageUrl) {
      setError("Name and Image URL are required.");
      return;
    }

    fetch("http://localhost:5113/api/continents", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newContinent),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add continent.");
        return response.json();
      })
      .then((addedContinent: Continent) => {
        setContinents((prev) => [...prev, addedContinent]);
        setNewContinent({ name: "", imageUrl: "" });
        setError("");
      })
      .catch((error) => setError(error.message));
  };

  // kıta silme
  const handleDeleteContinent = (id: number) => {
    if (loggedInInfo.role !== "Admin") {
      setError("Yalnızca adminler kıta ekleyebilir.");
      return;
    }

    console.log("Deleting continent with ID:", id);
    fetch(`http://localhost:5113/api/continents/${id}`, {
      method: "DELETE",
      headers: {
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete continent.");
        setContinents((prev) => prev.filter((continent) => continent.continentId !== id));
        setError("");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container">
      <h1>Kıtalar</h1>
      {error && <p className="text-danger">{error}</p>}

      {/* Add Continent Section */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3>Yeni Kıta Ekle</h3>
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
            placeholder="Kıta İsmi"
            value={newContinent.name}
            onChange={(e) =>
              setNewContinent((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Fotograf URL"
            value={newContinent.imageUrl}
            onChange={(e) =>
              setNewContinent((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
          />
          <button 
            className="btn btn-success" 
            onClick={handleAddContinent}
            disabled={loggedInInfo.role !== "Admin"}
          >
            Kaydet
          </button>
        </div>
      )}

      {/* List of Continents */}
      <h3>Kıtalar Listesi</h3>
      <ul className="list-group">
        {continents.map((continent) => (
          <li
            key={continent.continentId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{continent.name}</strong>
              <img
                src={continent.imageUrl}
                alt={continent.name}
                style={{ width: '50px', marginLeft: '10px' }}
              />
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                console.log("Deleting continent with ID:", continent.continentId);  
                handleDeleteContinent(continent.continentId)
              }}
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

export default ContinentsList;