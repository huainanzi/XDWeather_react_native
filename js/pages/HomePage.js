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
            cityName:''
        };
    }
    componentDidMount(){
        HTTPSeriver.getWeather('NanJing')
                    .then((data) => {
                        //weatherData
                        let weatherData = 'it is' + ' ' + data.weather[0].description + ' ' + 'and' + ' ' + data.weather[1].description;
                        let weatherTemp = TempUtils.tranferTemp(data.main.temp);
                        this.setState({
                            weatherData:weatherData,
                            cityName:data.name,
                            weatherTemp:weatherTemp,
                        });
                        this.props.navigation.setParams({otherParam:this.state.cityName});
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
                     <WeatherDesComponent weather= {this.state.weatherData} temp= {this.state.weatherTemp} style = {styles.weatherContent}/>
                </SafeAreaView>
            </View>
        );
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
        alignItems:'center',
    },
    weathreIcon:{
        width:ICON_WH,
        height:ICON_WH,
        backgroundColor:'#fecc5e',
        borderRadius:ICON_WH/2.0
    },
    weatherContent:{
        
    }
});

export default Homepage;