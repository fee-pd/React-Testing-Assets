import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VoteUserEvent from "./VoteUserEvent";

describe("Test UserEvent -> VoteUserEvent Component", () => {
  test("renders Vote component without crashing", () => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    expect(
      screen.getByText(
        /Note: You are not allowed to change your vote once selected!/i
      )
    ).toBeInTheDocument();
  });

  test("allows user to upvote", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const upButton = screen.getByRole("button", { name: /thumbs up/i });
  
    userEvent.click(upButton);
    const totalLikes = await screen.findByText(/1/i);
    expect(totalLikes).toBeInTheDocument();
  });

  test("allows user to downvote", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const downButton = screen.getByRole("button", { name: /thumbs down/i });
  
    userEvent.click(downButton);
    const totalLikes = await screen.findByText(/-1/i);
    expect(totalLikes).toBeInTheDocument();
  });

  test("allows user to only vote once", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const upButton = screen.getByRole("button", { name: /thumbs up/i });
    const downButton = screen.getByRole("button", { name: /thumbs down/i });
  
    userEvent.click(upButton);
    
    const totalLikes = await screen.findByText(/1/i);
    expect(totalLikes).toBeInTheDocument();
    userEvent.click(downButton);
    expect(downButton).toBeDisabled();
    expect(totalLikes).toBeInTheDocument();
  });
});
