
const BASEURL = 'http://api.openweathermap.org/data/2.5/';
const APPID = 'cc631a3ea4cb0e5b20773efc2b508e1b';

class HTTPSeriver{
    static getWeather(cityName){
        let url = BASEURL +'weather' + '?' +'q='+cityName + '&' + 'appid=' + APPID; 
        console.log(url);
        return fetch(url)
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        return responseJSON;
                    })
                    .catch((error) => {
                        return error;
                    });
    }
    static getForecastWeather(cityName){
        let url = BASEURL +'forecast' + '?' +'q='+cityName + '&' + 'appid=' + APPID; 
        console.log(url);
        return fetch(url)
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        return responseJSON;
                    })
                    .catch((error) => {
                        return error;
                    });
    }
}

export default HTTPSeriver;
