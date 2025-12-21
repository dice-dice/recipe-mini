
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export default function AppLayout() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  
  useEffect(function() {
const root = document.documentElement;
    root.classList.toggle("dark-mode", theme === "dark");
  },[theme]);

  function toggleTheme() {
    setTheme((priv) => {
      const newTheme = priv === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }
  return (
    <StyledAppLayout>
      <Header theme={theme} toggleTheme ={toggleTheme}/>
      <Sidebar/>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}
