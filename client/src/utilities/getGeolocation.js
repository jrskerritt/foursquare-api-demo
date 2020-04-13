const errorMessage = 'Geolocation not supported or disabled';

export const getGeolocation = async navigator => {
  if (!navigator.geolocation) {
    throw new Error(errorMessage);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const lat = Math.round(coords.latitude * 100) / 100;
      const long = Math.round(coords.longitude * 100) / 100;
      resolve(`${lat},${long}`)
    },
    () => { throw new Error(errorMessage); }
  );
  });
};
