import { Link, Navigate, Outlet } from "react-router";
import { useLoggedInInfoContext } from "../Contexts/LoggedInInfoContext.tsx";

const UserLayout = () => {
  const { loggedInInfo, setLoggedInInfo } = useLoggedInInfoContext();

  function handleLogout() {
    fetch("http://localhost:5113/api/authentication/logout", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      if (response.ok) return setLoggedInInfo(undefined);
    });
  }

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;
  else
    return (
      <div className="container p-5">
        <nav className="navbar navbar-light justify-content-between">
          <h3>Hoş Geldin {loggedInInfo.username}</h3>
          <div className="d-flex gap-4 align-items-center">
            <Link
              to={"/"}
              className="btn btn-outline-dark btn-lg px-4 py-2 rounded-pill"
              style={{ marginRight: "20px" }} // Adds space between Home Page button and Meal Types text
            >
              Ana Sayfa
              </Link>
            <Link
              to={"/continents"}
              className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill"
            >
              Kıtalar
            </Link>
            <Link
              to={"/countries"}
              className="btn btn-outline-secondary btn-lg px-4 py-2 rounded-pill"
            >
              Ülkeler
            </Link>
            <Link
              to={"/meal-types"}
              className="btn btn-outline-success btn-lg px-4 py-2 rounded-pill"
            >
              Yemek Türleri
            </Link>
            <Link
              to={"/meals"}
              className="btn btn-outline-warning btn-lg px-4 py-2 rounded-pill"
            >
              Yemekler
            </Link>
            <button
              className="btn btn-danger btn-lg px-4 py-2 rounded-pill"
              onClick={handleLogout}
            >
              Çıkış
            </button>
          </div>
        </nav>

        <Outlet />
      </div>
    );
};

export default UserLayout;
