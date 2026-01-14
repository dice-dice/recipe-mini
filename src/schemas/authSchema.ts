import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードは必須です"),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "氏名は必須です")
      .max(50, "氏名は50文字以内で入力してください"),
    email: z
      .string()
      .min(1, "メールアドレスは必須です")
      .email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "パスワードは英字と数字を含めてください"
      ),
    passwordConfirm: z.string().min(1, "パスワード確認は必須です"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["passwordConfirm"],
  });

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "パスワードは英字と数字を含めてください"
      ),
    new_passwordConfirm: z.string().min(1, "パスワード確認は必須です"),
  })
  .refine((data) => data.new_password === data.new_passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["new_passwordConfirm"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
