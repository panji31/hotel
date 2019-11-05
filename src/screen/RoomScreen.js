import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Content, Container, Fab, Icon, Form, Item, Label, Input, Button, Header, Left, Body, Title, Right } from 'native-base';
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid';
import Modal from "react-native-modal";

import styles from '../style/style';
import * as actionUsers from '../../redux/actions/actionUsers'

class RoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isModalVisible: false,
            isModalVisibleUpdate: false,
            room: '',
            id: 0
        }
    }
    async componentDidMount() {
        await this.props.getRoom();
        this.setState({
            dataSource: this.props.roomLocal.room
        })
    }
    setRoom = (text) => {
        this.setState({
            room: text
        })
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModalUpdate = (status, itemId, itemName) => {
        this.setState({
            room: itemName,
            id: itemId
        })
        this.setState({ isModalVisibleUpdate: status });
    };
    toggleSave = async () => {
        const data = { name: this.state.room };
        await this.props.insertRoom(data);
        await this.props.getRoom();
        this.setState({
            dataSource: this.props.roomLocal.room
        })
        this.setState({ isModalVisible: false });
    }
    toggleUpdate = async () => {
        const data = { name: this.state.room };
        const id = this.state.id;
        await this.props.updateRoom(id, data);
        await this.props.getRoom();
        this.setState({
            dataSource: this.props.roomLocal.room
        })
        this.setState({ isModalVisibleUpdate: false });
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Icon type="FontAwesome" name="th-large" style={{ color: 'grey' }} />
                    </Left>
                    <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <Title style={{ color: 'grey' }}>ROOM</Title>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#6e8129' }}>
                    <FlatGrid
                        itemDimension={120}
                        items={this.state.dataSource}
                        style={styles.gridView}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => { this.toggleModalUpdate(true, item.id, item.name) }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    padding: 10,
                                    height: 150,
                                    borderWidth: 3,
                                    backgroundColor: '#f5f5f5',
                                    borderColor: 'grey',
                                }}>

                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
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
                <Modal isVisible={this.state.isModalVisible}>
                    <Form style={{ backgroundColor: 'white', paddingBottom: 10, paddingTop: 6, borderRadius: 10 }}>
                        <Item><Text style={{ fontSize: 20 }}>Add Room</Text></Item>
                        <Item stackedLabel>
                            <Label>Room Name</Label>
                            <Input onChangeText={this.setRoom} />
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleModal} ><Text style={{ color: 'white' }}>Cancel</Text></Button>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleSave} ><Text style={{ color: 'white' }}>Save</Text></Button>
                        </View>
                    </Form>
                </Modal>
                <Modal isVisible={this.state.isModalVisibleUpdate}>
                    <Form style={{ backgroundColor: 'white', paddingBottom: 10, paddingTop: 6, borderRadius: 10 }}>
                        <Item><Text style={{ fontSize: 20 }}>Edit Room</Text></Item>
                        <Item stackedLabel>
                            <Label style={{ fontSize: 15 }}>Room Name</Label>
                            <Input value={this.state.room} onChangeText={this.setRoom} />
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={() => { this.toggleModalUpdate(false) }} ><Text style={{ color: 'white' }}>Cancel</Text></Button>
                            <Button style={{ flex: 1, margin: 10, borderRadius: 20, backgroundColor: '#f06d63' }} block onPress={this.toggleUpdate} ><Text style={{ color: 'white' }}>Update</Text></Button>
                        </View>
                    </Form>
                </Modal>
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        roomLocal: state.room,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRoom: () => dispatch(actionUsers.getRoom()),
        insertRoom: (params) => dispatch(actionUsers.insertRoom(params)),
        updateRoom: (params, body) => dispatch(actionUsers.updateRoom(params, body))

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomScreen); 