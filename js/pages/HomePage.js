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
import HTTPUtils from './../HTTPUtils/HTTPUtils'
import {createStackNavigator,createAppContainer} from 'react-navigation';

const WINDOW_WITH = Dimensions.get('screen').width;
const ICON_WH = WINDOW_WITH *0.6;

class Homepage extends React.Component{
    static navigationOptions = ({navigation}) => {
        return{
            title:navigation.getParam('otherParam','sssssss'),
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
            weatherData:''
        };
    }
    componentDidMount(){
        this.props.navigation.setParams({otherParam:'New York'});
        this.setState({
            weatherData:'阿键盘手机单批发价按时发票上飞机阿萨德法师打发斯蒂芬阿萨德法师打发斯蒂芬'
        });
        let json = HTTPUtils.getWeather('NanJing');
        console.log(json);
    }
    render(){
        let dataArr = [{name:'dong',age:'27'},{name:'hui',age:'25'}]
        return(
            <View style = {styles.container}>
                <View style = {styles.weatherBgContainer}>
                    <Image style = {styles.weathreIcon}></Image>
                </View>
                <SafeAreaView style = {styles.weatherDescription}>
                    <Text style = {styles.weatherContent}>{this.state.weatherData}</Text>
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
        flex:1
    },
    weathreIcon:{
        width:ICON_WH,
        height:ICON_WH,
        backgroundColor:'#fecc5e',
        borderRadius:ICON_WH/2.0
    },
    weatherContent:{
        marginTop:44
    }
});

export default Homepage;