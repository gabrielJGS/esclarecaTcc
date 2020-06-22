import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Switch,AsyncStorage,Alert,Linking } from 'react-native';
import {Camera} from 'expo-camera';
import { Feather, Ionicons,FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import styles from './styles'


export default function Preferences (){
    const [cameraEnable, setCameraEnabled] = useState(false);
    const navigation = useNavigation()
    var year = new Date().getFullYear()

    async function loadCam(){
        const { status } = await Camera.requestPermissionsAsync();
        
        if(status!=='granted'){
            Alert.alert('Ops...', 'Precisamos de sua localização para obter o local atual');
            return
        }
        setCameraEnabled(previousState => !previousState);
    }

    const loadFacebook = () => {
        Linking.openURL("https://www.facebook.com/esclareca.app.50").catch(err => console.error("Couldn't load page", err));
    };
    const loadInstagram = () => {
        Linking.openURL("https://www.instagram.com/appesclareca/").catch(err => console.error("Couldn't load page", err));
    };
    const loadTwitter = () => {
        Linking.openURL("https://twitter.com/esclarecaapp").catch(err => console.error("Couldn't load page", err));
    };
    const loadGithub = () => {
        Linking.openURL("https://github.com/EsclarecaApp/esclarecaTcc.git").catch(err => console.error("Couldn't load page", err));
    };
    const loadWhatsapp = () => {
        Linking.openURL("whatsapp://send?phone=5524999562378&text=Olá, Equipe Esclareça!").catch(err => console.error("Couldn't load page", err));
    };

    function handleComposeMail(){
        MailComposer.composeAsync({
            subject:'Contato Equipe Esclareça',
            recipients: ['appesclareca@gmail.com'],
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Preferências</Text>
                    <Feather name="sliders" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>

            <View style={{marginHorizontal:32,top:50,flex:1}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingBottom:5, borderBottomWidth:1, borderBottomColor:'#D8D8D8'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="alert-octagon" size={24} color="#CAA859"/>
                        <Text style={{fontSize:18, paddingLeft:10, color:'#8C8C8C'}}>Permissões</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#D8D9DB", true: "#7DCEA0" }}
                        thumbColor={cameraEnable ? "#7DCEA0" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={loadCam}
                        value={cameraEnable}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingBottom:5, borderBottomWidth:1, borderBottomColor:'#D8D8D8', top:23}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="file-text" size={24} color="#356F7B"/>
                        <Text style={{fontSize:18, paddingLeft:10, color:'#8C8C8C'}}>Termos de uso</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="external-link" size={24} color="#718FB0"/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingBottom:5, borderBottomWidth:1, borderBottomColor:'#D8D8D8', top:45}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="shield" size={24} color="#6B5AC0"/>
                        <Text style={{fontSize:18, paddingLeft:10, color:'#8C8C8C'}}>Políticas de privacidade</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="external-link" size={24} color="#718FB0"/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingBottom:5, borderBottomWidth:1, borderBottomColor:'#D8D8D8', top:67}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="book-open" size={24} color="#5CBA58"/>
                        <Text style={{fontSize:18, paddingLeft:10, color:'#8C8C8C'}}>Manual do usuário</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="external-link" size={24} color="#718FB0"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1, alignItems:'center', paddingTop:20}}>
                <View>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>FIQUE LIGADO EM NOSSAS REDES</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:30, paddingVertical:20}}>
                        <TouchableOpacity onPress={handleComposeMail}>
                            <Feather name="mail" size={30} color="#D44638"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loadFacebook}>
                            <Feather name="facebook" size={30} color="#39569c"/>    
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loadInstagram}>
                            <Feather name="instagram" size={30} color="#831d1c"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingVertical:10}}>
                        <TouchableOpacity onPress={loadTwitter}>
                            <Feather name="twitter" size={30} color="#00acee"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loadGithub}>
                            <Feather name="github" size={30} color="#171515"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loadWhatsapp}>
                            <FontAwesome name="whatsapp" size={30} color="#25d366"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{bottom: 0,position: 'absolute',width: '100%', alignItems:"center", backgroundColor:'#365478', paddingVertical:8}}>
                    <Text style={{color:'#D8D9DB'}}>Equipe Esclareça{'\u2122'}, {year}</Text>
                    <Text style={{color:'#D8D9DB', top:3}}>Copyright {'\u00A9'} {year} Brazil. All rights reserved</Text>
                </View>
            </View>
        </View>
    )
}