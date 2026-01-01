import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useState } from "react";
import EditRecipeForm from "../features/recipes/EditRecipeForm";
import ConfirmPopUp from "../ui/ConfirmPopUp";
import useGetRecipe from "../features/recipes/useGetRecipe";
import useDeleteRecipe from "../features/recipes/useDeleteRecipe";

import styled from "styled-components";

export const StyledRecipeDetail = styled.section`
  max-width: 80rem;
  margin: 0 auto;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const StyledRecipeHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const StyledTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-grey-900);
`;

export const StyledCategory = styled.p`
  font-size: 1.4rem;
  color: var(--color-brand-600);
  font-weight: 500;
`;

export const StyledRecipeImage = styled.img`
  width: 100%;
  max-height: 40rem;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-grey-100);
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const StyledSectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--color-grey-200);
`;

export const StyledIngredients = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const StyledStepsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-left: 1.6rem;
`;

export const StyledStepItem = styled.li`
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--color-grey-800);
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientRow = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.6rem;
`;

const IngredientName = styled.span`
  flex: 1;
`;

const IngredientAmount = styled.span`
  min-width: 6rem;
  text-align: right;
  color: var(--color-grey-600);
`;

const IngredientGroupTitle = styled.h3`
  margin-top: 1.6rem;
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

export default function RecipeDetail() {
  const [isEditing, setEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { isLoading, data: recipe, error, numericId } = useGetRecipe();
  const { mutate: deleteById } = useDeleteRecipe(numericId);
  function handleDelete() {
    deleteById();
  }
  if (isLoading) return <Spinner />;
  if (error) return <p>データの取得に失敗しました。</p>;
  return (
    <>
      <StyledRecipeDetail>
        <StyledRecipeHeader>
          <StyledTitle>{recipe?.title}</StyledTitle>
          <StyledCategory>{recipe?.category}</StyledCategory>
        </StyledRecipeHeader>

        <StyledRecipeImage
          src={recipe?.image_url ?? "/placeholder.png"}
          alt={recipe?.title ?? "no title"}
        />

        <StyledSection>
          <StyledSectionTitle>材料</StyledSectionTitle>
          <IngredientList>
            {recipe?.ingredients.map((ingredient, index) => (
              <IngredientRow key={index}>
                <IngredientName>{ingredient.name}</IngredientName>
                <IngredientAmount>{ingredient.amount}</IngredientAmount>
              </IngredientRow>
            ))}
          </IngredientList>
          {recipe?.ingredient_groups?.map((group, groupIndex) => (
            <div key={groupIndex}>
              <IngredientGroupTitle>
                （{group.group_name}）
              </IngredientGroupTitle>

              <IngredientList>
                {group.items.map((item, itemIndex) => (
                  <IngredientRow key={itemIndex}>
                    <IngredientName>{item.name}</IngredientName>
                    <IngredientAmount>{item.amount}</IngredientAmount>
                  </IngredientRow>
                ))}
              </IngredientList>
            </div>
          ))}
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>手順</StyledSectionTitle>
          <StyledStepsList>
            {recipe?.steps.map((step, index) => (
              <StyledStepItem key={index}>{step}</StyledStepItem>
            ))}
          </StyledStepsList>
        </StyledSection>
      </StyledRecipeDetail>

      <Button size="small" onClick={() => setEditing(true)}>
        編集
      </Button>
      <Button
        size="small"
        variation="danger"
        onClick={() => setShowDeletePopup(true)}
      >
        削除
      </Button>

      {isEditing && (
        <EditRecipeForm recipe={recipe!} onCancel={() => setEditing(false)} />
      )}
      <ConfirmPopUp
        open={showDeletePopup}
        message="本当に削除しますか？"
        onConfirm={handleDelete}
        onClose={() => setShowDeletePopup(false)}
      />
    </>
  );
}
