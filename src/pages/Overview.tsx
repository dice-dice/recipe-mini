import styled from "styled-components";
const HeroVisual = styled.section`
    border-radius: var(--border-radius-lg);
    padding: 2.4rem;
    background: var(--backdrop-color);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--color-grey-100);
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `;
  const AppScreenshot = styled.img`
    width: 50%;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-200);
    box-shadow: var(--shadow-sm);
  `;
  const VisualTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-grey-800);
  `;

  const VisualText = styled.p`
    font-size: 1.4rem;
    color: var(--color-grey-600);
    line-height: 1.6;
  `;
export default function Overview() {
  
  return (
    <HeroVisual>
      <VisualTitle>アプリのイメージ</VisualTitle>
      <VisualText>
        ログイン後は左側にサイドバー、右側にレシピ一覧や編集画面が表示される
        管理画面スタイルの UI を採用しています。
      </VisualText>
      <AppScreenshot
        src="/recipe-mini-dashboard.png"
        alt="Recipe Mini のレシピ一覧画面"
      />
      <AppScreenshot
        src="/recipe-mini-dashboard2.png"
        alt="Recipe Mini のレシピ追加画面"
      />
    </HeroVisual>
  );
}
