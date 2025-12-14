import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid var(--color-grey-100);;

`

export default function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(function() {
const root = document.documentElement;
if(theme === "dark"){
  root.classList.add("dark-mode")
} else {
  root.classList.remove("dark-mode")
}
  },[theme]);
  function toggleTheme() {
    setTheme((priv) => {
      const newTheme = priv === "light" ? "dark" : "light";
      localStorage.setItem("theme",newTheme);
      return newTheme;
    });
  }
  return <StyledHeader>
    <Button onClick={toggleTheme}>
       {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  </StyledHeader>;
}
