const API_URL = 'https://drofami-app.herokuapp.com/api/carrito/'

export async function getCart(setLoading, token, setResponse) {
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
        console.log('Error en getCart! ', e);
    } finally {
       setLoading(false)
    }
}

export async function saveCart(token, producto, cantidad, setResponse) {
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
              body: JSON.stringify({
                  'producto': producto, 
                  'cantidad': cantidad
              })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en saveCart! ', e);
    } finally {
        //console.log(resp);
    }
}


export async function clearCarrito(setLoading, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + "/empty/", {
            method: 'DELETE',
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
        console.log('Error en delete carrito! ', e);
    } finally {
       setLoading(false)
    }
}

export async function deleteProduct(setLoading, token, producto, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
              body: JSON.stringify({
                  'producto': producto
              })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en deleteProduct! ', e);
    } finally {
       setLoading(false)
    }
}

export async function isItemInCart(setLoading, producto, token, setIsInCart) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch("https://drofami-app.herokuapp.com/api/carrito/checkItem/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
              body: JSON.stringify({
                  'producto': producto
              })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setLoading(false)
            console.log("Hola Endpoint", data)
            console.log('producto', producto)
            data['status'] == 200 ? setIsInCart(true) : setIsInCart(false)
        })
    } catch (e){
        console.log('Error en isItemInCart! ', e);
        setIsInCart(false);
        setLoading(false)
    } 
}