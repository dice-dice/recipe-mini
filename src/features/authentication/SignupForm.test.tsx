import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";

vi.mock("../../services/auth", () => ({
  signup: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーション", () => {
    it("空のフォームを送信するとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<SignupForm />, { wrapper: createWrapper() });

      await user.click(screen.getByRole("button", { name: "ユーザ登録" }));

      await waitFor(() => {
        expect(screen.getByText("氏名は必須です")).toBeInTheDocument();
      });
      expect(screen.getByText("メールアドレスは必須です")).toBeInTheDocument();
      expect(
        screen.getByText("パスワードは8文字以上で入力してください")
      ).toBeInTheDocument();
    });

    it("メールアドレスが空の場合エラーが表示される", async () => {
      const user = userEvent.setup();
      render(<SignupForm />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("氏名"), "テストユーザー");
      await user.type(screen.getByPlaceholderText("パスワード"), "password123");
      await user.type(
        screen.getByPlaceholderText("パスワード再確認"),
        "password123"
      );

      await user.click(screen.getByRole("button", { name: "ユーザ登録" }));

      await waitFor(() => {
        expect(
          screen.getByText("メールアドレスは必須です")
        ).toBeInTheDocument();
      });
    });

    it("パスワードが8文字未満でエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<SignupForm />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("氏名"), "テストユーザー");
      await user.type(
        screen.getByPlaceholderText("メールアドレス"),
        "test@example.com"
      );
      await user.type(screen.getByPlaceholderText("パスワード"), "pass1");
      await user.type(screen.getByPlaceholderText("パスワード再確認"), "pass1");

      await user.click(screen.getByRole("button", { name: "ユーザ登録" }));

      await waitFor(() => {
        expect(
          screen.getByText("パスワードは8文字以上で入力してください")
        ).toBeInTheDocument();
      });
    });

    it("パスワードに英字と数字が含まれていないとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<SignupForm />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("氏名"), "テストユーザー");
      await user.type(
        screen.getByPlaceholderText("メールアドレス"),
        "test@example.com"
      );
      await user.type(screen.getByPlaceholderText("パスワード"), "passwordonly");
      await user.type(
        screen.getByPlaceholderText("パスワード再確認"),
        "passwordonly"
      );

      await user.click(screen.getByRole("button", { name: "ユーザ登録" }));

      await waitFor(() => {
        expect(
          screen.getByText("パスワードは英字と数字を含めてください")
        ).toBeInTheDocument();
      });
    });

    it("パスワードが一致しないとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<SignupForm />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("氏名"), "テストユーザー");
      await user.type(
        screen.getByPlaceholderText("メールアドレス"),
        "test@example.com"
      );
      await user.type(screen.getByPlaceholderText("パスワード"), "password123");
      await user.type(
        screen.getByPlaceholderText("パスワード再確認"),
        "different123"
      );

      await user.click(screen.getByRole("button", { name: "ユーザ登録" }));

      await waitFor(() => {
        expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
      });
    });
  });

  describe("フォーム表示", () => {
    it("フォームが正しく表示される", () => {
      render(<SignupForm />, { wrapper: createWrapper() });

      expect(
        screen.getByRole("heading", { name: "新規登録" })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("氏名")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("パスワード再確認")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "ユーザ登録" })
      ).toBeInTheDocument();
    });
  });
});
