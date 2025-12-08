import Button from './Button'
import styled from "styled-components";

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

type ConfirmPopupProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmPopUp({message, onConfirm, open, onClose }:ConfirmPopupProps) {
    
  return (
        <>
      {open && (
        <PopupOverlay>
          <PopupBox>
            <p>{message}</p>
            <Button size="medium" variation="primary" onClick={onConfirm}>
              はい
            </Button>
            <Button
              size="medium"
              variation="primary"
              onClick={() => onClose()}
            >
              いいえ
            </Button>
          </PopupBox>
        </PopupOverlay>
      )}
    </>
  )
}
