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

    margin-left: 0.8rem; /* ← themeトグルとの間隔 */

    padding: 0.4rem; /* タップ領域だけ確保 */
    border: none;
    background: transparent;
    cursor: pointer;
    /* width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;

    border: none;
    background-color: var(--color-grey-100);
    cursor: pointer;

    transition: background-color 0.2s, transform 0.1s;

    &:hover {
      background-color: var(--color-grey-200);
    }

    &:active {
      transform: scale(0.95);
    } */
  }
`;
const MenuIcon = styled.span`
  position: relative;
  width: 1.8rem;   /* 少し横を広げてもよい */
  height: 1.4rem;  /* 全体の高さも微調整 */

  &,
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px; /* 1.5 → 2px にすると安定感が出る */
    background-color: var(--color-grey-500); /* ← 後述 */
    border-radius: 2px;
  }

  top: 50%;
  transform: translateY(-50%);

  &::before {
    top: -8px; /* 間隔を広げる */
  }

  &::after {
    top: 8px;
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
      {/* <MenuButton onClick={onMenuClick}>☰</MenuButton> */}
      <MenuButton onClick={onMenuClick}><CiMenuBurger /></MenuButton>
    </StyledHeader>
  );
}
