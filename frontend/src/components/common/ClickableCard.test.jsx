import { render, screen } from "@testing-library/react";
import ClickableCard from "./ClickableCard";
import { BrowserRouter } from "react-router-dom";

it("Clickablecard Should render the card", () => {
    // Arrange id, loading = true, title, price, category, image, unit = "kg", location, badge
    const props = {
        id: 1,
        loading: false,
        title: "This is testing long title to test the card rendering.",
        price: 100,
        category: "Fruit",
        image: "test.jpg",
        unit: "kg",
        location: "Test",
    };
    // Act
    // render inside router to avoid error
    render(
        <BrowserRouter>
            <ClickableCard {...props} />
        </BrowserRouter>
    );
    // Assert
    expect(screen.getByText(props.title)).toBeInTheDocument();
});
