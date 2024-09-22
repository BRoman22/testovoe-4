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
    const dataByAirlines = filterByAirlines(dataByPrice, filters);

    setFilteredData(dataByAirlines);
  }, [filters]);

  return (
    <main>
      <Filters
        filters={filters}
        setFilters={setFilters}
        initialData={mockData.result.flights}
        filteredData={filteredData}
      />
      <div className="cardlist">
        {filteredData.length ? (
          <>
            {filteredData.slice(0, showMore).map(flight => (
              <Card flight={flight} key={flight.flightToken} />
            ))}
            {showMore < filteredData.length && (
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
