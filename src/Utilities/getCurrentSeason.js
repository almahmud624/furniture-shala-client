export default function getCurrentSeason() {
  const date = new Date();
  const month = date.getMonth() + 1; // Get the current month (0-11)
  // Determine the season based on the month
  if (month >= 3 && month <= 5) {
    return "Spring";
  } else if (month >= 6 && month <= 8) {
    return "Summer";
  } else if (month >= 9 && month <= 11) {
    return "Autumn";
  } else {
    return "Winter";
  }
}
