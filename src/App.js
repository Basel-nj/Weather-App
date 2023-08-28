import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
   const [data, setData] = useState();
   const [location, setLocation] = useState("");
   const [errorHappend, setErrorHappend] = useState(false);

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=be90fe8efc5d6aa9601791396e2054d4`;

   const searchLocation = (event) => {
      if (event.key == "Enter") {
         axios
            .get(url)
            .then((respons) => {
               setData(respons.data);
               setLocation("");
               setErrorHappend(false);
            })
            .catch((err) => {
               setErrorHappend(true);
            });
      }
   };

   return (
      <div className="app">
         <div className="search">
            <input
               type="text"
               placeholder="Enter Location"
               value={location}
               onKeyDown={(e) => {
                  searchLocation(e);
               }}
               onChange={(e) => setLocation(e.target.value)}
            />
         </div>
         {errorHappend && (
            <div className="error">
               <p>Ther are an Error , please try again</p>
            </div>
         )}
         {data !== undefined && !errorHappend ? (
            <div className="container">
               <div className="top">
                  <div className="location">
                     <p>{data.name}</p>
                  </div>
                  <div className="temp">
                     {data.main ? (
                        <h1>{(+data.main.temp - 273).toFixed()} C&#176;</h1>
                     ) : null}
                  </div>
                  <div className="description">
                     <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                     />
                     {data.weather && <p>{data.weather[0].main}</p>}
                  </div>
               </div>
               <div className="center">
                  <p> min : {(+data.main.temp_min - 273).toFixed(1)} C&#176;</p>
                  <p>max : {(+data.main.temp_max - 273).toFixed(1)} C&#176;</p>
               </div>
               <div className="bottom">
                  <div className="feels">
                     {data.main && (
                        <p className="bold">
                           {(+data.main.feels_like).toFixed()}
                        </p>
                     )}

                     <p>Feels Like</p>
                  </div>
                  <div className="humidity">
                     {data.main && (
                        <p className="bold">
                           {(+data.main.humidity).toFixed()}%
                        </p>
                     )}

                     <p>Humidity</p>
                  </div>
                  <div className="wind">
                     {data.wind && (
                        <p className="bold">
                           {(+data.wind.speed).toFixed()} MPH
                        </p>
                     )}

                     <p>Wind Speed</p>
                  </div>
               </div>
            </div>
         ) : (
            !errorHappend && (
               <div className="noData">
                  Search about a country in the input above
               </div>
            )
         )}
      </div>
   );
}

export default App;
