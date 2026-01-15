# Recipe Mini

url:https://www.food-manager.jp/

レシピ管理アプリケーション。お気に入りのレシピを登録・管理できます。

## Features

- **ユーザー認証**: Supabase Authによるサインアップ・ログイン・パスワードリセット
- **レシピ管理**: レシピの作成・編集・削除・一覧表示
- **材料グループ**: 材料をグループ分けして管理
- **調理手順**: ステップごとの調理手順を登録
- **バリデーション**: Zodによるフォームバリデーション

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: styled-components
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Form**: React Hook Form + Zod
- **Backend**: Supabase (Auth, Database, Storage)
- **Testing**: Vitest, Testing Library

## Project Structure

```
src/
├── features/
│   ├── authentication/   # 認証関連コンポーネント
│   └── recipes/          # レシピ関連コンポーネント・hooks
├── pages/                # ページコンポーネント
├── schemas/              # Zodバリデーションスキーマ
├── services/             # API・Supabase設定
├── styles/               # グローバルスタイル
├── ui/                   # 共通UIコンポーネント
└── utils/                # ユーティリティ
```

## Prerequisites

- Node.js 20.x
- npm
- Supabaseアカウント

## Installation

```bash
# リポジトリをクローン
git clone <repository-url>
cd Recipe-Mini

# 依存関係をインストール
npm install
```

## Environment Variables

プロジェクトルートに `.env` ファイルを作成し、以下の変数を設定してください：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

```bash
# 開発サーバーを起動
npm run dev
```

http://localhost:5173 でアプリケーションにアクセスできます。

## Testing

```bash
# テストを実行
npm test

# watchモードでテストを実行
npx vitest
```

## Build

```bash
# プロダクションビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

## Lint

```bash
npm run lint
```

## CI/CD

GitHub Actionsによる自動テスト・ビルドが設定されています。pushするたびに以下が実行されます：

- 依存関係のインストール
- ビルド
- テスト
