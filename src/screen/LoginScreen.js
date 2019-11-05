import React, { Component } from 'react';
import { TextInput, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux'
import { Text, View, Container, Form, Item, Input, Label, Button, Icon } from 'native-base';
import styles from '../style/style';

import * as actionUsers from '../../redux/actions/actionUsers'

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            button: false,
            swaptext: true,
            error: ""
        };
    }

    async componentWillMount() {
        await AsyncStorage.getItem('token', (error, result) => {
            if (result) {
                this.props.navigation.navigate('Auth')

            }
        });
    }
    setEmail = (text) => {
        this.setState({
            email: text
        })

    }
    setPassword = (text) => {
        this.setState({
            password: text
        })

    }
    set_viewText = () => {
        if (this.state.swaptext == true) {
            this.setState({
                swaptext: false
            })
        } else {
            this.setState({
                swaptext: true
            })
        }
    }
    get_symbolText = () => {
        if (this.state.swaptext == true) {
            return "eye";
        } else {
            return "eye-with-line";
        }
    }
    check = () => {
        if (this.props.loginLocal.login.status == 'ok') {
            const userid = this.props.loginLocal.login.id;
            const token = this.props.loginLocal.login.token;

            AsyncStorage.setItem('token', token)
            AsyncStorage.setItem('userid', userid)

            this.props.navigation.navigate('Auth')
        } else {
            const failed = this.props.loginLocal.login.failed;
            this.setState({
                error: failed
            })

        }

    }
    auth = async () => {
        const passwordState = this.state.password;
        const emailState = this.state.email;

        const data = { username: emailState, password: passwordState };
        await this.props.handleLogin(data);
        await this.check();
    }

    render() {
        return (
            <Container>
                <View style={styles.containerLogin}>
                    <Image style={styles.imageLogo}
                        source={{ uri: 'http://192.168.0.66:5000/static/summer2.png' }}
                    />
                    <Text style={{ color: '#785743', textAlign: 'center', fontWeight: 'bold', fontSize: 23 }}>
                        Private Hotel
                    </Text>
                    <Text style={{ color: '#785743', textAlign: 'center' }}>
                        Privacy Secrecy Confidentiality
                    </Text>
                    <Form style={{ width: '80%', marginTop: 15, marginBottom: 15 }}>
                        <Item stackedLabel>
                            <Label style={{ color: '#785743' }}>Username</Label>
                            <Input onChangeText={this.setEmail} style={styles.emailFied} />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{ color: '#785743' }}>Password</Label>
                            <Item>
                                <TextInput style={styles.fieldPassword} secureTextEntry={this.state.swaptext} onChangeText={this.setPassword} />
                                <Icon onPress={this.set_viewText} active type="Entypo" name={this.get_symbolText()} style={styles.password} />
                            </Item>
                        </Item>
                        <Button style={{ marginTop: 20, backgroundColor: '#f06d63', borderRadius: 30 }} block onPress={this.auth}><Text>LOGIN</Text></Button>
                    </Form>
                    <Text style={{ color: '#f06d63', textAlign: 'center', fontSize: 12 }}>{this.state.error}</Text>
                    <Text style={{ color: '#785743', textAlign: 'center', fontSize: 12, marginVertical: 5 }}>Forgot your user name or password?</Text>
                    <Text style={{ color: '#785743', textAlign: 'center', fontSize: 12, marginVertical: 5 }}>Create New Account.</Text>
                </View>
            </Container >
        );
    }
}


const mapStateToProps = state => {
    return {
        loginLocal: state.login
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (params) => dispatch(actionUsers.handleLogin(params))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen); 