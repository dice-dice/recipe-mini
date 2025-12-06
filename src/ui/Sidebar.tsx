import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-grey-700);
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;

  &.active {
    background-color: var(--color-brand-100);
    color: var(--color-brand-800);
    font-weight: bold;
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
    </StyleSidebar>
  )
}
