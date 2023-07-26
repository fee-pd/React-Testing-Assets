import ExpectedPropertiesView from './ExpectedProperties.view';
import { render, screen } from '@testing-library/react';
import { fakeEmployees } from '../../../mocks/employees';

it('renders with expected values', () => {
  render(<ExpectedPropertiesView fakeEmployees={fakeEmployees} />)
  expect(screen.getByRole('cell', { name: /john smith/i })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: /engineering/i })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: /designer/i })).toBeInTheDocument();
});
