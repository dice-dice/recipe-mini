import { supabase } from "./supabase";

// サインアップ
export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw error;
  console.log(data);
//   return data;
}

// ログイン
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// ログアウト
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
