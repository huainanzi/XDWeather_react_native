import React from 'react';
import {View,StyleSheet} from 'react-native';

class LocationPage extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTransparent:'true',
        };
    };
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style = {styles.containerView}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        backgroundColor:'red',
    },
});

export default LocationPage;