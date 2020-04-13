import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import fetch from 'unfetch';
import { SearchInput } from '.';
import { getGeolocation } from '../../utilities/getGeolocation';

jest.mock('unfetch');
jest.mock('react-loading');
jest.mock('../../utilities/getGeolocation');

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

test('fires a search when enter is pressed in the input', async () => {
  const searchTerm = 'Denver, CO';
  const onSearchComplete = jest.fn();

  render(<SearchInput onSearchComplete={onSearchComplete} />);

  const searchInput = screen.getByPlaceholderText(/Enter a city/i);
  fireEvent.change(searchInput, { target: { value: searchTerm } });
  await waitFor(() => screen.getByDisplayValue(searchTerm));

  fireEvent.keyPress(searchInput, { key: "Enter", code: 13, charCode: 13 });
  await waitFor(() => {
    expect(onSearchComplete).toHaveBeenCalledWith(searchTerm, expect.anything());
  });
});

test('fires a search when the search button is clicked', async () => {
  const searchTerm = 'Denver, CO';
  const onSearchComplete = jest.fn();

  render(<SearchInput onSearchComplete={onSearchComplete} />);

  const searchInput = screen.getByPlaceholderText(/Enter a city/i);
  fireEvent.change(searchInput, { target: { value: searchTerm } });
  await waitFor(() => screen.getByDisplayValue(searchTerm));
  
  fireEvent.click(screen.getByText('Search'));
  await waitFor(() => {
    expect(onSearchComplete).toHaveBeenCalledWith(searchTerm, expect.anything());
  });
});

test('displays a loading animation when a search is fired', async () => {
  const searchTerm = 'Denver, CO';
  render(<SearchInput onSearchComplete={jest.fn()} />);

  const searchInput = screen.getByPlaceholderText(/Enter a city/i);
  fireEvent.change(searchInput, { target: { value: searchTerm } });
  await waitFor(() => screen.getByDisplayValue(searchTerm));

  fireEvent.click(screen.getByText('Search'));
  await waitFor(() => {
    expect(screen.getByTestId('loadingAnimation')).toBeTruthy();
  });
});

test('fires a geolocation search when "use my location" is clicked', async () => {
  const onSearchComplete = jest.fn();
  getGeolocation.mockResolvedValueOnce('47.22,-122.23');

  render(<SearchInput onSearchComplete={onSearchComplete} />);
  fireEvent.click(screen.getByText('Use my location'));
  await waitFor(() => {
    expect(onSearchComplete).toHaveBeenCalledWith('your location', expect.anything());
  });
});
