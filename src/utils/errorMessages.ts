// Supabaseのエラーメッセージを日本語に変換
const errorTranslations: Record<string, string> = {
  "User already registered": "このメールアドレスは既に登録されています",
  "Invalid login credentials": "メールアドレスまたはパスワードが正しくありません",
  "Email not confirmed": "メールアドレスが確認されていません",
  "Password should be at least 6 characters": "パスワードは6文字以上で入力してください",
  "Unable to validate email address: invalid format": "メールアドレスの形式が正しくありません",
  "Email rate limit exceeded": "リクエスト回数の上限に達しました。しばらくしてから再度お試しください",
  "For security purposes, you can only request this once every 60 seconds": "セキュリティのため、60秒に1回のみリクエストできます",
  "New password should be different from the old password": "新しいパスワードは現在のパスワードと異なる必要があります",
};

export function translateError(message: string): string {
  return errorTranslations[message] || message;
}
