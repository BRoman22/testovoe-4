import { Flight, SORTING_FILTERS, IFilters } from '../constants';

const dateFormater = (data: string) => {
  const date = new Date(data);
  const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const months = [
    'янв.',
    'фев.',
    'мар.',
    'апр.',
    'мая',
    'июня',
    'июля',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.',
  ];

  const time = date.getDate();
  const month = date.getMonth();
  const day = date.getDay();

  return `${time} ${months[month]} ${days[day - 1]}`;
};

const timeFormater = (data: string) => {
  const date = new Date(data);

  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());

  return `${hours.length === 1 ? `0${hours}` : hours}:${minutes.length === 1 ? `0${minutes}` : minutes}`;
};

const durationFormater = (data: number) => {
  const hours = Math.floor(data / 60);
  const minutes = data % 60;

  return `${hours ? `${hours} ч` : ''} ${minutes ? `${minutes} мин` : ''}`;
};

const getEndingTransfers = (data: number) => {
  if (!data) return;

  return `${data} пересадк${data > 1 ? 'и' : 'а'}`;
};

const getUniqueTransfers = (flights: Flight[]) => {
  const allTransfers = flights.flatMap(flight =>
    flight.flight.legs.map(leg => leg.segments.length - 1),
  );
  const uniqueTransfers = Array.from(new Set(allTransfers)).sort();

  return uniqueTransfers;
};

const getUniqueCarriers = (data: Flight[]) =>
  data
    .map(flight => flight.flight.carrier)
    .filter(
      (item, index, self) => self.findIndex(t => t.uid === item.uid) === index,
    );

const filterBySorting = (data: Flight[], filters: IFilters) => {
  if (!filters.sorting) return data;

  if (filters.sorting === SORTING_FILTERS.TO_HIGH) {
    return data.sort(
      (a, b) =>
        Number(a.flight.price.total.amount) -
        Number(b.flight.price.total.amount),
    );
  }
  if (filters.sorting === SORTING_FILTERS.TO_LOW) {
    return data.sort(
      (a, b) =>
        Number(b.flight.price.total.amount) -
        Number(a.flight.price.total.amount),
    );
  }
  if (filters.sorting === SORTING_FILTERS.DURATION) {
    return data.sort(
      (a, b) =>
        Number(a.flight.legs[0].duration) +
        Number(a.flight.legs[1].duration) -
        (Number(b.flight.legs[0].duration) + Number(b.flight.legs[1].duration)),
    );
  } else {
    return data;
  }
};
const filterByPrice = (data: Flight[], filters: IFilters) => {
  const { min, max } = filters.price;

  return data.filter(flight => {
    const { amount } = flight.flight.price.total;

    return (
      (min ? Number(amount) >= Number(min) : true) &&
      (max ? Number(amount) <= Number(max) : true)
    );
  });
};

const filterByTransfers = (data: Flight[], filters: IFilters): Flight[] => {
  if (!filters.transfers.length) return data;

  return data.filter(flight => {
    const transfers = flight.flight.legs.reduce(
      (acc, leg) => acc + leg.segments.length - 1,
      0,
    );

    return filters.transfers.includes(Math.ceil(transfers / 2));
  });
};

const filterByAirlines = (data: Flight[], filters: IFilters) => {
  if (!filters.airlines.length) return data;

  return data.filter(flight => {
    return filters.airlines.includes(flight.flight.carrier.uid);
  });
};

export {
  dateFormater,
  timeFormater,
  durationFormater,
  getEndingTransfers,
  getUniqueTransfers,
  getUniqueCarriers,
  filterBySorting,
  filterByPrice,
  filterByTransfers,
  filterByAirlines,
};
