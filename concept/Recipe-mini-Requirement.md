# Recipe-mini要件

## 概要
- レシピの登録・変更・閲覧・消去ができる機能
- フロントエンド+Supabase
- ユーザごとのデータはSupabaseの認証・RLSで保護

## 内容は、レシピの日付、写真、レシピ方法
- 閲覧・追加・削除・変更が可能
- 閲覧はリスト化されている
- リストから詳細へはネスト構造
- 詳細で、内容の変更・削除が可能
- はじめてログインのユーザのために、このアプリの説明欄をもうける（非ログイン時閲覧可能ページ）
- 設定ページには下記を盛り込む
  
        🌙 テーマ切り替え

- 追加ページは独自ページにさせる
- レシピページはフォーマット化し、Main,Header,Sidebarはテンプレ化
- Sidebarに
  
        レシピ一覧（各行から更新画面へ遷移）
        レシピ追加
        ログアウト
        password変更

## 認証・セキュリティ
- Supabase Authのログイン制
- RLS（他のユーザのレシピの閲覧不可）

## 非機能要件
- レスポンシブ対応
- フォームは幅100%

## choose library
- react-hook-form@7.69
- react-router-dom@6.30.1(data router)
- styled-components
- hot-Toaster

## what create project
- vite@4