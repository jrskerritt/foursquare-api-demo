import { getGeolocation } from './getGeolocation';

test('should throw if geolocation is not supported', async () => {
  let threw = false;
  await getGeolocation({}).catch(() => threw = true);
  expect(threw).toBe(true);
});

test('should throw if geolocation fails', async () => {
  const geolocation = { getCurrentPosition: jest.fn() };
  geolocation.getCurrentPosition.mockImplementationOnce(
    (success, error) => error()
  );

  let threw = false;
  await getGeolocation({ geolocation }).catch(() => threw = true);
  expect(threw).toBe(true);
});

test('should return a string containing the user\'s rounded lat/long', async () => {
  const geolocation = { getCurrentPosition: jest.fn() };
  const position = {
    coords: {
      latitude: '47.577453453',
      longitude: '-122.41045345345'
    }
  };

  geolocation.getCurrentPosition.mockImplementationOnce(
    success => success(position)
  );
  
  const latLong = await getGeolocation({ geolocation });
  expect(latLong).toBe('47.58,-122.41');
});
