import { render, screen } from "@testing-library/react";
import Navbar from "../../../src/components/navbar/Navbar";

describe("navbar testing", () => {
  it("renders homepage unchanged", () => {
    render(<Navbar />);
    const title = screen.getByTestId("project-title");
    expect(title).toBeInTheDocument();
    expect(1).toBe(1);
  });
});
