import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import CreateRecipeForm from "./CreateRecipeForm";

vi.mock("./useCreateRecipe", () => ({
  useCreateRecipe: () => ({
    addRecipe: vi.fn(),
    isLoading: false,
  }),
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

describe("CreateRecipeForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーション", () => {
    it("空のフォームを送信するとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      await user.click(screen.getByRole("button", { name: "追加" }));

      await waitFor(() => {
        expect(screen.getByText("レシピ名は必須です")).toBeInTheDocument();
      });
      expect(screen.getByText("カテゴリーは必須です")).toBeInTheDocument();
    });

    it("レシピ名が100文字を超えるとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const longTitle = "あ".repeat(101);
      await user.type(screen.getByPlaceholderText("タイトル"), longTitle);
      await user.click(screen.getByRole("button", { name: "追加" }));

      await waitFor(() => {
        expect(
          screen.getByText("レシピ名は100文字以内で入力してください")
        ).toBeInTheDocument();
      });
    });

    it("カテゴリーが50文字を超えるとエラーが表示される", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      await user.type(screen.getByPlaceholderText("タイトル"), "テストレシピ");
      const longCategory = "あ".repeat(51);
      await user.type(screen.getByPlaceholderText("カテゴリー"), longCategory);
      await user.click(screen.getByRole("button", { name: "追加" }));

      await waitFor(() => {
        expect(
          screen.getByText("カテゴリーは50文字以内で入力してください")
        ).toBeInTheDocument();
      });
    });
  });

  describe("フォーム表示", () => {
    it("フォームが正しく表示される", () => {
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      expect(
        screen.getByRole("heading", { name: "レシピを追加" })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("タイトル")).toBeInTheDocument();
      expect(screen.getByText("材料")).toBeInTheDocument();
      expect(screen.getByText("STEP 1")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("カテゴリー")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
    });

    it("初期状態で材料フィールドが1つ表示される", () => {
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const ingredientNameInputs = screen.getAllByPlaceholderText("材料名");
      expect(ingredientNameInputs.length).toBeGreaterThanOrEqual(1);
    });

    it("初期状態でSTEPが1つ表示される", () => {
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      expect(screen.getByText("STEP 1")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("手順1")).toBeInTheDocument();
    });
  });

  describe("動的フィールド", () => {
    it("材料追加ボタンで材料フィールドを追加できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const initialCount = screen.getAllByPlaceholderText("材料名").length;

      const addButtons = screen.getAllByRole("button", { name: "材料を追加" });
      await user.click(addButtons[0]);

      await waitFor(() => {
        const newCount = screen.getAllByPlaceholderText("材料名").length;
        expect(newCount).toBe(initialCount + 1);
      });
    });

    it("STEP追加ボタンでSTEPを追加できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      expect(screen.queryByText("STEP 2")).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "STEPを追加" }));

      await waitFor(() => {
        expect(screen.getByText("STEP 2")).toBeInTheDocument();
      });
    });

    it("グループ追加ボタンでグループを追加できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const initialGroupInputs =
        screen.getAllByPlaceholderText("グループ名").length;

      await user.click(screen.getByRole("button", { name: "グループを追加" }));

      await waitFor(() => {
        const newGroupInputs =
          screen.getAllByPlaceholderText("グループ名").length;
        expect(newGroupInputs).toBe(initialGroupInputs + 1);
      });
    });
  });

  describe("フォーム入力", () => {
    it("レシピ名を入力できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const titleInput = screen.getByPlaceholderText("タイトル");
      await user.type(titleInput, "美味しいカレー");

      expect(titleInput).toHaveValue("美味しいカレー");
    });

    it("材料名と分量を入力できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const ingredientInputs = screen.getAllByPlaceholderText("材料名");
      const amountInputs = screen.getAllByPlaceholderText("分量（例：大さじ1）");

      await user.type(ingredientInputs[0], "玉ねぎ");
      await user.type(amountInputs[0], "1個");

      expect(ingredientInputs[0]).toHaveValue("玉ねぎ");
      expect(amountInputs[0]).toHaveValue("1個");
    });

    it("手順を入力できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const stepInput = screen.getByPlaceholderText("手順1");
      await user.type(stepInput, "野菜を切る");

      expect(stepInput).toHaveValue("野菜を切る");
    });

    it("カテゴリーを入力できる", async () => {
      const user = userEvent.setup();
      render(<CreateRecipeForm />, { wrapper: createWrapper() });

      const categoryInput = screen.getByPlaceholderText("カテゴリー");
      await user.type(categoryInput, "和食");

      expect(categoryInput).toHaveValue("和食");
    });
  });
});
