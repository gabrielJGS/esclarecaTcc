import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

class UserPermission {
    getCameraPermission = async () => {
        if(Constants.platform.ios || Constants.platform.android){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted"){
                alert("Precisamos da permissão para continuar");
            }
        }
    }
}

export default new UserPermission();