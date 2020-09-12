import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        backgroundColor: '#365478',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#365478',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp('6%'),
    },
    form: {
        flex: 4,
        backgroundColor: '#365478',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingVertical: hp('2.5%'),
        backgroundColor: "white",
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
    },
    label: {
        fontWeight: 'bold',
        color: '#365478',
        fontSize: hp('2.3%'),
        marginBottom: 0,
    },
    input: {
        borderWidth: 1,
        borderBottomColor: 'lightgray',
        borderColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: hp('1.8%'),
        color: '#444',
        height: hp('5%'),
        marginBottom: hp('2%'),
        borderRadius: 2,
    },
    input2: {
        borderWidth: 1,
        borderBottomColor: 'lightgray',
        borderColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: hp('1.8%'),
        color: '#444',
        height: hp('5%'),
        marginBottom: hp('2%'),
        borderRadius: 2,
    },

    button: {
        marginTop: hp('4%'),
        height: hp('6%'),
        backgroundColor: '#365478',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:50,
        flexDirection:'row'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
    },
    img: {
        width: wp('50%'),
        height: hp('25%'),
        marginTop: hp('2%'),
    },
    title: {
        fontWeight: 'bold',
        color: '#365478',
        fontSize: hp('2.5%')
    },
    text: {
        color: 'gray',
        marginTop: hp('0.5%'),
        paddingBottom: hp('2%')
    },
    button2: {
        marginTop: hp('1%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText2: {
        color: '#FFC300',
        fontWeight: 'normal',
        fontSize:  hp('2%'),
    },
    btn: {
        flex: 1,
    }
});