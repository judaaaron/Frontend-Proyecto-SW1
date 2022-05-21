const API_URL = 'https://drofami-app.herokuapp.com/api/orden/'

export async function nuevaOrden(setLoading, token, setResponse) {
    setLoading(true);
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
