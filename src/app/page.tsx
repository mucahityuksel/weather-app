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
import { ExtendedDataItem, ListType } from "@/types";

export default function Home() {
  const [value, setValue] = useState<string>("istanbul");
  const { city, unit, setCity, toggleUnit } = useWeatherStore();
  const { data, error, isLoading } = useWeatherData(city, unit);
  const [myData, setMyData] = useState<ExtendedDataItem | any>();

  const [, setType] = useState<string>(unit === 'imperial' ? '°F' : '°C');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [historyData, setHistoryData] = useState<ExtendedDataItem[]>([]);

  // Derece simgesi güncelle
  useEffect(() => {
    setType(unit === 'imperial' ? '°F' : '°C');
  }, [unit]);

  // Yeni veri geldiğinde tip bilgisi ekle
  useEffect(() => {
    if (data !== undefined) {
      setMyData({ ...data, type: unit });
    }
  }, [data, unit]);

  // İlk açılışta localStorage'dan geçmiş verileri al
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("historyData");
      if (stored) {
        try {
          const parsed: ExtendedDataItem[] = JSON.parse(stored);
          setHistoryData(parsed);
        } catch (e) {
          console.error("LocalStorage parse error", e);
        }
      }
    }
  }, []);

  // Yeni şehir geldiğinde geçmişe ekle
  useEffect(() => {
    if (myData?.cod === "200") {
      setHistoryData((prevItems: ExtendedDataItem[]) => {
        const isExist = prevItems.some((item) => item?.city?.name === myData.city.name);
        if (isExist) return prevItems;
        const updated = [...prevItems, myData];
        localStorage.setItem("historyData", JSON.stringify(updated));
        return updated;
      });
    }
  }, [myData]);

  // Modal açıldığında geçmişi tekrar yükle
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem("historyData");
      if (stored) {
        try {
          const parsed: ExtendedDataItem[] = JSON.parse(stored);
          setHistoryData(parsed);
        } catch (e) {
          console.error("LocalStorage parse error", e);
        }
      }
    }
  }, [isOpen]);

  return (
    <div className="relative w-full h-cover bg-cover weather-main">
      <div className="flex flex-col">
        <div className="flex justify-start w-full px-15 py-10 uppercase color-black font-sans">
          weather app
        </div>
        <div className="flex justify-center items-center relative px-5 gap-1">
          <Input
            type="text"
            className="bg-white outline-none p-3 rounded-xl bg-white/30"
            onChange={(e) => setValue(e.target.value)}
            placeholer="Search City"
          />
          <img
            src="/search.svg"
            className="cursor-pointer rounded-xl"
            onClick={() => setCity(value)}
            alt="Search"
          />
          <button onClick={toggleUnit} className="ml-2 px-4 py-3 bg-white/20 rounded-xl cursor-pointer">
            {myData?.type === "metric" ? "°C" : "°F"}
          </button>
          <img
            src="/history.svg"
            className="cursor-pointer w-10 rounded-xl"
            onClick={() => setIsOpen(true)}
            alt="History"
          />
        </div>

        {/* MODAL */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          historyData={historyData}
          getData={(data: ExtendedDataItem) => {
            setMyData(data);
            setIsOpen(false);
          }}
        />

        {/* HATA */}
        {error && (
          <div className="flex justify-center items-center px-5 mt-4">
            <div className="bg-red-100 text-red-600 px-6 py-3 rounded-xl">
              {error.message || "Bir hata oluştu"}
            </div>
          </div>
        )}

        {/* LOADING */}
        {isLoading ? (
          <div className="flex justify-center items-center margin-auto py-50">
            <Loading />
          </div>
        ) : myData?.cod === "200" ? (
          <>
            {/* ŞEHİR BİLGİLERİ */}
            <div className="flex flex-col justify-start items-center">
              <div className="flex flex-col gap-1 justify-start w-full py-10 px-15 color-black">
                <span className="text-3xl font-sans">{myData.city.name}, {myData.city.country}</span>
                <span className="text-sm font-sans">{moment().format("MMMM DD dddd, HH:mm")}</span>
              </div>

              {/* ANA HAVA DURUMU */}
              <div className="flex flex-wrap w-full justify-center gap-5 items-center">
                <div className="flex flex-wrap w-3xs justify-center gap-2 items-center p-2 color-black main-weather rounded-xl">
                  <img
                    src={returnWeatherImage(myData.list[0].weather[0].description, myData.list[0].sys.pod)}
                    className="object-contain w-20"
                    alt="Weather icon"
                  />
                  <div className="flex flex-col">
                    <span className="text-5xl">
                      {myData.list[0].main.temp}{myData.type === 'metric' ? '°C' : '°F'}
                    </span>
                    <span className="text-nowrap font-sans text-xs uppercase">
                      {myData.list[0].weather[0].description}
                    </span>
                  </div>
                </div>

                {/* DETAYLAR */}
                <div className="flex w-3xs justify-center gap-2 items-center bg-white/20 px-2 rounded-xl weather-detail">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{myData.list[0].main.temp_max.toFixed(0)}{myData.type === 'metric' ? '°C' : '°F'}</span>
                      <span className="text-sm">High</span>
                    </div>
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{myData.list[0].main.temp_min}{myData.type === 'metric' ? '°C' : '°F'}</span>
                      <span className="text-sm">Low</span>
                    </div>
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{myData.list[0].wind.speed} m/s</span>
                      <span className="text-sm">Wind</span>
                    </div>
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{moment.unix(myData.city.sunrise).format("HH:mm a")}</span>
                      <span className="text-sm">Sunrise</span>
                    </div>
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{moment.unix(myData.city.sunset).format("HH:mm a")}</span>
                      <span className="text-sm">Sunset</span>
                    </div>
                    <div className="flex flex-col p-3">
                      <span className="text-2xl">{myData.list[0].main.humidity}%</span>
                      <span className="text-sm">Humidity</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* HAVA SAAT DİLİMİ */}
              <div className="flex w-full justify-center items-center py-15 px-15">
                <Swiper spaceBetween={10} slidesPerView={9}>
                  {myData.list.map((item: ListType, key: number) => (
                    <SwiperSlide key={key}>
                      <div className="flex flex-col gap-1 justify-between items-center bg-white/20 rounded-xl h-32 py-2">
                        <span className="text-xs font-sans">{moment.unix(item.dt).format("MM.DD")}</span>
                        <span className="text-sm font-sans">{moment.unix(item.dt).format("HH:mm a")}</span>
                        <img
                          src={returnWeatherImage(item.weather[0].description, item.sys.pod)}
                          className="object-contain w-10"
                          alt="Hourly weather"
                        />
                        <span>{item.main.temp}{myData.type === 'metric' ? '°C' : '°F'}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center px-6 mt-4">
            <ErrorMessage message={myData?.message} />
          </div>
        )}
      </div>
    </div>
  );
}
