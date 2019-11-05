import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Content, Container, Fab, Icon, Form, Item, Label, Input, Button, Picker, Body } from 'native-base';
import { connect } from 'react-redux'
import styles from '../style/style';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import Modal from "react-native-modal";

import * as actionOrder from '../../redux/actions/actionOrder'
import * as actionUsers from '../../redux/actions/actionUsers'

class CheckinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            customer: [],
            isModalVisible: false,
            isModalVisibleUpdate: false,
            room: '',
            duration: '',
            choosenLabel: '',
            choosenindex: '',
            checkStatus: true,
            btnState: 'checkIn'
        }
    }
    async componentDidMount() {
        await this.props.getOrder();
        await this.props.getcustomer();
        this.setState({
            dataSource: this.props.orderLocal.order,
            customer: this.props.customerLocal.customer
        })
        this.intervalCheckout();
    }
    reloadTimer = async () => {
        await this.props.updateTimer();
        await this.props.getOrder();
        this.setState({
            dataSource: this.props.orderLocal.order,
            customer: this.props.customerLocal.customer,

        })
    }
    checkingCheckout = () => {
        const now = new Date();
        const dataCheckout = this.state.dataSource;
        const tes = () => {
            this.reloadTimer();
        }
        dataCheckout.forEach(function (item) {
            if (item.dataorder.length > 0) {

                item.dataorder.forEach(function (item2) {
                    //const next = new Date(item2.order_end_time);

                    const next = new Date('2019-11-04 17:55:10');
                    const now2 = new Date('2019-11-04 16:18:00');
                    //console.log('now:' + now + ' | next : ' + next);

                    if ((now.getTime() >= next.getTime()) && (item2.is_booked == 1)) {
                        tes();
                        alert('update otomatis');
                    }
                })
            }
        })
    }
    intervalCheckout = () => {
        const data = this.state.dataSource;
        setInterval(this.checkingCheckout, 5000);
    }

    setRoom = (text) => {
        this.setState({
            room: text
        })
    }
    setDuration = (text) => {
        this.setState({
            duration: text
        })
    }

    buttonState = () => {
        if (this.state.btnState == 'checkIn') {
            return 'Check In';
        } else {
            return 'Check out';
        }
    }

    _diff_minutes(dt2, dt1) {
        if (dt2 < dt1) {
            return 0;
        } else {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
        }
    }
    toggleModalUpdate = (status, itemId, itemName, dataorder = []) => {
        if (dataorder.length != 0) {
            const RoomStatus = dataorder.map(function (item) {
                var status = item.is_booked;
                var statusOrder = "nok";
                if (status == true) {
                    var statusOrder = "ok";
                }
                return statusOrder;
            });
            const index = RoomStatus.indexOf("ok");
            const customerId = dataorder[0].idcustomer;
            const endTime = dataorder[0].order_end_time;

            const d = new Date();
            const next = new Date(endTime);
            const dif = this._diff_minutes(next, d);


            console.log(dif);

            if (index >= 0) {
                //booked
                this.setState({
                    room: itemName,
                    id: itemId,
                    checkStatus: false,
                    duration: dif.toString(),
                    choosenLabel: customerId,
                    btnState: 'checkout'
                })
            } else {
                //free room
                this.setState({
                    room: itemName,
                    id: itemId,
                    checkStatus: true,
                    duration: '0',
                    btnState: 'checkIn'
                })
            }
        } else {
            //free room
            this.setState({
                room: itemName,
                id: itemId,
                checkStatus: true,
                duration: '0',
                btnState: 'checkIn'
            })
        }


        this.setState({ isModalVisibleUpdate: status });
    };

    toggleUpdate = async () => {
        console.log(this.state.btnState);
        if (this.state.btnState == 'checkIn') {
            const data = { idcustomer: this.state.choosenLabel, idroom: this.state.id, duration: this.state.duration, is_booked: true, is_done: false };
            console.log(data);
            await this.props.insertOrder(data);
            await this.props.getOrder();
            this.setState({
                dataSource: this.props.orderLocal.order,
                customer: this.props.customerLocal.customer,
                isModalVisibleUpdate: false
            })
        } else {
            const data = { is_booked: false, is_done: false };
            const idRoom = this.state.id;
            await this.props.UpdateOrder(idRoom, data);
            await this.props.getOrder();
            this.setState({
                dataSource: this.props.orderLocal.order,
                customer: this.props.customerLocal.customer,
                isModalVisibleUpdate: false
            })
        }
    }
    getColor = (item) => {
        const RoomStatus = item.dataorder.map(function (item) {
            var status = item.is_booked;
            var statusOrder = "nok";
            if (status == true) {
                var statusOrder = "ok";
            }
            return statusOrder;
        });

        const index = RoomStatus.indexOf("ok");
        //console.log('index :', index);
        if (index >= 0) {
            return styles.activeRoom;
        } else {
            return styles.deaactiveRoom;
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>

                    <Modal isVisible={this.state.isModalVisibleUpdate}>
                        <Form style={{ backgroundColor: 'white', paddingBottom: 10, paddingTop: 6, borderRadius: 10 }}>
                            <Item><Text style={{ fontSize: 25 }}>Update Room</Text></Item>
                            <Item stackedLabel>
                                <Label>Room Name</Label>
                                <Input value={this.state.room} onChangeText={this.setRoom} editable={false} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Customer</Label>
                                <Picker
                                    enabled={this.state.checkStatus}
                                    selectedValue={this.state.choosenLabel}
                                    style={{ height: 50, width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ choosenLabel: itemValue, choosenindex: itemIndex })
                                    }>
                                    <Picker.Item label="-- Select Customer --" />
                                    {this.state.customer.map((item, index) =>
                                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    )}


                                </Picker>
                            </Item>
                            <Item>
                                <Label>Duration</Label>
                                <Input value={this.state.duration} onChangeText={this.setDuration} editable={this.state.checkStatus} />
                            </Item>
                            <View style={{ flexDirection: 'row' }}>
                                <Button style={{ flex: 1, margin: 10, borderRadius: 10 }} block onPress={() => { this.toggleModalUpdate(false) }} ><Text>Cancel</Text></Button>
                                <Button style={{ flex: 1, margin: 10, borderRadius: 10 }} block onPress={this.toggleUpdate} ><Text>{this.buttonState()}</Text></Button>
                            </View>
                        </Form>
                    </Modal>
                    <FlatGrid
                        itemDimension={130}
                        items={this.state.dataSource}
                        style={styles.gridView}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => { this.toggleModalUpdate(true, item.id, item.name, item.dataorder) }}>
                                <View style={this.getColor(item)}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Content>
            </Container >
        );
    }
}


const mapStateToProps = state => {
    return {
        orderLocal: state.order,
        customerLocal: state.customer
    }

}
const mapDispatchToProps = dispatch => {
    return {
        getOrder: () => dispatch(actionOrder.getOrder()),
        insertOrder: (params) => dispatch(actionOrder.insertOrder(params)),
        UpdateOrder: (params, data) => dispatch(actionOrder.UpdateOrder(params, data)),
        updateTimer: () => dispatch(actionOrder.updateTimer()),
        getcustomer: () => dispatch(actionUsers.getcustomer()),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckinScreen); 