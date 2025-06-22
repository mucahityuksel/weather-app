'use client'
import Input from "@/components/Input";
import moment from "moment";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import returnWeatherImage from "./weather";
import Loading from "@/components/loading";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useWeatherData } from "@/hooks/useWeatherData";
import ErrorMessage from "@/components/ErrorMessage";

const Weather = () => {

    const [value, setValue] = useState<string>("istanbul");
    const { city, unit, setCity, toggleUnit } = useWeatherStore();
    const { data, error, isLoading } = useWeatherData(city, unit);
    const [type, setType] = useState(unit === 'imperial' ? '°F' : '°C')

    useEffect(() => {
        setType(unit === 'imperial' ? '°F' : '°C')
    }, [unit])

    return <div className="relative w- h-cover bg-cover  weather-main">
        <div className="flex flex-col">
            <div className="flex justify-start w-full px-15 py-10 uppercase color-black font-sans">
                weather app
            </div>
            <div className="flex  justify-center items-center relative px-5 gap-1">
                <Input type='text' className='bg-white outline-none p-3 rounded-xl bg-white/30' onChange={(e) => setValue(e.target.value)} placeholer='Search City' />
                <img src='/search.svg' className="cursor-pointer rounded-xl" onClick={() => setCity(value)} ></img>
                <button onClick={toggleUnit} className="ml-2 px-4 py-3 bg-white/20 rounded-xl cursor-pointer">
                    {unit === 'metric' ? '°C' : '°F'}
                </button>
                <img src='/history.svg' className="cursor-pointer w-10 rounded-xl"></img>
            </div>
            {error && (
                <div className="flex justify-center items-center px-5 mt-4">
                    <div className="bg-red-100 text-red-600 px-6 py-3 rounded-xl">
                        {error.message || "Bir hata oluştu"}
                    </div>
                </div>
            )}
            {
                isLoading ? <div className="flex justify-center items-center margin-auto py-50">
                    <Loading />
                </div> : data?.cod === "200" ? <div className="flex flex-col  justify-start items-center">
                    <div className="flex flex-col gap-1 justify-start w-full py-10 px-15 color-black">
                        <span className="text-3xl font-sans">{data?.city?.name}, {data?.city?.country}</span>
                        <span className="text-sm font-sans">{moment(new Date()).format("MMMM DD  dddd , HH:MM")}</span>
                    </div>
                    <div className="flex flex-wrap w-full justify-center gap-5 items-center w-full margin-auto">
                        <div className="flex flex-wrap w-3xs justify-center gap-2 items-center p-2 color-black main-weather rounded-xl ">
                            <img src={returnWeatherImage(data?.list[0]?.weather[0]?.description, data?.list[0]?.sys?.pod)} className='object-contain w-200'></img>
                            <div className="flex flex-col">
                                <span className="text-5xl">{data?.list[0]?.main?.temp + type}</span>
                                <span className="text-nowrap font-sans text-xs uppercase">{data?.list[0]?.weather[0]?.description}</span>
                            </div>
                        </div>
                        <div className="flex w-3xs justify-center gap-2 items-center bg-white/20 px-2 w-80 color-black rounded-xl weather-detail">
                            <div className="flex flex-wrap justify-between items-center ">
                                <div className="flex flex-col  p-3 justify-start">
                                    <span className="text-2xl">{(data?.list[0]?.main?.temp_max)?.toFixed(0) + type}</span>
                                    <span className="text-nowrap font-sans text-sm">Hight</span>
                                </div>

                                <div className="flex flex-col  p-3 justify-start">
                                    <span className="text-2xl">{data?.list[0]?.main?.temp_min + type}</span>
                                    <span className="text-nowrap font-sans text-sm">Low</span>
                                </div>

                                <div className="flex flex-col p-3 justify-start">
                                    <span className="text-2xl">{(data?.list[0]?.wind?.speed)} m/s</span>
                                    <span className="text-nowrap font-sans text-sm">Wind</span>
                                </div>

                                <div className="flex flex-col p-3 justify-start">
                                    <span className="text-2xl">{moment.unix(data?.city.sunrise).format("HH:mm a")}</span>
                                    <span className="text-nowrap font-sans text-sm">Sunrise</span>
                                </div>
                                <div className="flex flex-col p-3 justify-start">
                                    <span className="text-2xl">{moment.unix(data?.city.sunset).format("hh:mm a")}</span>
                                    <span className="text-nowrap font-sans text-sm">Sunset</span>
                                </div>
                                <div className="flex flex-col p-3 justify-start">
                                    <span className="text-2xl">{(data?.list[0]?.main?.humidity)} %</span>
                                    <span className="text-nowrap font-sans text-sm">Humidity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex  w-full justify-center  items-center py-15 w-full margin-auto px-15">
                        <Swiper spaceBetween={10} slidesPerView={9}>
                            {
                                data?.list?.map((item: any, key: number) => {
                                    return <SwiperSlide key={key}>
                                        <div className="flex flex-col gap-1 justify-between items-center bg-white/20 rounded-xl h-32 py-2">
                                            <span className="text-xs font-sans">{moment.unix(item.dt).format("MM.DD")}</span>
                                            <span className="text-sm font-sans">{moment.unix(item.dt).format("HH:MM a")}</span>
                                            <img src={returnWeatherImage(item?.weather[0]?.description, item?.sys?.pod)} className='object-contain w-10'></img>
                                            <span>{item?.main?.temp + type}</span>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div> : <div className="flex justify-center items-center px-6 mt-4">
                    <ErrorMessage message={data.message || "Network Error"} />
                </div>

            }
        </div>
    </div >

}

export default Weather;