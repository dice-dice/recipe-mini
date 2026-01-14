import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

vi.mock("../../services/auth", () => ({
  login: vi.fn(),
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

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーション", () => {
    it("空のフォームを送信するとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<LoginForm buttonName="ログイン" />, { wrapper: createWrapper() });

      await user.click(screen.getByRole("button", { name: "ログイン" }));

      await waitFor(() => {
        expect(
          screen.getByText("メールアドレスは必須です")
        ).toBeInTheDocument();
      });
      expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
    });

    it("メールアドレスが空の場合エラーが表示される", async () => {
      const user = userEvent.setup();
      render(<LoginForm buttonName="ログイン" />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("パスワード"), "password123");
      await user.click(screen.getByRole("button", { name: "ログイン" }));

      await waitFor(() => {
        expect(
          screen.getByText("メールアドレスは必須です")
        ).toBeInTheDocument();
      });
    });

    it("パスワードが空の場合エラーが表示される", async () => {
      const user = userEvent.setup();
      render(<LoginForm buttonName="ログイン" />, { wrapper: createWrapper() });

      await user.type(
        screen.getByPlaceholderText("メールアドレス"),
        "test@example.com"
      );

      await user.click(screen.getByRole("button", { name: "ログイン" }));

      await waitFor(() => {
        expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
      });
    });
  });

  describe("フォーム表示", () => {
    it("フォームが正しく表示される", () => {
      render(<LoginForm buttonName="ログイン" />, { wrapper: createWrapper() });

      expect(
        screen.getByRole("heading", { name: "ログイン" })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "ログイン" })
      ).toBeInTheDocument();
    });

    it("カスタムボタン名が表示される", () => {
      render(<LoginForm buttonName="認証する" />, { wrapper: createWrapper() });

      expect(
        screen.getByRole("button", { name: "認証する" })
      ).toBeInTheDocument();
    });
  });

  describe("フォーム入力", () => {
    it("メールアドレスとパスワードを入力できる", async () => {
      const user = userEvent.setup();
      render(<LoginForm buttonName="ログイン" />, { wrapper: createWrapper() });

      const emailInput = screen.getByPlaceholderText("メールアドレス");
      const passwordInput = screen.getByPlaceholderText("パスワード");

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      expect(emailInput).toHaveValue("test@example.com");
      expect(passwordInput).toHaveValue("password123");
    });
  });
});
