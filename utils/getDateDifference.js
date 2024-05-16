export const dateDiffInDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const humanReadableDate = new Intl.DateTimeFormat("en-US", options).format(
    date
  );
  return humanReadableDate;
}
