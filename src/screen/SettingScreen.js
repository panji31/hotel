import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image, AsyncStorage } from 'react-native';
import { Icon, Item, Input, List, ListItem, Thumbnail, Left, Body, Right, Button, Content, Header, Container, Title, Fab } from 'native-base';
import { connect } from 'react-redux'
import styles from '../style/style';
import * as actionUsers from '../../redux/actions/actionUsers'

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: []
        };
    }
    _signOutAsync = async () => {
        alert('ok');
        await AsyncStorage.clear();
        this.props.navigation.navigate('App');
    };
    render() {

        return (
            <Container style={styles.container}>
                <View style={styles.containerLogin}>
                    <View
                        style={[styles.avatar, styles.avatarContainer, { marginTop: 100 }]}>

                        <Image style={styles.avatar} />

                    </View>
                    <View style={{ marginTop: 30 }}><Text onPress={this._signOutAsync}>Logout</Text></View>
                </View>

            </Container >
        );
    }
}

