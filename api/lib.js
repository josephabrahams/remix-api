export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getRandomElement(array) {
  if (array.length === 0) {
    return undefined; // Return undefined for empty arrays
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
