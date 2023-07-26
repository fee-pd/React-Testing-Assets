import { render, screen } from '@testing-library/react';
import DebugMethod from './DebugMethod.component';

// Uncomment the debug method to see it in the console.

it('displays the header and paragraph text', () => {
  render(<DebugMethod />);
  // screen.debug();
});

it('renders with debug method', () => {
  render(<DebugMethod />);
  const header = screen.getByRole('heading', { name: /welcome to our site!/i });
  // screen.debug(header);
});
