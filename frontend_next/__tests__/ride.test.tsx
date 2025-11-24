import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../pages/ride";
import { act } from "react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(), // Mock the useRouter hook
}));

describe("Cadastro", () => {
  test("Deve solicitar uma corrida", async function () {
    render(<Page />);
    const nextButton = screen.getByText("Login");
    expect(nextButton).toBeInTheDocument();
    const emailField = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Senha");

    await act(() => {
      fireEvent.change(password, { target: { value: "123456" } });
      fireEvent.change(emailField, {
        target: { value: `john.doe0.5329326364439566@gmail.com` },
      });
    });



  });
});
