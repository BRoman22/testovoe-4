import './assets/normalize.css';
import './App.css';
import { Filters, Card } from './components';
import mock from './mockData/flights.json';
import { useEffect, useState } from 'react';
import { IFilters, Root, Flight, SORTING_FILTERS } from './constants';
import {
  filterBySorting,
  filterByTransfers,
  filterByPrice,
  filterByAirlines,
} from './services';

function App() {
  const mockData = mock as Root;

  const [filteredData, setFilteredData] = useState<Flight[]>([]);
  const [resultData, setResultData] = useState<Flight[]>([]);
  const [showMore, setShowMore] = useState(2);

  const [filters, setFilters] = useState<IFilters>({
    sorting: SORTING_FILTERS.TO_HIGH,
    transfers: [],
    price: { min: '', max: '' },
    airlines: [],
  });

  useEffect(() => {
    const data = Array.from(mockData.result.flights);

    const dataBySorting = filterBySorting(data, filters);
    const dataByTransfers = filterByTransfers(dataBySorting, filters);
    const dataByPrice = filterByPrice(dataByTransfers, filters);

    setFilteredData(dataByPrice);
    setResultData(dataByPrice);
  }, [filters.sorting, filters.transfers, filters.price]);

  useEffect(() => {
    const dataByAirlines = filterByAirlines(filteredData, filters);
    setResultData(dataByAirlines);
  }, [filters.airlines]);

  return (
    <main>
      <Filters
        filters={filters}
        setFilters={setFilters}
        initialData={mockData.result.flights}
        filteredData={filteredData}
        resultData={resultData}
      />
      <div className="cardlist">
        {resultData.length ? (
          <>
            {resultData.slice(0, showMore).map(flight => (
              <Card flight={flight} key={flight.flightToken} />
            ))}
            {showMore < resultData.length && (
              <button
                className="button"
                onClick={() => setShowMore(showMore + 1)}
              >
                Показать еще
              </button>
            )}
          </>
        ) : (
          <span style={{ textAlign: 'center' }}>Ничего не найдено</span>
        )}
      </div>
    </main>
  );
}

export default App;
