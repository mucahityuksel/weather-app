'use client'
import Input from "@/components/Input";
import moment from "moment";
import { useEffect, useState } from "react";

const Weather = () => {
    const [data, setData] = useState<any>()
    const getDataFromApi = () => {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=9fb7d9b4e987c28ab154bf67186be167',
            {
                method: "GET"
            }
        ).then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getDataFromApi()
    }, [])
    return <div className="relative w- h-cover bg-cover  weather-main">
        <div className="flex flex-col">
            <div className="flex justify-start w-full px-15 py-10 uppercase color-black font-sans">
                weather app
            </div>
            <div className="flex flex-col justify-center items-center relative">
                <Input type='text' className='bg-white outline-none p-3 rounded-3xl' placeholer='Search City' />
            </div>
            <div className="flex flex-col  justify-start items-center">
                <div className="flex flex-col gap-1 justify-start w-full py-10 px-15 color-black">
                    <span className="text-3xl font-sans">{data?.city?.name}, {data?.city?.country}</span>
                    <span className="text-sm font-sans">{moment(new Date()).format("MMMM DD  dddd , HH:MM")}</span>
                </div>
                <div className="flex flex-wrap w-full justify-center gap-5 items-center w-full margin-auto">
                    <div className="flex flex-wrap w-3xs justify-center gap-2 items-center p-2 color-white main-weather rounded-xl ">
                        <img src='/clearSky.png' className='object-contain w-200'></img>
                        <div className="flex flex-col">
                            <span className="text-5xl">{(data?.list[0]?.main?.temp - 273.15).toFixed(0)}°</span>
                            <span className="text-nowrap font-sans text-xs uppercase">{data?.list[0]?.weather[0]?.description}</span>
                        </div>
                    </div>
                    <div className="flex w-3xs justify-center gap-2 items-center bg-black/20 p-2 color-white rounded-xl weather-detail">
                        <div className="flex flex-wrap justify-between items-center ">
                            <div className="flex flex-col  p-3 justify-start">
                                <span className="text-2xl">{(data?.list[0]?.main?.temp_max - 273.15)?.toFixed(0)}°</span>
                                <span className="text-nowrap font-sans text-sm">Hight</span>
                            </div>

                            <div className="flex flex-col  p-3 justify-start">
                                <span className="text-2xl">{(data?.list[0]?.main?.temp_min - 273.15)?.toFixed(0)}°</span>
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
                        </div>
                    </div>
                </div>


            </div>
            
            </div>
            

        


    </div>

}

export default Weather;