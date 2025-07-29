import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useLoggedInInfoContext } from "../Contexts/LoggedInInfoContext";

const Login = () => {
  const cookies = new Cookies();
  const { setLoggedInInfo } = useLoggedInInfoContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch("http://localhost:5113/api/authentication/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json(); // Başarılı yanıtı JSON olarak döndür
        return response.json().then((error) => {
          throw new Error(error?.message || "Unauthorized");
        });
      })
      .then((response) => {
        // Eğer "errors" nesnesi varsa, hataları göster
        if ("errors" in response) {
          Object.keys(response.errors).forEach((key) => {
            toast.error(response.errors[key]);
          });
        } else {
          cookies.set("loggedInUserId", response.userId, {
            expires: new Date(response.expireDate),
          });
          cookies.set("loggedInUsername", response.username, {
            expires: new Date(response.expireDate),
          });
          cookies.set("loggedInRole", response.role, {
            expires: new Date(response.expireDate),
          });
  
          setLoggedInInfo(response); // Giriş bilgilerini güncelle
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(error.message || "An error occurred during login.");
      });
  }

  return (
    <>
      <Modal show>
        <Modal.Header>
          <Modal.Title>Giriş</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Kullanıcı adı
            </label>
            <input
              name="name"
              value={username}
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı Adınızı Girin"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              name="password"
              value={password}
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-success btn-lg px-4 py-2 rounded-pill"
              onClick={handleLogin}
            >
              Giriş
            </button>
            <button
              className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
              onClick={() => window.location.href = '/register'}
            >
              Kayıt Ol
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
