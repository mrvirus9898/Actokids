/**Home page for our app */
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ListView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  FlatList
} from 'react-native';


import SearchPage from './SearchPage';
import EnterEvent from './EnterEvent';



export default class HomePage extends Component {
  //Added Tab Bottom Navigation 
  static navigationOptions = {
    title: 'Welcome',
    tabBarLabel: 'Activities',
    tabBarIcon: ({tintColor })=>(
        <Image
            source = {require('./images/activity.png')}
            style = {[{width: 26}, {height: 26}, {tintColor: tintColor}]}
            />
    )
  };

    state = {
      data: []
    };
    componentWillMount(){
      this.fetchData();
    }

    /// get image from json
    fetchData = async () => {
      const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
      const json = await response.json();
      this.setState({ data: json.Features });
    };

    //process image return 
    cameraType(camera) {
        if(camera.Type == 'sdot'){
              return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
        }else{
              return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
        }
    }

  render() {
    return (     
    <View style={styles.container}>
            {/* <View style={styles.outerApp}>
                <Text style={styles.titleText}>
                  Acto Kids
                </Text>
            </View>  */}
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>Acto Kids</Text>
                
                {/*Filter: icon */}
                <TouchableOpacity 
                    style={styles.toolbarButton}>
                      <Image
                        source={require('./images/filter.png')}
                        />
                </TouchableOpacity>

                {/**Location: icon*/}
                <TouchableOpacity 
                    style={styles.toolbarButton}>
                      <Image
                        source={require('./images/location.png')}
                        />
                  </TouchableOpacity>
            </View>

    <FlatList
        data={this.state.data}
        keyExtractor={(x, i) => i.toString()}
        renderItem={ ({item}) =>
        <View style={{marginBotton: 30}}>
              <Text style={{fontSize: 20, color: 'black'}}>
                {`${item.Cameras[0].Description}`}
              </Text>
              <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 250, margin: 3}}
                />
              </View>
        }/>


            <TouchableHighlight style={styles.searchButton}
             underlayColor='#ff7043' 
             onPress={()=>{console.log('pressed')}}> 
                <Image
                  source = {require('./images/search.png')}
                  />
            </TouchableHighlight>
         
       </View>      
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'lightgray',
  },

  toolbar:{
    backgroundColor: '#FF4500',
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row'
   },
   toolbarTitle:{
     color: '#fff',
     width: 150,
     fontSize: 25,
     textAlign: 'center',
     //flex: 1,
   },

   toolbarButton:{
     width: 50,
     justifyContent: 'center',
     flex: 2,
   },

  
  // outerApp: {
  //   justifyContent: 'flex-start',
  //   //justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#FF4500',
  //  // backgroundColor: '#A9A9A9',
  // //backgroundColor: 'red',
  // },

 
  // toolbarContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 8,
  //   height: 56,
  //   flex: 1,
  // },

  searchButton:{
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  
  button: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 20
  },

   
  titleText:{
    fontFamily: 'serif',
    fontSize: 32, 
    color: 'black',
  },
  headerText: { 
    fontSize: 27,
    fontFamily: 'serif',
    color: 'black',
  },
  itemText: { 
    color:'blue',
    fontFamily: 'serif',
    fontSize:22,
    textAlign: 'center',
  },
  backButton: {
    flex:1,
    width:75,
    fontFamily: 'serif',
    fontSize: 20,
    color:'white'
  },
  inputText: {  
    fontFamily: 'serif',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  }, 
  headerView: {         
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: "center",
}, 

});
