import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import fetch from 'unfetch';
import { App } from '.';

jest.mock('unfetch');
jest.mock('react-loading');

fetch.mockResolvedValue({
  json: () => ({
    response: {
      venues: [
        {
          id: '12345',
          name: 'Test Venue',
          location: { formattedAddress: ['123 Test St', 'Seattle, WA'] },
          categories: []
        }
      ]
    }
  })
});

test('should display search results when there is a previous search term', async () => {
  const searchTerm = 'Seattle, WA';

  render(<App />);

  const searchInput = screen.getByPlaceholderText(/Enter a city/i);
  fireEvent.change(searchInput, { target: { value: searchTerm } });
  await waitFor(() => screen.getByDisplayValue(searchTerm));
  
  fireEvent.click(screen.getByText('Search'));
  await waitFor(() =>
    expect(screen.getByText(/Venues near/i)).toBeTruthy()
  );
});
