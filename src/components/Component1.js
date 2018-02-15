import React, { Component } from 'react';
import update from 'immutability-helper';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
  ListView
} from 'react-native';

const users = [
    {name: 'John Doe',
    isFavorite: false,
    id: 1},
    {name: 'Brad Traversy',
    isFavorite: false,
    id: 2},
    {name: 'Steve Smith',
    isFavorite: false,
    id: 3}
]

type Props = {};
export default class Component1 extends Component<Props> {

  constructor() {
    super();
    console.log("$$$$$$$$");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds.cloneWithRows(users),
      newData: {},
      data: [
      { id: 1, author: "john", text: "foo" },
      { id: 2, author: "bob", text: "bar" }
    ]
    }
  }
  switchValueChanged(value, id) {
    console.log("************");
     // var data = this.state.userDataSource;
     // console.log(data);
    console.log("************");
    // update(state1, {$push: ['y']});
    var data = this.state.data;//this.state.userDataSource;
    var commentIndex = data.findIndex(function(c) { 
        return 1; 
    });

    var updatedComment = update(data[commentIndex], {text: {$set: value}}); 

    var newData = update(data, {
        $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({userDataSource: newData})
    // this.setState({newData: update(this.state.userDataSource, {$push: ['y']});
      //this.state.userDataSource.map((el)=>el)
      //data.map((el)=> el.id === id ? Object.assign({}, el, {isFavorite: value}) : el )
  // });
  }
  render() {
    return (
      <View style={styles.container}>
      <ListView
        dataSource = {this.state.userDataSource}
        renderRow = {(rowData) =>  
          <View>
          <Switch 
          value = {rowData.isFavorite}
          onValueChange = {(value) => this.switchValueChanged(value, rowData.id)}/>
          <Text>{rowData.name}</Text>
          </View>
        } >
      </ListView>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
