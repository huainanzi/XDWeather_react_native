import React from 'react';
import {View,Button,Text,StyleSheet} from 'react-native';
import MapView,{Marker} from 'react-native-maps'

class LocationPage extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTransparent:'true',
            headerRight:(
                <Button title = 'Finish' onPress = {navigation.getParam('finishClick')}></Button>
            ),
            headerLeft:(
                <Button title = 'Cancel' onPress = {() => navigation.goBack()}></Button>
            ),
        };
    };
    constructor(props){
        super(props);
        this.state ={
            currentLocation:{
                latitude:props.navigation.getParam('latitude'),
                longitude:props.navigation.getParam('longitude'),
            }
        };
        this._finishClick = this._finishClick.bind(this);
    }
    componentDidMount(){
        this.props.navigation.setParams({finishClick:this._finishClick});
    }
    _finishClick(){
        let callback = this.props.navigation.getParam('callback');
        callback(this.state.currentLocation);
        this.props.navigation.goBack();
    }
    _onRegionChange(location){

    }
    render(){
        return(
            <View style = {styles.containerView}>
                <MapView    style = {styles.map} 
                            region={{
                                latitude: this.state.currentLocation.latitude,
                                longitude: this.state.currentLocation.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }} 
                            onRegionChange = {this._onRegionChange} 
                >
                    <Marker draggable 
                            coordinate = {this.state.currentLocation}
                            onDragEnd={(e) => this.setState({currentLocation:e.nativeEvent.coordinate})}
                            >
                    </Marker>
                            
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    map: {
        flex:1,
      },
});

export default LocationPage;