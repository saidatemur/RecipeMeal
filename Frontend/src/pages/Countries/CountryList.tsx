import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Country {
  countryId: number;
  name: string;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { continentId } = useParams<{ continentId: string }>();

  useEffect(() => {
    if (continentId) {
      const continentIdNumber = parseInt(continentId, 10);
      if (!isNaN(continentIdNumber)) {
        fetch(`http://localhost:5113/api/Countries/${continentIdNumber}`, { credentials: "include" })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setCountries(data);
            setIsLoading(false);
          })
          .catch(_error => {
            setError("Error fetching countries");
            setIsLoading(false);
          });
      } else {
        setError("Invalid continent ID");
        setIsLoading(false);
      }
    } else {
      setError("Continent ID is missing");
      setIsLoading(false);
    }
  }, [continentId]);

  const handleCountryClick = (countryId: number) => {
    navigate(`/meal-types/${countryId}`);
  };

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div className="card" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="card-header" style={{ backgroundColor: "#f8f9fa", textAlign: "center" }}>
          Ülkeler
        </h3>
        <div className="card-body" style={{ padding: "20px" }}>
          {isLoading ? (
            <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#888" }}>Loading countries...</p>
          ) : error ? (
            <p style={{ textAlign: "center", color: "red", fontSize: "1.2rem" }}>{error}</p>
          ) : (
            <ul className="list-group" style={{ listStyle: "none", padding: 0 }}>
              {countries.map(country => (
                <li
                  key={country.countryId}
                  className="list-group-item"
                  style={{
                    cursor: "pointer",
                    padding: "12px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f0f0f0",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => handleCountryClick(country.countryId)}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d6d6d6")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                >
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{country.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
