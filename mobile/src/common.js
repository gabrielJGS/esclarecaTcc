import { Alert } from 'react-native'

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um problema', err.response.data)
    }
    else {
        Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
    }
}

function showSucess(msg) {
    Alert.alert('Sucesso', msg)
}

function handleDate(data) {
    var day = new Date(data);
    var today = new Date();
    var d = new String(data);
    let text = new String();

    var horas = Math.abs(day - today) / 36e5;
    var horasArrend = Math.round(horas)

    if (horasArrend > 24) {
        text = "" + d.substring(8, 10) + "/" + d.substring(5, 7) + "/" + d.substring(0, 4)
    }
    else if (horasArrend < 1) {
        text = "Há menos de 1 hora"
    }
    else {
        text = "Há " + horasArrend + " horas atrás"
    }

    return text
}

function handleLimitBigText(t, size = 280) {
    var texto = new String(t);
    var tam = new Number(texto.length)
    let text = new String();

    if (tam > size) {
        text = texto.substring(0, size) + "..."
    }
    else {
        text = texto
    }

    return text
}

export { showError, showSucess, handleDate, handleLimitBigText }