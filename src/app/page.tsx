'use client'
import Input from '@/components/Input';
import moment from 'moment';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {

  const [startAnimation, setStartAnimation] = useState(false);
  const [data, setData] = useState<any>()
  useEffect(() => {
    // Sayfa açıldıktan sonra animasyonu başlat
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100); // 100ms sonra başlasın

    return () => clearTimeout(timer);
  }, []);

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


  return (
    <div className="relative">
      
      <div className='absolute w-full h-full top-0 bg-white opacity-50'>

      </div>
      <div className={`opacity-100 flex flex-col  justify-center items-center absolute top-0 w-full input-container ${startAnimation ? 'move-up' : ''}`}>
        <div className='current-weather h-60 -top-30 p-10 '>
          <div className=' w-full h-full rounded-md'>
            <div className='flex justify-between w-full  h-full'>
              <div className='px-20 flex flex-col items-center'>
                <span className='text-5xl'>{data?.city?.name}</span>
                <span className='text-xl'>{moment(new Date()).format(" DD MMMM, HH:MM")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center relative w-full p-10'>
          <div className='relative w-160 margin-auto '>
            <Input type='text' className='opacity-100 w-full p-10' placeholer='Search City' />
            <div className='w-full h-50 bg-white color-black absolute top-15 rounded-md'>
              <div className='flex flex-col p-6'>
                <div className='flex gap-10 p-3'>
                  <div className='flex justify-start'>
                    <img src='/clearSky.svg' className='object-contain'></img>
                    <div className='flex flex-col align-center'>
                      <span className='color-black'>{(data?.list[0]?.main?.temp - 273.15).toFixed(0)}C / {data?.list[0]?.main?.temp}K</span>
                      <span className='color-black'>{data?.city?.name}/{data?.city?.country}</span>
                      <span className='color-black'>{moment(new Date()).format(" DD MMMM, HH:MM")}</span>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
