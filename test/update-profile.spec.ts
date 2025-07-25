import { expect, test } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("nome").fill("John Doe's");
  await page.getByLabel("Descrição").fill("Another description");
  await page.getByRole("button", { name: "Salvar" }).click();
  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado com sucesso!");
  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("button", { name: "John Doe's" })).toBeVisible();
});

test("update profile with invalid data", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("nome").fill("Invalid name");
  await page.getByLabel("Descrição").fill("Another description");
  await page.getByRole("button", { name: "Salvar" }).click();
  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Falha ao atualizar o perfil. Tente novamente!");
  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();
});
