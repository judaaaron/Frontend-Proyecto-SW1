const API_URL = 'https://drofami-app.herokuapp.com/api/'

export async function getEmpresa(setLoading, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'enterprise/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en getEmpresa! ', e);
    } finally {
       setLoading(false)
    }
}

export async function setEmpresa(setLoading, token, idEmpresa, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'enterprise/register/', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
              body: JSON.stringify({
                  'id': idEmpresa
              })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en putEmpresa! ', e);
    } finally {
       setLoading(false)
    }
}

export async function crearEmpresa(setLoading, token, name, rtn, address, channel, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    console.log(channel)
    try {

        response = await fetch(API_URL + 'enterprise/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
              body: JSON.stringify({
                "name": name,
                "rtn": rtn,
                "address": address,
                "channel": channel
              })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en crearEmpresa! ', e);
    } finally {
       setLoading(false)
    }
}