import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageLogo: {
        width: 175,
        height: 150,
        marginBottom: 10,
        resizeMode: 'contain',
        marginTop: '15%'
    },
    itemName: {
        color: '#6e8129',
        borderBottomWidth: 1,
        borderColor: '#6e8129',
        borderRadius: 10,
        padding: 10
    },
    gridView: {
        marginTop: 10,
        flex: 1,

    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: 'red'
    },
    activeRoom: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        height: 150,
        borderWidth: 3,
        backgroundColor: '#f5f5f5',
        borderColor: '#f06d63',
    },
    deaactiveRoom: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        height: 150,
        borderWidth: 3,
        backgroundColor: '#f5f5f5',
        borderColor: 'grey',
    },
    allRoom: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: 'grey'
    },
    password: {
        width: '15%',
        color: '#785743'
    },
    fieldPassword: {
        width: '85%',
        color: '#785743'
    },
    emailFied: {
        color: '#785743'
    },
    buttonRegiser: {
        margin: 5,
        backgroundColor: '#ffa21f',
        borderColor: '#fc990d'
    },
    head: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'rgb(34,193,195)'
    },
    textRegister: {
        color: 'white'
    },
    image: {
        width: 120,
        height: 130,
        marginBottom: 10
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    login: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 2,
        color: 'white'
    },
    error_label: {
        fontSize: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 10,
        color: 'white',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
});