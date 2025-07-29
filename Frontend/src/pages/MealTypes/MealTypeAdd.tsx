import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { useLoggedInInfoContext } from '../../components/Contexts/LoggedInInfoContext';
import { Navigate } from 'react-router-dom';

interface Props {
  countryId: number;
  handleFetch: () => void;
}
interface Props {
    countryId: number;
    handleFetch: () => void;
    buttonStyle?: React.CSSProperties;
  }

const MealTypeAdd = ({ countryId, handleFetch, buttonStyle }: Props) => {
  const [show, setShow] = useState(false);
  const [mealTypeId, setMealTypeId] = useState<number | "">("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;

  const handleAdd = () => {
    if (mealTypeId === "") {
      toast.error("Please select a Meal Type ID");
      return;
    }

    if (loggedInInfo.role !== "Admin") {
      setError("Yalnızca adminler kıta ekleyebilir.");
      return;
    }

    fetch(`http://localhost:5113/api/Countries/${countryId}/MealTypes`, {
      method: "POST",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json" 
    },
      body: JSON.stringify({ MealTypeId: mealTypeId }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "An error occurred");
          });
        }
        return response.json();
      })
      .then(() => {
        toast.success("Meal Type added successfully");
        handleFetch();
        handleClose();
      })
      .catch(() => {
        toast.error(error || "An error occurred");
      });
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleShow} disabled={loggedInInfo.role !== "Admin"} style={buttonStyle}>
        <i className="bi bi-plus-lg"></i> Yemek Türü Ekle
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yemek Türü Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="mealTypeId" className="form-label">
              Yemek Türü ID
            </label>
            <input
              type="number"
              className="form-control"
              id="mealTypeId"
              value={mealTypeId}
              onChange={(e) => setMealTypeId(Number(e.target.value))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleAdd} disabled={loggedInInfo.role !== "Admin"}>
            Ekle
          </button>
          <button className="btn btn-secondary" onClick={handleClose} disabled={loggedInInfo.role !== "Admin"}> 
            İptal
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MealTypeAdd;
