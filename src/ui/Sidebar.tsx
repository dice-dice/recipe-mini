import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logout from "../pages/Logout";
import { media } from "../styles/media";


const StyleSidebar = styled.aside<{ $open: boolean }>`
  background-color: var(--color-grey-0);
  padding: 2.4rem 1.6rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  /* ===== PC ===== */
  position: static;
  transform: none;

  /* ===== Tablet & Mobile ===== */
  @media ${media.tablet} {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 24rem;
    z-index: 1000;

    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease;
  }
`;


const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-700);
  text-decoration: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1.4rem;

  &.active {
    background-color: var(--color-brand-100);
    color: var(--color-brand-700);
    font-weight: 600;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({open, onClose}: Props) {
  return (
    <StyleSidebar $open={open}>
      <StyledNavLink to={"/app/recipes"} onClick={onClose}>recipes</StyledNavLink>
      <StyledNavLink to={"/app/add"} onClick={onClose}>recipe追加</StyledNavLink>
      <StyledNavLink to={"/app/profile"} onClick={onClose}>password変更</StyledNavLink>
      <Logout button_comment={"logout"} />
    </StyleSidebar>
  )
}
