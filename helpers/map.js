import sortBy from 'sort-by';

export const panMapTo = (coords, map, google) => {
  // get the center top coords
  const lat = coords[0].lat > coords[1].lat ? coords[0].lat : coords[1].lat;
  const orderedByLng = coords.sort(sortBy('lng'));
  const diff = orderedByLng[1].lng - orderedByLng[0].lng;
  const lng = orderedByLng[0].lng + (diff / 2);

  console.log(lat);
  console.log(orderedByLng);
  console.log(diff)
  console.log(lng);

  map.panTo(new google.maps.LatLng(lat, lng));
}