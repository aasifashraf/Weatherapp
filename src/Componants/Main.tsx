import { Apikey } from "../Constants/Constants";
import { useState } from "react";
import WeatherDetails from "./WeatherDetails";
import { CiSearch } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

interface WeatherProps {
  city: string;
  humidity: number;
  temperature: number;
  description: string;
  speed: number;
  img: string;
}
const Main = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [error, setError] = useState<string>("");

  // console.log(city);
  // console.log(weather);

  const api = async () => {
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      const weatherData: WeatherProps = {
        city: data.name,
        temperature: data?.main.temp,
        humidity: data?.main?.humidity,
        description: data?.weather[0]?.description,
        speed: data?.wind?.speed,
        img: data?.weather[0]?.icon,
      };
      setWeather(weatherData);
    } catch (error) {
      setError("Please enter correct city name");
      console.log("There was a problem fetching the weather data:" + error);
    }
  };
  console.log(error);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const clearInput = () => {
    setCity("");
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex items-center justify-center">
      <div className="w-1/3 h-1/1.5  bg-white  backdrop-opacity-10 bg-opacity-45 rounded-xl">
        <div className="flex flex-wrap justify-between my-0 py-0 w-full">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city.toUpperCase()}
            className="border-b-[1px] m-[1rem] pl-4 bg-white bg-opacity-60 text-black p-[0.3rem] outline-none w-full rounded-2xl shadow-2xl"
            onChange={handleOnChange}
            onClick={clearInput}
          />
          <button
            type="button"
            onClick={api}
            className=" font-bold text-black text-2xl rounded-full mt-[1.08rem] px-[1rem] py-[0.3rem] hover:text-white hover:bg-black  absolute right-[1rem] ">
            <CiSearch />
          </button>
        </div>
        {!weather ? (
          <div className=" w-full h-full text-black flex items-center justify-center my-[1rem] font-thin">
            {error ? (
              <div className="flex items-center justify-center">
                <p className="font-bold text-xl mr-3">
                  <VscError />
                </p>
                <p className="text-black">{error}</p>
              </div>
            ) : (
              <p>Please enter a city</p>
            )}
          </div>
        ) : (
          <WeatherDetails {...weather} />
        )}
      </div>
    </div>
  );
};

export default Main;
