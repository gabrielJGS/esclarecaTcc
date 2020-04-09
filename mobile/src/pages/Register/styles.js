import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#365478',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#bfbfbf',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonCancel: {
        marginTop: 15,
        height: 42,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
});