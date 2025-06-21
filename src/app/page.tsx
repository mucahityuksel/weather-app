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
      <img
        src='/image.png'
        className='w-full h-dvh object-cover blur-xs'
      ></img>
      <div className='absolute w-full h-full top-0 bg-white opacity-50'>

      </div>
      <div className={`opacity-100 absolute top-0 w-full input-container ${startAnimation ? 'move-up' : ''}`}>
        <div className='flex justify-center relative w-full p-10'>
          <div className='relative w-160  '>
            <Input type='text' className='opacity-100 w-full p-10' placeholer='Search City' />
            <div className='w-full h-50 bg-white color-black absolute top-15 rounded-md'>
              <div className='flex flex-col p-6'>
                {
                  data?.list.map((item: any, key: number) => {
                    return <div key={key} className='flex gap-10 p-3'>
                      <img src='/clearSky.png'></img>
                      <span className='color-black'>{data?.city?.name}</span>
                      <span className='color-black'>{moment(item?.dt_txt).format("YYYY-MM-DD")}</span>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
