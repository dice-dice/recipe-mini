import styled from "styled-components";
import Button from "./Button";
import { CiMenuBurger } from "react-icons/ci";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderTitle = styled.h3`
  margin-right: auto;
`;
const MenuButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    margin-left: 0.8rem; 

    padding: 0.4rem; 
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

export default function Header({
  theme,
  toggleTheme,
  headerTitle,
  onMenuClick,
}: {
  theme: string;
  toggleTheme: () => void;
  headerTitle: string;
  onMenuClick: () => void;
}) {
  return (
    <StyledHeader>
      <HeaderTitle>{headerTitle}</HeaderTitle>
      <Button onClick={toggleTheme} variation="secondary">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </Button>
      <MenuButton onClick={onMenuClick}><CiMenuBurger /></MenuButton>
    </StyledHeader>
  );
}
