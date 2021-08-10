export default function addDays(field) {
  let date = new Date(field);
  date.setDate(date.getDate());
  return date;
}
