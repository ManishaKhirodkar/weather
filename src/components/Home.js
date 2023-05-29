import React, { useEffect, useState } from 'react'
import '../components/home.css'
import axios from 'axios';

const Home = () => {

    const apikey = "6c6ca858cd50e4d931120b60cc778b79"

    const [search, setSearch] = useState("");

    const [data, setData] = useState({});

    const getWeather = (cityName) => {
        if (!cityName)
            return
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&APPID=" + apikey
        axios.get(apiUrl).then((res) => {
            console.log("response", res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("err", err)
        })
    }
    useEffect(() => {
        getWeather("Pune")
    }, [])

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }
    const searchButton = () => {
        getWeather(search)
    }

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setDate(new Date(), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div>
            <div className="hero">
                <h1 style={{ color: 'white', paddingTop: '35px' }}><img src="../Assets/weather.png" alt="" width={50} height={50} /> Weather Application</h1>
                <div className="search-inp">
                    <input type="search" className="search"
                        onChange={handleInputChange}
                        value={search}
                        placeholder='Search city' />
                    <button className="btn btn-success icn" onClick={searchButton}>Search</button>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 offset-md-7">
                            <div className="box">
                                <h1>Weather Details</h1>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="left-side">
                                            <ul>
                                                <li>Cloudy</li>
                                                <li>Humidity</li>
                                                <li>Wind</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side">
                                            <ul>
                                                {data.main ? <li>{Math.round(data.main.feels_like)}%</li> : null}
                                                {data.main ? <li>{Math.round(data.main.humidity)}%</li> : null}
                                                {data.wind ? <li>{Math.round(data.wind.speed)}km/h</li> : null}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="box1">
                                <h1>{(data?.main?.temp.toFixed(0))}° </h1><p>{data?.name}</p>
                                <span>{date.toLocaleTimeString()} {date.toLocaleDateString()}</span>
                                <i className="bi bi-brightness-low-fill"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="section6">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-7 col-sm-12">
                                <h3 className="tit5">WEATHER APP</h3>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home