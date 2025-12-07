import styled from "styled-components";
import type { Recipe } from "../../types/recipe";
import { NavLink } from "react-router-dom";

const Row = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.6rem 1rem;
  border-bottom: 1px solid var(--color-grey-200);
    text-decoration: none;
  color: inherit;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  background-color: var(--color-grey-100);
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-900);
`;

const Category = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;



export default function RecipeRow({ recipe }: { recipe: Recipe }) {
  return (
    <Row to={`/app/recipes/${recipe.id}`}>
      <Thumbnail
        src={recipe.image_url ?? "/placeholder.png"}
        alt={recipe.title ?? "recipe image"}
      />

      <Info>
        <Title>{recipe.title ?? "タイトルなし"}</Title>
        <Category>{recipe.category ?? "カテゴリーなし"}</Category>
      </Info>
    </Row>
  );
}


