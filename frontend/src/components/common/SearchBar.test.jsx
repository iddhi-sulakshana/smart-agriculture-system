import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

it("SearchBar Should render the search bar", () => {
    // Arrange
    // Act
    render(<SearchBar />);
    // Assert
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
});
