import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#365478'
    },
    Header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    Footer:{
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30,
    },
    Logotype:{
        width: wp('50%'),
        height: hp('10%'),
    },
    Title:{
        color: '#365478',
        fontWeight:'bold',
        fontSize: hp('4%')
    },
    Texto:{
        color:'gray',
        marginTop:3,
    },
    Button:{
        alignItems:'flex-end',
        marginTop: hp('5%'),
    },
    Register: {
        height: hp('6%'),
        width:wp('30%'),
        backgroundColor: '#365478',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:50,
    },
    Inicie:{
        color:'white',
        fontWeight:'bold',
        fontSize:hp('2.5%')
    }
})