import styled from "styled-components";
import Button from "./Button";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderTitle = styled.h2`
  margin-right: auto;
`

export default function Header({
  theme,
  toggleTheme,
  headerTitle
}: {
  theme: string;
  toggleTheme: () => void;
  headerTitle: string;
}) {
  return (
    <StyledHeader>
      <HeaderTitle>{headerTitle}</HeaderTitle>
      <Button onClick={toggleTheme} variation="secondary">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </Button>
    </StyledHeader>
  );
}
