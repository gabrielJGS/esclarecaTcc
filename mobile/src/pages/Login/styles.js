import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#365478',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        backgroundColor: '#365478',
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:50,
    },
    form: {
        flex:3,
        backgroundColor: '#365478',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingVertical:20,
        backgroundColor:"white",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    label: {
        fontWeight: 'bold',
        color: '#365478',
        fontSize:18,
        marginBottom: 0,
    },
    input: {
        borderWidth: 1,
        borderBottomColor:'lightgray',
        borderColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 2,
    },
    input2: {
        borderWidth: 1,
        borderBottomColor:'lightgray',
        borderColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 2,
    },

    button: {
        marginTop:15,
        height: 45,
        backgroundColor: '#289cff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
   },
   img:{
    width:200,
    height:100,
    marginTop:50,
    marginLeft:20
   },
   title: {
    fontWeight: 'bold',
    color: '#365478',
    fontSize:30
    },
   text:{
    color:'gray',
    marginTop:5,
    paddingBottom:5
   },
   button2: {
       marginTop:10,
    height: 45,
    backgroundColor: 'white',
    borderColor:'#289cff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:1
    },
    buttonText2: {
        color: '#289cff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    btn:{
        flex:1,
    }
});