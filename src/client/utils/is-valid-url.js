const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (ex) {
    return false
  }
}

export default isValidUrl
