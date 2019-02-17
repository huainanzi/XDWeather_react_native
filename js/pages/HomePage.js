import React from  'react';
import {View,
        StyleSheet,
        Text,
        FlatList,
        SafeAreaView,
        Dimensions,
        Image,
        Button
} from 'react-native';
import HTTPSeriver from './../Serivers/HTTPSeriver';
import WeatherDesComponent from './../Component/WeatherDesComponent';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import TempUtils from './../Utils/TempUtils'
import DateUtils from './../Utils/DateUtils'

const WINDOW_WITH = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const ICON_WH = WINDOW_WITH *0.6;

class Homepage extends React.Component{
    static navigationOptions = ({navigation}) => {
        return{
            title:navigation.getParam('otherParam',''),
            headerTransparent:'true',
            headerRight:(
                <Button title='温度'></Button>
            ),
            headerLeft:(
                <Button title='地图'></Button>
            ),
            
        };
    };
    constructor(props){
        super(props);
        this.state = {
            weatherData:'',
            cityName:'',
            forecastArr:[],
        };
    }
    componentDidMount(){
        console.log('ffffff');
        HTTPSeriver.getWeather('NanJing')
                    .then((data) => {
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
        HTTPSeriver.getForecastWeather('NanJing')
                    .then((data) => {
                        console.log(data.message);
                        this.setState({
                            forecastArr:data.list.slice(0,8),
                        });
                    })
                    .catch((error) => {

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
                                data = {this.state.forecastArr} 
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
                            data = {['dass','ddddfd','ddddddsadfeead']}
                            renderItem = {({item}) => (
                                <View style = {{flexDirection:'row'}}>
                                    <View style = {{flex:1,justifyContent:'center'}}>
                                        <Text style = {{fontSize:15,color:'#3c3a3a',marginLeft:10}}>02.16</Text>
                                    </View>
                                    <View style = {{flex:1,alignItems:'center'}}>
                                        <Image style = {{height:50,width:50}} source = {{uri:'http://openweathermap.org/img/w/10d.png'}}></Image>
                                    </View>
                                    <View style = {{flex:1,
                                                    alignItems:'center',
                                                    flexDirection:'row',
                                                    justifyContent:'flex-end'}}>
                                        <Text style = {{marginRight:20,fontSize:15,color:'#3c3a3a'}}>20</Text>
                                        <Text style = {{marginRight:10,fontSize:15,color:'#3c3a3a'}}>10</Text>
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