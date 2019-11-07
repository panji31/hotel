import React from 'react';
import { Text, View, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { Content, Container, Fab, Icon, Form, Item, Label, Input, Button, List, ListItem, Left, Right, Thumbnail, Body, Header, Title } from 'native-base';
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid';
import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";

import styles from '../style/style';


import * as actionUsers from '../../redux/actions/actionUsers'
import * as actionCustomer from '../../redux/actions/actionCustomer'

class CustomerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isModalVisibleUpdate: false,
            id: '',
            name: '',
            idcard: '',
            phone: '',
            image: {}
        };
    }

    setName = (text) => {
        this.setState({
            name: text
        })
    }
    setIdentity = (text) => {
        this.setState({
            idcard: text
        })
    }
    setNumber = (text) => {
        this.setState({
            phone: text
        })
    }

    toggleSave = async () => {
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('idcard', this.state.idcard);
        data.append('phone_number', this.state.phone);
        data.append('fileData', this.state.image);
        await this.props.insertCustomer(data);
        await this.props.getcustomer();
        this.setState({ isModalVisible: false });
    }
    toggleUpdate = async () => {
        const id = this.state.id;
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('idcard', this.state.idcard);
        data.append('phone_number', this.state.phone);
        data.append('fileData', this.state.image);
        await this.props.updateCustomer(id, data);
        await this.props.getcustomer();
        this.setState({ isModalVisibleUpdate: false });
    }
    componentDidMount() {
        this.props.getcustomer();
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModalUpdate = (status, itemId, nameCust, idcardCust, phoneCust) => {
        this.setState({
            id: itemId,
            name: nameCust,
            idcard: idcardCust,
            phone: phoneCust
        })

        this.setState({ isModalVisibleUpdate: status });
    };
    onPress = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('User selected a file form camera or gallery', response);
                this.setState({
                    image: {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName
                    }
                })

            }
        })
    }
    render() {
        const datates = this.props.customerLocal.customer;
        return (
            <Container style={{ backgroundColor: '#f5f5f5' }}>
                <Modal isVisible={this.state.isModalVisible}>
                    <Form style={{ backgroundColor: 'white', paddingBottom: 10, paddingTop: 6, borderRadius: 10 }}>
                        <Item><Text style={{ fontSize: 20 }}>ADD Customer</Text></Item>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input onChangeText={this.setName} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Identity Number</Label>
                            <Input onChangeText={this.setIdentity} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Phone Number</Label>
                            <Input onChangeText={this.setNumber} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Photo</Label>
                            <TouchableOpacity onPress={this.onPress}>
                                <Text> Upload Here </Text>
                            </TouchableOpacity>
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleModal} ><Text>Cancel</Text></Button>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleSave} ><Text>Save</Text></Button>
                        </View>
                    </Form>
                </Modal>
                <Modal isVisible={this.state.isModalVisibleUpdate}>
                    <Form style={{ backgroundColor: 'white', paddingBottom: 10, paddingTop: 6, borderRadius: 10 }}>
                        <Item><Text style={{ fontSize: 20 }}>Edit Customer</Text></Item>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input value={this.state.name} onChangeText={this.setName} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Identity Number</Label>
                            <Input value={this.state.idcard} onChangeText={this.setIdentity} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Phone Number</Label>
                            <Input value={this.state.phone} onChangeText={this.setNumber} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Photo</Label>
                            <TouchableOpacity onPress={this.onPress}>
                                <Text> Upload Here </Text>
                            </TouchableOpacity>

                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={() => { this.toggleModalUpdate(false) }} ><Text>Cancel</Text></Button>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleUpdate} ><Text>Update</Text></Button>
                        </View>
                    </Form>
                </Modal>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Icon type="FontAwesome" name="group" style={{ color: 'grey' }} />
                    </Left>
                    <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <Title style={{ color: 'grey' }}>CUSTOMER</Title>
                    </Body>
                </Header>
                <Content>
                    <FlatList data={datates} renderItem={({ item }) => (
                        <List style={{ backgroundColor: '#f5f5f5' }}>
                            <ListItem style={{ backgroundColor: '#f5f5f5' }} onPress={() => { this.toggleModalUpdate(true, item.id.toString(), item.name.toString(), item.idcard.toString(), item.phone_number.toString()) }} avatar>
                                <Left>
                                    <Thumbnail source={{ uri: 'http://192.168.0.66:5000/static/' + item.image }} />
                                </Left>
                                <Body>
                                    <Text>Full Name : {item.name}</Text>
                                    <Text style={{ color: 'grey' }}>Identity Number : {item.idcard}</Text>
                                    <Text style={{ color: 'grey' }}>Phone Number : {item.phone_number}</Text>
                                </Body>
                                <Right>
                                    <Text note></Text>
                                </Right>
                            </ListItem>

                        </List>
                    )} />
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#f06d63', borderWidth: 6, borderColor: 'grey' }}
                    position="bottomRight"
                    onPress={this.toggleModal}>
                    <Icon name="add" />
                </Fab>
            </Container >

        );
    }
}


const mapStateToProps = state => {
    return {
        customerLocal: state.customer,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        getcustomer: () => dispatch(actionUsers.getcustomer()),
        insertCustomer: (params) => dispatch(actionCustomer.insertCustomer(params)),
        updateCustomer: (params, data) => dispatch(actionCustomer.updateCustomer(params, data)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen); 