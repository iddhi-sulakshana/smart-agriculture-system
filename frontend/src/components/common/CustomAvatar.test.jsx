import { render, screen } from "@testing-library/react";
import CustomAvatar from "./CustomAvatar";

it("CustomAvatar Should render the avatar", () => {
    // Arrange
    const props = {
        src: "test.jpg",
        alt: "Test",
        size: "large",
    };
    // Act
    render(<CustomAvatar {...props} />);
    // Assert
    expect(screen.getByAltText(props.alt)).toBeInTheDocument();
});
