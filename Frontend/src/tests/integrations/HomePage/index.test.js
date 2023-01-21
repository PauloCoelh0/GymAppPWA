import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../../../components/HomePage";

describe("HomePage", () => {
  it("renders corretly the component", () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
  });

  it("renders the login form correctly", () => {
    render(<HomePage />);

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  describe("when click the button Login with Qr Code", () => {
    it("renders the component QrRead", () => {
      render(<HomePage />);

      userEvent.click(screen.getByText("Login with Qr Code"));

      expect(screen.getByText("QrCode")).toBeInTheDocument();
    });
  });
});
