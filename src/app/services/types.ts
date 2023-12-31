export interface IPageParams {
  [key: string]: any;
  page: number;
  size: number;
}

export interface ISearchParams {
  [key: string]: any;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface IStation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface IWagon {
  arrivalTime: string;
  stationId: number;
  trainDeparturePoint: string;
  trainDestinationPoint: string;
  trainNumber: string;
  wagonDestination: number;
  wagonId: number;
  latitude: number;
  longitude: number;
  isPgk?: boolean;
}
