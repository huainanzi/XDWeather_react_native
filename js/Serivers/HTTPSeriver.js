
const BASEURL = 'http://api.openweathermap.org/data/2.5/weather';
const APPID = 'cc631a3ea4cb0e5b20773efc2b508e1b';

class HTTPSeriver{
    static getWeather(cityName){
       let url = BASEURL + '?' +'q='+cityName + '&' + 'appid=' + APPID; 
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