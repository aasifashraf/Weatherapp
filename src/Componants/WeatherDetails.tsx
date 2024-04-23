import { WiThermometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

const WeatherDetails = ({
  city,
  temperature,
  humidity,
  description,
  speed,
  img,
}: {
  city: string;
  temperature: number;
  humidity: number;
  description?: string;
  speed: number;
  img?: string;
}) => {
  return (
    <div className=" text-black  ">
      <div className="flex justify-center items-center my-0">
        <img
          src={`https://openweathermap.org/img/wn/${img}@2x.png`}
          alt=""
          className=" w-[5rem] h-[5rem]"
        />
      </div>
      <div className=" w-full text-center  ">
        <p className="text-2xl font-black">
          {Math.round(temperature - 273.15)} °C
        </p>
        <p className="font-light">{description?.toUpperCase()}</p>
      </div>
      <div className=" font-light text-center text-3xl">
        <p>{city}</p>
      </div>
      <div className="flex justify-around bg-black bg-opacity-70 text-white p-2 rounded-xl mt-[4rem] flex-wrap font-thin ">
        <div className="flex  items-center justify-center my-[0.3rem]">
          <div className="text-4xl mr-3">
            <WiThermometer />
          </div>
          <div className="flex flex-col  items-center justify-center">
            <p>Humidity</p>
            <p>{humidity} %</p>
          </div>
        </div>
        <div className="border-l-[1px] border-white"></div>
        <div className="flex items-center justify-center my-[0.3rem]">
          <div className="text-4xl mr-3">
            <WiStrongWind />
          </div>
          <div className="flex flex-col  items-center justify-center">
            <p>Wind Speed</p>
            <p> {speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
