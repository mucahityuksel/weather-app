'use client'
import Input from "@/components/Input";
import moment from "moment";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import returnWeatherImage from "./weather/weather";
import Loading from "@/components/loading";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useWeatherData } from "@/hooks/useWeatherData";
import ErrorMessage from "@/components/ErrorMessage";
import Modal from "@/components/Modal";
import { DataItem, ListType } from "@/types";
import WeatherMain from "@/components/WeatherHeader";

export default function Home() {

  const [value, setValue] = useState<string>("istanbul");
  const { city, unit, setCity, toggleUnit } = useWeatherStore();
  const { data, error, isLoading } = useWeatherData(city, unit);
  const [myData, setMyData] = useState(data);

  const [, setType] = useState(myData === 'imperial' ? '°F' : '°C')
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [historyData, setHistoryData] = useState<DataItem[]>([])
  useEffect(() => {
    setType(unit === 'imperial' ? '°F' : '°C')
  }, [unit])

  useEffect(() => {
    if (data !== undefined) {
      setMyData(Object?.assign(data, { type: unit }))
    }
  }, [data])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("historyData");
      if (stored) setHistoryData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (myData?.cod === "200") {
      setHistoryData((prevItems: DataItem[]) => {
        const isExist = prevItems.some((item: DataItem) => item?.city?.name === myData.city.name);
        if (isExist) return prevItems;
        const updated = [...prevItems, myData];
        localStorage.setItem("historyData", JSON.stringify(updated));
        return updated;
      });
    }
  }, [myData]);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('historyData');
      if (stored) setHistoryData(JSON.parse(stored));
    }
  }, [isOpen]);

  return <div className="relative w- h-cover bg-cover  weather-main">
    <div className="flex flex-col">
      <div className="flex justify-start w-full px-15 py-10 uppercase color-black font-sans">
        weather app
      </div>
      <div className="flex  justify-center items-center relative px-5 gap-1">
        <Input type='text' className='bg-white outline-none p-3 rounded-xl bg-white/30' onChange={(e) => setValue(e.target.value)} placeholer='Search City' />
        <img src='/search.svg' className="cursor-pointer rounded-xl" onClick={() => setCity(value)} ></img>
        <button onClick={toggleUnit} className="ml-2 px-4 py-3 bg-white/20 rounded-xl cursor-pointer">
          {myData?.type === 'metric' ? '°C' : '°F'}
        </button>
        <img src='/history.svg' className="cursor-pointer w-10 rounded-xl" onClick={() => setIsOpen(true)}></img>
      </div>
      <div className="flex relative px-5 gap-1 margin-auto-1 -ml-15">
        <div className="flex flex-col">
          {
            historyData?.map((item: DataItem, key: number) => {
              if (key > historyData.length - 6) {
                return <span key={key} className="text-xs cursor-pointer" onClick={()=> setMyData(item)}>{item?.city.name}</span>
              }
            })
          }
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} historyData={historyData} getData={(data: DataItem) => {
        setMyData(data)
        setIsOpen(false)
      }} />
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
        </div> : myData?.cod === "200" ? <div className="flex flex-col  justify-start items-center">
          <div className="flex flex-col gap-1 justify-start w-full py-10 px-15 color-black">
            <span className="text-3xl font-sans">{myData?.city?.name}, {myData?.city?.country}</span>
            <span className="text-sm font-sans">{moment(new Date()).format("MMMM DD  dddd , HH:MM")}</span>
          </div>
          <WeatherMain myData={myData}/>
          <div className="flex  w-full justify-center  items-center py-15 w-full margin-auto px-15">
            <Swiper spaceBetween={10} slidesPerView={9}>
              {
                myData?.list?.map((item: ListType, key: number) => {
                  return <SwiperSlide key={key} className="min-w-[140px]">
                    <div className="flex flex-col gap-1 justify-between items-center bg-white/20 rounded-xl h-32 py-2">
                      <span className="text-xs font-sans">{moment.unix(item.dt).format("MM.DD")}</span>
                      <span className="text-sm font-sans">{moment.unix(item.dt).format("HH:MM a")}</span>
                      <img src={returnWeatherImage(item?.weather[0]?.description, item?.sys?.pod)} className='object-contain w-10'></img>
                      <span>{item?.main?.temp + (myData?.type === 'metric' ? '°C' : '°F')}</span>
                    </div>
                  </SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </div> : <div className="flex justify-center items-center px-6 mt-4">
          <ErrorMessage message={myData?.message || "Network Error"} />
        </div>

      }
    </div>
  </div >

}
