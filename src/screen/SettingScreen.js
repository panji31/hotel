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
        await AsyncStorage.clear();
        this.props.navigation.navigate('App');
    };
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Icon type="FontAwesome" name="gears" style={{ color: 'grey' }} />
                    </Left>
                    <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <Title style={{ color: 'grey' }}>SETTING PROFILE</Title>
                    </Body>
                </Header>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginTop: 20
                }}>
                    <Image style={styles.imageLogo} source={{ uri: 'http://192.168.0.66:5000/static/summer2.png' }} />
                    <Text style={{ color: '#785743', textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>Admin Private Hotel</Text>
                    <View style={{ width: '60%' }}>
                        <Button style={{ marginTop: 20, backgroundColor: '#f06d63', borderRadius: 30 }} block onPress={this._signOutAsync}><Text style={{ textAlign: 'center' }}>LOGOUT</Text></Button>
                    </View>
                </View>
            </Container>



        );
    }
}

