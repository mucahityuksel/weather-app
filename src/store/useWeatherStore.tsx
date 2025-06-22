import { create } from 'zustand';

type WeatherState = {
  city: string;
  unit: 'metric' | 'imperial';
  setCity: (city: string) => void;
  toggleUnit: () => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  city: 'Istanbul',
  unit: 'metric',
  setCity: (city) => set({ city }),
  toggleUnit: () =>
    set((state) => ({
      unit: state.unit === 'metric' ? 'imperial' : 'metric',
    })),
}));
