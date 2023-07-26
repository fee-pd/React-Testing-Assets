test('renders users when API call succeeds', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(fakeUsers),
  });

  render(<App />);

  expect(screen.getByRole('heading')).toHaveTextContent('List of Users');
  expect(await screen.findByText('Joe')).toBeInTheDocument();
  expect(await screen.findByText('Tony')).toBeInTheDocument();
  expect(screen.queryByText('No users found')).not.toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('renders error when API call fails', async () => {
  fetch.mockRejectedValueOnce('API error');

  render(<App />);

  expect(await screen.findByText('Something went wrong!')).toBeInTheDocument();
  expect(await screen.findByText('No users found')).toBeInTheDocument();
});

test('renders appropriate message when API returns empty array', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue([]),
  });

  render(<App />);

  expect(await screen.findByText('No users found')).toBeInTheDocument();
});