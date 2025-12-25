import styled, { css } from "styled-components";
import { FormProps } from "../types/recipe";

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  ${(props) =>
    props.$type !== "modal" &&
    css`
    max-width: 80rem;
    margin: 0 auto;
    padding 2.4rem 3.2rem
     background-color: var(--color-grey-0)
     border:1px solid var(--color-grey-100)
     border-radius: var(--border-radius-md)
     `}

  ${(props) =>
    props.$type == "modal" &&
    css`
      width: 80rem;
    `}

    overflow: hidden;
  font-size: 1.4rem;
`;
