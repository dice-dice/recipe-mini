export type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ResetPasswordFormValues = {
  new_password: string;
  new_passwordConfirm: string;
};