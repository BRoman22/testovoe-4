import styles from './index.module.scss';
import { useDebounce } from '../../hooks';
import { IFilters, Flight, SORTING_FILTERS } from '../../constants';
import { useEffect, useState } from 'react';
import {
  getUniqueTransfers,
  getEndingTransfers,
  getUniqueCarriers,
} from '../../services';

interface FiltersProps {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  initialData: Flight[];
  filteredData: Flight[];
  resultData: Flight[];
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  initialData,
  filteredData,
  resultData,
}) => {
  const { sorting, transfers, airlines } = filters;
  const [state, setState] = useState({ min: '', max: '' });

  const isDisabledAirline = (uid: string) =>
    !filteredData.find(i => i.flight.carrier.uid === uid);
  const isDisabledTransfer = (item: number) =>
    !getUniqueTransfers(resultData).includes(item);

  const handleSortingChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({ ...filters, sorting: e.target.value });

  const handleTransferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newTransfers = transfers.includes(value)
      ? transfers.filter(transfer => transfer !== value)
      : [...transfers, value];

    setFilters({ ...filters, transfers: newTransfers });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleAirlinesChange = (selectedAirline: string) => {
    const newAirlines = airlines.includes(selectedAirline)
      ? airlines.filter(airline => airline !== selectedAirline)
      : [...airlines, selectedAirline];

    setFilters({ ...filters, airlines: newAirlines });
  };

  const debouncedPrice = useDebounce(state, 700);

  useEffect(() => {
    setFilters({ ...filters, price: debouncedPrice });
  }, [debouncedPrice]);

  return (
    <ul>
      <li className={styles.item}>
        <h1 className={styles.title}>Сортировать</h1>
        <label className={styles.label}>
          <input
            type="radio"
            checked={sorting === SORTING_FILTERS.TO_HIGH}
            value={SORTING_FILTERS.TO_HIGH}
            onChange={handleSortingChange}
          />
          <span>- по возрастанию цены</span>
        </label>
        <label className={styles.label}>
          <input
            type="radio"
            checked={sorting === SORTING_FILTERS.TO_LOW}
            value={SORTING_FILTERS.TO_LOW}
            onChange={handleSortingChange}
          />
          <span>- по убыванию цены</span>
        </label>
        <label className={styles.label}>
          <input
            type="radio"
            checked={sorting === SORTING_FILTERS.DURATION}
            value={SORTING_FILTERS.DURATION}
            onChange={handleSortingChange}
          />
          <span>- по времени в пути</span>
        </label>
      </li>

      <li className={styles.item}>
        <h1 className={styles.title}>Фильтровать</h1>
        {getUniqueTransfers(initialData).map(transfer => (
          <label className={styles.label} key={transfer}>
            <input
              type="checkbox"
              checked={transfers.includes(transfer)}
              value={transfer}
              onChange={handleTransferChange}
              disabled={isDisabledTransfer(transfer)}
            />
            <span
              className={isDisabledTransfer(transfer) ? styles.disabled : ''}
            >
              {transfer
                ? `- ${getEndingTransfers(transfer)}`
                : '- без пересадок'}
            </span>
          </label>
        ))}
      </li>

      <li className={styles.item}>
        <h1 className={styles.title}>Цена</h1>
        <label className={styles.label} style={{ marginBottom: 15 }}>
          <span style={{ width: 20 }}>от</span>
          <input
            type="number"
            style={{ border: '1px solid #000' }}
            name={'min'}
            onChange={handlePriceChange}
          />
        </label>
        <label className={styles.label}>
          <span style={{ width: 20 }}>до</span>
          <input
            type="number"
            style={{ border: '1px solid #000' }}
            name={'max'}
            onChange={handlePriceChange}
          />
        </label>
      </li>

      <li className={styles.item}>
        <h1 className={styles.title}>Авиакомпании</h1>
        {getUniqueCarriers(initialData).map(item => (
          <label className={styles.label} key={item.uid}>
            <input
              type="checkbox"
              checked={airlines.includes(item.uid)}
              value={item.uid}
              onChange={() => handleAirlinesChange(item.uid)}
              disabled={isDisabledAirline(item.uid)}
            />
            <span
              className={isDisabledAirline(item.uid) ? styles.disabled : ''}
            >
              {item.caption}
            </span>
          </label>
        ))}
      </li>
    </ul>
  );
};

export default Filters;
