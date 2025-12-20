import styled from "styled-components";

const Page = styled.div`
  max-width: 96rem;
  margin: 0 auto;
  padding: 0 2.4rem;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2.5fr);
  gap: 4.8rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroTextBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const AppName = styled.h1`
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--color-grey-900);
`;

const Tagline = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey-800);
  max-width: 42rem;
  line-height: 1.7;

  @media (max-width: 900px) {
    max-width: none;
    margin: 0 auto;
  }
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const FeatureItem = styled.li`
  &::before {
    content: "• ";
    color: var(--color-brand-600);
    font-weight: 700;
  }
`;

export default function HomePage() {
  return (
    <Page>
      <HeroTextBlock>
        <AppName>Recipe Mini</AppName>
        <Tagline>
          あなたが普段作るレシピを、シンプルに・安全に管理するための
          ミニマルなレシピ管理アプリです。
        </Tagline>

        <FeatureList>
          <FeatureItem>ログインユーザーごとにレシピを保存・編集</FeatureItem>
          <FeatureItem>画像付きレシピ登録（Supabase Storage）</FeatureItem>
          <FeatureItem>パスワード変更などのアカウント管理機能</FeatureItem>
        </FeatureList>
      </HeroTextBlock>
    </Page>
  );
}
