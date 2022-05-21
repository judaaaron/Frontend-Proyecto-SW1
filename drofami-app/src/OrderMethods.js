const API_URL = 'https://drofami-app.herokuapp.com/api/orden/'

export async function nuevaOrden(setLoading, token, setResponse) {
    setLoading({value: true, message: 'Procesando Orden...'});
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL, {
            method: 'POST',
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
        console.log('Error en nuevaOrden! ', e);
    } finally {
       setLoading(false)
    }
}

export async function getOrdenes(setLoading, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL, {
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
        console.log('Error en getOrdenes! ', e);
    } finally {
       setLoading(false)
    }
}

export async function getOrdenDetalle(setLoading, token, setResponse, nOrden) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + "details/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
            body: JSON.stringify({
                'nOrden': nOrden,
            })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en getOrdenDetails! ', e);
    } finally {
       setLoading(false)
    }
}
