import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  padding: 1.6rem 3.2rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
  a {
    color: var(--color-grey-500);
    font-weight: 500;
    text-decoration: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-grey-500);
  font-weight: 500;
  text-decoration: none;

  &.active {
    color: var(--color-grey-900);
    font-weight: 600;
  }

  &:hover {
    color: var(--color-grey-700);
  }
`;

export default function PublicLayout() {
  useEffect(function () {
    const root = document.documentElement.classList;
    root.remove("dark-mode");
  }, []);

  return (
    <>
      <Header>
        <Nav>
          <StyledNavLink to="/">ホーム</StyledNavLink>
          <StyledNavLink to="/overview">Recipe Miniとは?</StyledNavLink>
          <StyledNavLink to="/registration">登録</StyledNavLink>
          <StyledNavLink to="/login">ログイン</StyledNavLink>
        </Nav>
      </Header>

      <Outlet />
    </>
  );
}
