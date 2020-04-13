import { mapVenues, defaultIcon } from './mapVenues';

test('should return falsey if rawVenues is null', () => {
  expect(mapVenues(null)).toBeFalsy();
});

test('should return falsey if rawVenues is undefined', () => {
  expect(mapVenues(undefined)).toBeFalsy();
});

test('should map the primary category if there is one', () => {
  const mappedVenues = mapVenues([{
    id: '12345',
    name: 'Test Venue',
    location: { formattedAddress: ['123 Test St'] },
    categories: [
      { primary: false, name: 'Place', icon: { prefix: '', suffix: '' } },
      { primary: true, name: 'Building', icon: { prefix: '', suffix: '' } },
    ]
  }]);

  expect(mappedVenues[0].category.name).toBe('Building');
});

test('should use a default category name when there are no associated categories', () => {
  const mappedVenues = mapVenues([{
    id: '12345',
    name: 'Test Venue',
    location: { formattedAddress: ['123 Test St'] },
    categories: []
  }]);

  expect(mappedVenues[0].category.name).toBe('Venue');
});

test('should use a default category icon when there are no associated categories', () => {
  const mappedVenues = mapVenues([{
    id: '12345',
    name: 'Test Venue',
    location: { formattedAddress: ['123 Test St'] },
    categories: []
  }]);

  expect(mappedVenues[0].category.icon).toBe(defaultIcon);
});

test('should concat the formatted address array', () => {
  const mappedVenues = mapVenues([{
    id: '12345',
    name: 'Test Venue',
    location: { formattedAddress: ['123 Test St', 'Seattle, WA', 'United States'] },
    categories: []
  }]);

  expect(mappedVenues[0].address).toBe('123 Test St, Seattle, WA, United States');
});
