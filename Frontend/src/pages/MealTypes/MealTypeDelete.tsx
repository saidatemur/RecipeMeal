import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { useLoggedInInfoContext } from "../../components/Contexts/LoggedInInfoContext";
import { Navigate } from "react-router-dom";

interface Props {
  countryId: number;
  mealTypeId: number;
  handleFetch: () => void;
  buttonStyle?: React.CSSProperties; // buttonStyle ekleniyor
}

const MealTypeDelete = ({ countryId, mealTypeId, handleFetch, buttonStyle }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;

  const handleDelete = () => {
    if (loggedInInfo.role !== "Admin") {
      setError("Yalnızca adminler kıta ekleyebilir.");
      return;
    }
    fetch(`http://localhost:5113/api/Countries/${countryId}/MealTypes/${mealTypeId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "An error occurred");
          });
        }
        return response.text();
      })
      .then((message) => {
        toast.success(message);
        handleFetch();
        handleClose();
      })
      .catch(() => {
        toast.error(error || "An error occurred");
      });
  };

  return (
    <>
      <button className="btn btn-danger" onClick={handleShow} disabled={loggedInInfo.role !== "Admin"} style={buttonStyle}>
        <i className="bi bi-trash"></i> Silme
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yemek Türü Sil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Bu yemek türünü bu ülkeden silmek istediğinizden emin misiniz?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleDelete} disabled={loggedInInfo.role !== "Admin"}>
            Evet
          </button>
          <button className="btn btn-secondary" onClick={handleClose} disabled={loggedInInfo.role !== "Admin"}>
            Hayır 
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MealTypeDelete;
