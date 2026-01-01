import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logout from "../pages/Logout";

const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2.4rem 1.6rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
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

export default function Sidebar() {
  return (
    <StyleSidebar >
      <StyledNavLink to={"/app/recipes"}>recipes</StyledNavLink>
      <StyledNavLink to={"/app/add"}>recipe追加</StyledNavLink>
      <StyledNavLink to={"/app/profile"}>password変更</StyledNavLink>
      <Logout button_comment={"logout"}/>
    </StyleSidebar>
  )
}
