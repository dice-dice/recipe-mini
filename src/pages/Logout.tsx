import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../ui/Button";
import { logout } from "../services/auth";

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupBox = styled.div`
  background: var(--color-grey-0);
  padding: 2.4rem 3rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  text-align: center;
`;

export default function Logout() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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
        Logout
      </Button>

      {showPopup && (
        <PopupOverlay>
          <PopupBox>
            <p>LogOutしますか？</p>
            <Button size="medium" variation="primary" onClick={handleSubmit}>
              はい
            </Button>
            <Button
              size="medium"
              variation="primary"
              onClick={() => setShowPopup(false)}
            >
              いいえ
            </Button>
          </PopupBox>
        </PopupOverlay>
      )}
    </>
  );
}
