import ExpectedProperties from './ExpectedProperties.component';
import { render } from '@testing-library/react';



it('displays the heading', () => {
  render(<ExpectedProperties />);
});