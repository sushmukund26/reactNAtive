import React, {Component} from "react";
import {Platform, StyleSheet, Text, View, Switch, ListView} from "react-native";

const user = [
    {
        name: 'John Doe',
        isFavorite: false,
        id: 1
    },
    {
        name: 'Brad Traversy',
        isFavorite: true,
        id: 2
    },
    {
        name: 'Steve Smith',
        isFavorite: true,
        id: 3
    }
];

type Props = {};
export default class Component1 extends Component<Props> {

    constructor() {
        super();
        const users = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: users.cloneWithRows(user),
            db: user
        }
    }

    switchValueChanged(rowData, value) {
        newDs = this.state.db.slice();
        newDs = newDs.map((el) => el.id === rowData.id ? Object.assign({}, el, {isFavorite: value}) : el)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newDs),
            db: newDs
        })

    }

    renderFavorite() {
        const list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        names = this.state.db.filter((el) => el.isFavorite).map((el) => el.name);
        nameList = list.cloneWithRows(names);
        return (
            <ListView
                dataSource={nameList}
                renderRow={(rowData) => <Text>{rowData}</Text>
       }>
            </ListView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
          <View style={{flexDirection: 'row'}}>
            <Text>{rowData.name}</Text>
            <Switch 
            value = {rowData.isFavorite}
            onValueChange = {(value) => this.switchValueChanged(rowData, value)}/>
          </View>
        }>
                </ListView>
                {this.renderFavorite()}
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
