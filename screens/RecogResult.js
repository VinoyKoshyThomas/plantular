
import React from 'react';
import { Text, View, BackHandler } from 'react-native';
import { Card, Image } from 'react-native-elements'
export default class RecogResult extends React.Component {
    state = { plant_name:"" , image_str:""}
    
    async componentWillMount() {
      
      let image_url= this.props.navigation.state.params.image;
      
      image = image_url['base64'];
      //console.log(image_str);
        this.setState(previousState => (
            {image_str : image_url}))
          //console.log("image",image);
      
          
          await fetch('https://plantular.herokuapp.com/upload__from__mobile__app', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64 : image,
            }),
          }).then((response) => { 
            let result = response.text();
            console.log(result['_55']);
            this.setState(previousState => (
                { plant_name: result['_55'] }))
            
            
             
        })
            .then((responseJson) => {
              responseJson;
            })
            .catch((error) => {
              console.error(error);
            });
      }
      async componentDidMount() {
        try{
          BackHandler.EventEmitter.emitter.setMaxListeners();
          BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        console.log('add result')
      }
        catch(e){
          console.log(e);
        }
      }
      async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        console.log('remove result')
        this.setState(previousState => (
          {image_str : null}))
      }
      handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
      }
  render() {
    let plants = [
        {
           name: this.state.plant_name,
           avatar: this.state.image_str
        },
       ];
    return (
      <View>
             
      <Card title="Results">
      {
          
        plants.map((u, i) => {
          return (
            <View key={i}>
              <Image
                resizeMode="cover"
                source={{ uri: this.props.navigation.state.params.image.uri }}
                style={{ width:330, height:200,alignSelf:"center" }}
              />
              <Text>{u.name}
              </Text>
              <Text>NativeBase is an open source framework to build React Native app
                s over a single JavaScript codebase for Android and iOS.
                </Text>
            </View>
          );
        })
      }
    </Card>
    
    </View>
        
    );
    
  }
  
  


 
  
}