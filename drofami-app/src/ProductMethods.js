const API_URL = 'https://drofami-app.herokuapp.com/api/products/'

export async function getCatalog(setLoading, token, fabricante,setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'list/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
            body: JSON.stringify({
                'fabricante': fabricante,
            })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en getCatalog! ', e);
    } finally {
        console.log(resp['data'])
       setLoading(false)
    }
}   

export async function getProduct(setLoading, token, id, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    try {
        response = await fetch(API_URL + 'details/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
              },
            body: JSON.stringify({
                'producto': id,
            })
        }).then((response) => response.json())
        .then(data => {
            resp['data'] = data;
            setResponse(data)
        })
    } catch (e){
        console.log('Error en getProduct! ', e);
    } finally {
        console.log(resp['data'])
       setLoading(false)
    }
}