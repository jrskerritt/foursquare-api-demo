import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResults } from '.';

test('should display venues when given', () => {
  render(
    <SearchResults
      searchTerm="Seattle, WA"
      venues={[
        {
          id: '1234',
          name: 'Space Needle',
          address: '123 Test St',
          category: {
            name: 'Attraction',
            icon: 'someurl.com/to/this/image'
          }
        }
      ]}
    />
  );

  expect(screen.getByText(/Space Needle/)).toBeTruthy();
});

test('should display "no results" message when there are no venues', () => {
  render(
    <SearchResults
      searchTerm="Seattle, WA"
      venues={[]}
    />
  );

  expect(screen.getByText(/Looks like we couldn't/i)).toBeTruthy();
});
