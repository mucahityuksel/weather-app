'use client'
import returnWeatherImage from "@/app/weather/weather";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { DataItem, ListType, ModalProps } from "@/types";


const Modal = ({ isOpen, onClose, historyData, getData }: ModalProps) => {

    const data = historyData.reverse()
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-15 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full h-auto p-6 relative ">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                >
                    ✕
                </button>
                <div className="flex flex-col">
                    <h1 className="text-2xl">History</h1>
                    <div className="">
                        <Swiper spaceBetween={10} slidesPerView={3}>
                            {
                                data?.map((item: DataItem, key: number) => {
                                    const weather = item?.list[0];
                                    const city = item?.city;
                                    if (key > data.length - 6) {
                                        return (
                                            <SwiperSlide key={key}>
                                                <div className="flex flex-col gap-1 justify-between color-black items-center bg-white rounded-xl h-52 py-2" onClick={() => {
                                                    getData(item)
                                                }}>
                                                    <span className="text-xs font-sans">
                                                        {moment.unix(weather.dt).format("MM.DD")}
                                                    </span>
                                                    <span className="text-sm font-sans">
                                                        {moment.unix(weather.dt).format("HH:mm a")}
                                                    </span>
                                                    <img
                                                        src={returnWeatherImage(weather?.weather[0]?.description, weather?.sys?.pod)}
                                                        className="object-contain w-10"
                                                    />
                                                    <span>{weather.main.temp}°{item?.type === 'imperial' ? 'F' : 'C'}</span>
                                                    <span className="text-xs">{city?.name}</span>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
