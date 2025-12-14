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

// ログイン中
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  return session.user;
}

//パスワード再セット
export async function resetPassword({
  new_password,
}: {
  new_password: string;
}) {
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });
  if (error) throw error;

  return data;
}

