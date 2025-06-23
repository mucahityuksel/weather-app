import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useWeatherData = (city: string, unit: 'metric' | 'imperial') => {
    const { data, error, isLoading } = useSWR(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lang=en`,
        fetcher,
        { revalidateOnFocus: false }
    );

    return { data, error, isLoading };
};
