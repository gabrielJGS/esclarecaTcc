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
        width: wp('90%'),
        height: hp('42%'),
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
        marginTop: hp('1%'),
        justifyContent:'space-between',
        flexDirection:'row',
    },
    Register: {
        height: hp('6%'),
        width:wp('30%'),
        backgroundColor: '#365478',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:20,
        top:2
    },
    Google: {
        height: hp('5%'),
        width:wp('44%'),
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:20,
        paddingHorizontal:8,
    },
    Facebook: {
        height: hp('5%'),
        width:wp('44%'),
        backgroundColor: '#445c94',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:20,
        paddingHorizontal:8,
        top:2
    },
    Inicie:{
        color:'white',
        fontWeight:'bold',
        fontSize:hp('2.5%')
    },
    GoogleF:{
        color:'black',
        fontWeight:'bold',
        fontSize:hp('2%')
    },
    FacebookF:{
        color:'white',
        fontWeight:'bold',
        fontSize:hp('2%')
    }
})