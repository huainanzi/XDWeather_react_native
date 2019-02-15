import React from 'react'
import {View,
        Text,
        StyleSheet,
} from 'react-native'

class  WeatherDesComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.weather}>{this.props.weather}</Text>
                <Text style = {styles.temp}>{this.props.temp}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{ 
        alignItems:'center',
    },
    weather:{
        fontSize:20,
        color:'#3c3a3a',
        fontWeight:'bold',
    },
    temp:{
        fontSize:50,
        color:'#3c3a3a',
        marginTop:20,
    },

});

export default WeatherDesComponent;