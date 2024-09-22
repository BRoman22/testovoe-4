import { SORTING_FILTERS } from '../constants';

interface IFilters {
  sorting: (typeof SORTING_FILTERS)[keyof typeof SORTING_FILTERS];
  transfers: number[];
  price: { min: string; max: string };
  airlines: string[];
}

export type { IFilters };
