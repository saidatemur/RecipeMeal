import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Continent {
  continentId: number;
  name: string;
  imageUrl: string;
}

const HomePage = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5113/api/Continents", { credentials: "include" })
      .then(response => response.json())
      .then(data => {
        setContinents(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Loading state
  if (isLoading) {
    return <div>Loading continents...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}> Recipe App'e Hoş Geldiniz!</h2>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "20px" }}>
      Dünyanın dört bir yanından tarifleri keşfedin!
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "20px",
        justifyItems: "center"
      }}>
        {continents.map(continent => (
          <Link
            key={continent.name}
            to={`/countries/${continent.continentId}`}
            style={{ textDecoration: "none" }}
          >
            <div 
              style={{
                background: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img 
                src={continent.imageUrl} 
                alt={continent.name} 
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginBottom: "10px"
                }}
              />
              <h3 style={{
                fontSize: "1.2rem", 
                color: "#333", 
                margin: "0"
              }}>
                {continent.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
