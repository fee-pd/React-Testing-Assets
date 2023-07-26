import { render, fireEvent, screen } from "@testing-library/react";
import Vote from "./VoteFireEvent";

describe("Test FireEvents -> VoteFireEvent Component", () => {
  test('renders without crashing', () => {
    render(<Vote totalGlobalLikes={10} />);
    expect(screen.getByText(/Note: You are not allowed to change your vote once selected!/i)).toBeInTheDocument();
  });

  test('user can upvote', () => {
    const totalGlobalLikes = 10;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
    
    const upButton = screen.getByRole('button', { name: /thumbs up/i });
  
    // User clicks the upvote button
    fireEvent.click(upButton);
  
    // Expect the totalLikes to have increased by one
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  test('user can downvote', () => {
    const totalGlobalLikes = 10;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
    
    const downButton = screen.getByRole('button', { name: /thumbs down/i });
  
    // User clicks the downvote button
    fireEvent.click(downButton);
  
    // Expect the totalLikes to have decreased by one
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  test('user can only vote once', () => {
    const totalGlobalLikes = 10;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
    
    const upButton = screen.getByRole('button', { name: /thumbs up/i });
    const downButton = screen.getByRole('button', { name: /thumbs down/i });
  
    // User clicks the upvote button
    fireEvent.click(upButton);
  
    // Both buttons should now be disabled
    expect(upButton).toBeDisabled();
    expect(downButton).toBeDisabled();
  
    // Reset before the next click
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
    
    // User clicks the downvote button
    fireEvent.click(downButton);
  
    // Both buttons should now be disabled
    expect(upButton).toBeDisabled();
    expect(downButton).toBeDisabled();
  });

  //////////////////
  // Extra examples
  //////////////////
  
  test('vote buttons are initially enabled', () => {
    const totalGlobalLikes = 10;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
    const upButton = screen.getByRole('button', { name: /thumbs up/i });
    const downButton = screen.getByRole('button', { name: /thumbs down/i });
  
    expect(upButton).toBeEnabled();
    expect(downButton).toBeEnabled();
  });

  test('provides visual feedback after voting', () => {
    const totalGlobalLikes = 10;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
    const upButton = screen.getByRole('button', { name: /thumbs up/i });
  
    fireEvent.click(upButton);
    expect(upButton).toHaveStyle({ background: 'green' });

  });

  test('renders correctly with different initial props', () => {
    const totalGlobalLikes = -5;
    render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
    expect(screen.getByText(totalGlobalLikes.toString())).toBeInTheDocument();
  });
});
