import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    header:{
        backgroundColor: "#365478",
        height:150,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        paddingHorizontal:32,
        borderBottomWidth:5,
        borderBottomColor:'#D8D9DB',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:30,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:24,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#365478",
        marginTop:1
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#365478",
      },
      detailsButton:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:17
      },
      container:{
        flex:1
      }
})