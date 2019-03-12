import React from  'react';
import {View,
        StyleSheet,
        Text,
        FlatList,
        SafeAreaView,
        Dimensions,
        Alert,
        Image,
        Button,
} from 'react-native';
import HTTPSeriver from './../Serivers/HTTPSeriver';
import WeatherDesComponent from './../Component/WeatherDesComponent';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import TempUtils from './../Utils/TempUtils'
import DateUtils from './../Utils/DateUtils'
import Icon from 'react-native-vector-icons/FontAwesome'

const Geolocation = require('Geolocation');

const WINDOW_WITH = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const ICON_WH = WINDOW_WITH *0.6;

class Homepage extends React.Component{
    static navigationOptions = ({navigation}) => {
        return{
            title:navigation.getParam('otherParam',''),
            headerTransparent:'true',
            headerRight:(
                <Text style = {{marginRight:10}}>℃</Text>
            ),
            headerLeft:(
                <Icon.Button    name = 'map-marker' 
                                backgroundColor = 'transparent' 
                                onPress = {navigation.getParam('locationCallback')}
                                color = "#333333" 
                                size = {25}></Icon.Button>
            ),
            
        };
    };
    constructor(props){
        super(props);
        this._locationClick = this._locationClick.bind(this);
        this.state = {
            weatherData:'',
            cityName:'',
            hourforecastArr:[],
            dayforecastArr:[],
            currentLocation:{},

        };
    }
    componentDidMount(){
        this.props.navigation.setParams({locationCallback:this._locationClick});
        //location
        Geolocation.getCurrentPosition((location) =>{
            this._fetchData(location.coords);
            this.setState({
                currentLocation:location.coords
            });
        },
        (error) =>{
            console.log('get location fail');
        });
       
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.weatherBgContainer}>
                    <Image style = {styles.weathreIcon}></Image>
                </View>
                <SafeAreaView style = {styles.weatherDescription}>
                    <View style = {styles.weatherHourForest}>
                        <View style = {styles.weatherHourList}>
                            <FlatList  
                                horizontal = {true} 
                                data = {this.state.hourforecastArr} 
                                ItemSeparatorComponent = {this._renderSeparator}
                                showsHorizontalScrollIndicator = {false}
                                showsVerticalScrollIndicator = {false}
                                keyExtractor = {(item,index) => {item.dt}}
                                renderItem = {({item}) => (
                                    <View>
                                        <Text style = {{fontSize:13,color:'#3c3a3a',textAlign:'center'}}>{DateUtils.tranferDate(item.dt)}</Text>
                                        <Image style={{width: 50, height: 50}} source = {{uri:this._weatherIconURL(item.weather[0].icon)}}/>
                                        <Text style = {{fontSize:13,color:'#3c3a3a',textAlign:'center'}}>{TempUtils.tranferTemp(item.main.temp)}</Text>
                                    </View>
                                )} 
                            />
                        </View>
                    </View>
                    <View style = {styles.weatherContent}>
                        <WeatherDesComponent 
                            weather= {this.state.weatherData} 
                            temp= {this.state.weatherTemp} />
                    </View>
                    <View style = {styles.weatherDayForest}>
                        <FlatList
                            data = {this.state.dayforecastArr}
                            keyExtractor = {(item,index) =>{item.dt}}
                            renderItem = {({item}) => (
                                <View style = {{flexDirection:'row'}}>
                                    <View style = {{flex:1,justifyContent:'center'}}>
                                        <Text style = {{fontSize:15,color:'#3c3a3a',marginLeft:10}}>{DateUtils.getWeek(item.dt)}</Text>
                                    </View>
                                    <View style = {{flex:1,alignItems:'center'}}>
                                        <Image style = {{height:50,width:50}} source = {{uri:this._weatherIconURL(item.weather[0].icon)}}></Image>
                                    </View>
                                    <View style = {{flex:1,
                                                    alignItems:'center',
                                                    flexDirection:'row',
                                                    justifyContent:'flex-end'}}>
                                        <Text style = {{marginRight:20,fontSize:15,color:'#3c3a3a'}}>{TempUtils.tranferTemp(item.main.temp_max)}</Text>
                                        <Text style = {{marginRight:10,fontSize:15,color:'#3c3a3a'}}>{TempUtils.tranferTemp(item.main.temp_min)}</Text>
                                    </View>
                                </View> 
                            )}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
    _renderSeparator(){
        return(
            <View style = {{width:100}}></View>
        );
    }
    _weatherIconURL(icon){
        let url = 'http://openweathermap.org/img/w/'+icon+'.png'
        console.log(url);
        return url ;
    }
    _locationClick(){
        this.props.navigation.navigate('locationPage',{ latitude:this.state.currentLocation.latitude,
                                                        longitude:this.state.currentLocation.longitude,
                                                        callback: (coords) =>{
                                                            this.setState({
                                                                currentLocation:coords
                                                            });
                                                            this._fetchData(coords);
                                                        }
                                                    }
                                        );
    }
    _fetchData(coords){
        HTTPSeriver.getWeather(coords.latitude,coords.longitude)
        .then((data) => {
            console.log(data);
            //weatherData
            let arr = data.weather.map((item) => {
                return item.description;
            });
            let weatherData = 'its ' + arr.join(' ');
            let weatherTemp = TempUtils.tranferTemp(data.main.temp);
            this.setState({
                weatherData:weatherData,
                cityName:data.name,
                weatherTemp:weatherTemp,
            });
            this.props.navigation.setParams({otherParam:this.state.cityName});
        })
        .catch((error) => {
            console.log(error);
        });
        HTTPSeriver.getForecastWeather(coords.latitude,coords.longitude)
                .then((data) => {
                    this.setState({
                        hourforecastArr:data.list.slice(0,8),
                        dayforecastArr:data.list.filter((item) => {
                            let value = new Date(parseInt(item.dt) * 1000);
                            console.log(value.getDate());
                            return value.getHours() == 11;
                        }),
                    });
                })
                .catch((error) => {
                    console.log(error);    
                });            
            }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        flex:1
    },
    weatherBgContainer:{
        backgroundColor:'#fdf6e6',
        position:'absolute',
        right:0,
        bottom:0,
        top:0,
        left:0,
        alignItems:'center',
        justifyContent:'center'
    },
    weatherDescription:{
        flex:1,
        justifyContent:'center',
    },
    weathreIcon:{
        width:ICON_WH,
        height:ICON_WH,
        backgroundColor:'#fecc5e',
        borderRadius:ICON_WH/2.0
    },
    weatherContent:{
       flex:1,
    //    backgroundColor:'green',
       justifyContent:'center',
    },
    weatherHourForest:{
        // backgroundColor:'red',
        flex:1,
        justifyContent:'flex-end'
    },
    weatherDayForest:{
        // backgroundColor:'yellow',
        flex:1,
    },
    weatherHourList:{
        height:80,
        marginBottom:20,
    },
});

export default Homepage;