interface Root {
  result: Result;
}

interface Result {
  flights: Flight[];
  bestPrices: BestPrices;
}

interface Flight {
  hasExtendedFare: boolean;
  flight: FlightBody;
  flightToken: string;
}

interface FlightBody {
  carrier: Carrier;
  price: Price;
  servicesStatuses: ServicesStatuses;
  legs: Leg[];
  exchange: Exchange;
  isTripartiteContractDiscountApplied: boolean;
  international: boolean;
  seats: Seat[];
  refund: Refund;
  airlineAlliance?: Uid;
}

interface Carrier {
  uid: string;
  caption: string;
  airlineCode: string;
}

type Uid = Pick<Carrier, 'uid' | 'caption'>;

interface Price {
  total: Total;
  totalFeeAndTaxes: Total;
  rates: Rates;
  passengerPrices: PassengerPrice[];
}

interface Total {
  amount: string;
  currencyCode: string;
  currency: string;
}

type TotalCurrency = Pick<Total, 'amount' | 'currencyCode'>;

interface Rates {
  totalUsd: TotalCurrency;
  totalEur: TotalCurrency;
}

interface PassengerPrice {
  total: Total;
  passengerType: Uid;
  singlePassengerTotal: Total;
  passengerCount: number;
  tariff: Total;
  feeAndTaxes: Total;
}

interface ServicesStatuses {
  baggage: Uid;
  exchange: Uid;
  refund: Uid;
}

interface Leg {
  duration: number;
  segments: Segment[];
}

interface Segment {
  classOfServiceCode: string;
  classOfService: Uid;
  departureAirport: Uid;
  departureCity?: Uid;
  aircraft: Uid;
  travelDuration: number;
  arrivalCity?: Uid;
  arrivalDate: string;
  flightNumber: string;
  techStopInfos: [];
  departureDate: string;
  stops: number;
  servicesDetails: ServicesDetails;
  airline: Carrier;
  starting: boolean;
  arrivalAirport: Uid;
  operatingAirline?: Carrier;
}

interface ServicesDetails {
  freeCabinLuggage: object;
  paidCabinLuggage: object;
  tariffName?: string;
  fareBasis: FareBasis;
  freeLuggage: FreeLuggage;
  paidLuggage: object;
}

interface FareBasis {
  ADULT: string;
}

interface FreeLuggage {
  ADULT: Adult;
}

interface Adult {
  nil: boolean;
  pieces?: number;
  unit?: string;
}

interface Exchange {
  ADULT: Adult2;
}

interface Adult2 {
  exchangeableBeforeDeparture: boolean;
  exchangeAfterDeparture: Total;
  exchangeBeforeDeparture: Total;
  exchangeableAfterDeparture: boolean;
}

interface Seat {
  count: number;
  type: Uid;
}

interface Refund {
  ADULT: Adult3;
}

interface Adult3 {
  refundableBeforeDeparture: boolean;
  refundableAfterDeparture: boolean;
  refundBeforeDeparture?: Total;
  refundAfterDeparture?: Total;
}

interface BestPrices {
  ONE_CONNECTION: OneConnection;
  DIRECT: OneConnection;
}

interface OneConnection {
  bestFlights: BestFlight[];
}

interface BestFlight {
  carrier: Carrier;
  price: Total;
}

export type {
  Root,
  Result,
  Flight,
  FlightBody,
  Carrier,
  Total,
  Leg,
  Segment,
  ServicesDetails,
  FareBasis,
  FreeLuggage,
  Adult,
  Seat,
  Refund,
  BestPrices,
  OneConnection,
  BestFlight,
};
