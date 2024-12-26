'use client';

import Image from 'next/image';
import useWeatherInfo from '@/hooks/weather/useWeatherInfo';

const WeatherInfo = ({ lat, lon }: { lat: string; lon: string }) => {
  const {
    weatherCondition, // 캠핑장의 현재 날씨 상태(맑음, 비, 눈, 번개)
    weatherInfo, // 캠핑장의 현재 전체 날씨 데이터
    isWeatherPending,
    isWeatherError,
    weatherError,
    weatherImgSrc,
  } = useWeatherInfo({ lat, lon });

  if (isWeatherPending) {
    return <p className="ml-2 text-sm font-bold text-gray-600">Loading...</p>;
  }

  if (isWeatherError) {
    return <p>Error:{weatherError!.message}</p>;
  }

  return (
    <div className="w-[300px] items-start">
      <div className="flex flex-row items-center">
        <Image
          src={weatherImgSrc(weatherCondition)}
          alt={weatherCondition}
          width={30}
          height={30}
        />
        <p className="ml-2 text-sm font-bold text-gray-600">
          현재 온도 :{' '}
          <span className="font-normal">{weatherInfo?.main.temp}°C</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
