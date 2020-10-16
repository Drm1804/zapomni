export const getConfig = () => '/api/widget/v1/settings';
export const getEvents = (date: string) =>
  `/api/widget/v1/nearest_events_by_date?date=${date}&date_interval=90`;
