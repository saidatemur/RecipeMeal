import { useState } from "react";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error("Şifreler eşleşmiyor");
      // Kullanıcıya şifre uyuşmazlığı hakkında bir uyarı gösterebilirsiniz.
      return;
    }
    fetch("http://localhost:5113/api/Authentication/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword, isAdmin }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Kayıt başarısız');
      }
      return response.json();
    })
    .then(data => {
      console.log('Kayıt başarılı:', data);
      setRedirect(true);
    })
    .catch((error) => {
      console.error('Kayıt hatası:', error);
    });
  };

  return (
    <>
      {redirect && <Navigate to="/login" />}
      <div className="container p-5">
        <h2>Üye Ol</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">Kullanıcı Adı:</label>
            <input 
              type="text" 
              id="username" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adı girin"
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Şifre:</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre girin"
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Şifre Tekrarı:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="form-control" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Şifreyi tekrar girin"
              required 
            />
          </div>

          <div className="mb-4 form-check">
            <input 
              type="checkbox" 
              id="isAdmin" 
              className="form-check-input" 
              checked={isAdmin} 
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isAdmin">Admin misiniz?</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
