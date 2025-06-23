import returnWeatherImage from "@/app/weather/weather";
import {WeatherHeaderType } from "@/types";
import moment from "moment";


const WeatherMain = ({ myData }: WeatherHeaderType) => {

    return (
        <div className="flex flex-wrap w-full justify-center gap-5 items-center w-full margin-auto">
            <div className="flex flex-wrap w-3xs justify-center gap-2 items-center p-2 color-black main-weather rounded-xl ">
                <img src={returnWeatherImage(myData?.list[0]?.weather[0]?.description, myData?.list[0]?.sys?.pod)} className='object-contain w-200'></img>
                <div className="flex flex-col">
                    <span className="text-5xl">{myData?.list[0]?.main?.temp + (myData?.type === 'metric' ? '°C' : '°F')}</span>
                    <span className="text-nowrap font-sans text-xs uppercase">{myData?.list[0]?.weather[0]?.description}</span>
                </div>
            </div>
            <div className="flex w-3xs justify-center gap-2 items-center bg-white/20 px-2 w-80 color-black rounded-xl weather-detail">
                <div className="flex flex-wrap justify-between items-center ">
                    <div className="flex flex-col  p-3 justify-start">
                        <span className="text-2xl">{(myData?.list[0]?.main?.temp_max)?.toFixed(0) + (myData?.type === 'metric' ? '°C' : '°F')}</span>
                        <span className="text-nowrap font-sans text-sm">Hight</span>
                    </div>

                    <div className="flex flex-col  p-3 justify-start">
                        <span className="text-2xl">{myData?.list[0]?.main?.temp_min + (myData?.type === 'metric' ? '°C' : '°F')}</span>
                        <span className="text-nowrap font-sans text-sm">Low</span>
                    </div>

                    <div className="flex flex-col p-3 justify-start">
                        <span className="text-2xl">{(myData?.list[0]?.wind?.speed)} m/s</span>
                        <span className="text-nowrap font-sans text-sm">Wind</span>
                    </div>

                    <div className="flex flex-col p-3 justify-start">
                        <span className="text-2xl">{moment.unix(myData?.city.sunrise).format("HH:mm a")}</span>
                        <span className="text-nowrap font-sans text-sm">Sunrise</span>
                    </div>
                    <div className="flex flex-col p-3 justify-start">
                        <span className="text-2xl">{moment.unix(myData?.city.sunset).format("hh:mm a")}</span>
                        <span className="text-nowrap font-sans text-sm">Sunset</span>
                    </div>
                    <div className="flex flex-col p-3 justify-start">
                        <span className="text-2xl">{(myData?.list[0]?.main?.humidity)} %</span>
                        <span className="text-nowrap font-sans text-sm">Humidity</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WeatherMain;