
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import Button from "../ui/Button";
import ConfirmPopUp from "../ui/ConfirmPopUp";
import { useState } from "react";

export default function Logout({ button_comment}:{button_comment:string }) {
  
  const navigate = useNavigate();
const [showPopup, setShowPopup] = useState(false);

  function handleSubmit() {
    logout();
    navigate("/");
  }

  return (
    <>
    
      <Button
        onClick={() => setShowPopup(true)}
        size="small"
        variation="danger"
      >
        {button_comment}
      </Button>
      <ConfirmPopUp open={showPopup} onConfirm={handleSubmit} onClose={() => setShowPopup} message="logoutしますか？"/>
      </>
  );
}
