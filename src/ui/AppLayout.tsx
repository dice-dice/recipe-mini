import { Outlet, useMatches } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

    /* tablet / mobile */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;

    @media (max-width: 1024px) {
    padding: 2.4rem 1.6rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export default function AppLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
   const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(
    function () {
      const root = document.documentElement;
      root.classList.toggle("dark-mode", theme === "dark");
    },
    [theme]
  );

  function toggleTheme() {
    setTheme((priv) => {
      const newTheme = priv === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  type RouteHandle = {
  title?: string;
};
  const matches = useMatches();

const headerTitle = (() => {
  const match = matches
    .slice()
    .reverse()
    .find(m => (m.handle as RouteHandle)?.title);

  const handle = match?.handle as RouteHandle | undefined;
  return handle?.title ?? "";
})();

  return (
    <StyledAppLayout>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        headerTitle={headerTitle}
        onMenuClick={() => setSidebarOpen(v => !v)}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
