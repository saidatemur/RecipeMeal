import { useEffect, useState } from "react";
import { useLoggedInInfoContext } from "../../Contexts/LoggedInInfoContext";
import { Navigate } from "react-router-dom";

// Define the Country type
interface Country {
  countryId: number;
  name: string;
  continentName: string; 
  continentId: number;
}

const CountriesList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState<{ name: string; continentId: number }>({
    name: "",
    continentId: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [error,setError] = useState('');
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;



  // ulkeleri cekme
  useEffect(() => {
    fetch("http://localhost:5113/api/countries", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // ulke ekleme
  const handleAddCountry = () => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }

    fetch("http://localhost:5113/api/countries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCountry),
    })
      .then((response) => response.json())
      .then((data) => {
        setCountries((prev) => [...prev, data]);
        setNewCountry({ name: "", continentId: 0 });
      })
      .catch((error) => console.error("Error adding country:", error));
  };

  // ulke silme
  const handleDeleteCountry = (id: number) => {
    if (loggedInInfo.role !== "Admin") {
      setError("Bu işlem için yetkiniz yok.");
      return;
    }

    fetch(`http://localhost:5113/api/countries/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setCountries((prev) => prev.filter((country) => country.countryId !== id));
        }
      })
      .catch((error) => console.error("Error deleting country:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Ülkeler</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="d-inline-block">Yeni Ülke Ekle</h3>
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
            placeholder="Ülke İsmi"
            value={newCountry.name}
            onChange={(e) =>
              setNewCountry((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Ülke ID"
            value={newCountry.continentId}
            onChange={(e) =>
              setNewCountry((prev) => ({ ...prev, continentId: parseInt(e.target.value) }))
            }
          />
          <button 
            className="btn btn-success" 
            onClick={handleAddCountry}
            disabled={loggedInInfo.role !== "Admin"}
            >
            Kaydet
          </button>
        </div>
      )}

      {/* List of Countries */}
      <h3>Ülkeler Listesi</h3>
      <ul className="list-group">
        {countries.map((country) => (
          <li key={country.countryId} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {country.name} 
            </span>
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => handleDeleteCountry(country.countryId)}
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

export default CountriesList;
