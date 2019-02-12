
const BASEURL = 'http://api.openweathermap.org/data/2.5/weather';
const APPID = 'cc631a3ea4cb0e5b20773efc2b508e1b';

class HTTPUtils{
    static getWeather(cityName){
       let url = BASEURL + '?' +'q='+cityName + '&' + 'appid=' + APPID; 
       console.log('asdfasfasdfasdfasdfggggggggg');
       return 'dddddddddddddddddd';
    //    return fetch(url)
    //             .then((response) => response.json)
    //             .then((responseJSON) => {
    //                 return responseJSON;
    //             })
    //             .catch((error) => {

    //             });
    }
    static getWeather(Id){
        
    }
    static getWeather(lat,lon){
        
    }
}

export default HTTPUtils;