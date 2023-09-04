export default function parseTime(time) {
  const dateString = time;
  const [datePart, timePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  const [hour, minute, second] = timePart.split(":");
  const [seconds, _milliseconds] = second.split(".");

  const date = new Date(year, month - 1, day, hour, minute, seconds);

  return date;
}
