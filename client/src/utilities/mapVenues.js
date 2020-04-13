export const defaultIcon = 'https://ss3.4sqi.net/img/categories_v2/building/default_bg_32.png';

// The list of venues returned by the Foursquare API has more data than
// we care about. This function extracts only what our components will need.
export function mapVenues(rawVenues) {
  return rawVenues && rawVenues.map(({ id, name, location, categories }) => {
      const primaryCategory = categories.length && categories.filter(c => c.primary)[0];
      return {
        id,
        name,
        address: location.formattedAddress.join(', '),
        category: {
          name: primaryCategory ? primaryCategory.name : 'Venue',
          icon: primaryCategory ?
            `${primaryCategory.icon.prefix}bg_32${primaryCategory.icon.suffix}` :
            defaultIcon
        }
      };
  });
};
