export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  historyData: DataItem[];
  getData: (data: DataItem) => void;
};
export type WeatherHeaderType = {
    myData: DataItem
};

export type DataItem = {
  city: {
    country: string;
    name: string;
    sunrise: number;
    sunset: number;
  };
  cnt: number;
  cod: string;
  list: ListType[];
  message: string;
  type: string;
};

export type ListType = {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: {
    pod: string;
  };
  weather: {
    description: string;
  }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
};
