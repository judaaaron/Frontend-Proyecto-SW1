const API_URL = 'https://drofami-app.herokuapp.com/api/servicio-cliente/'

export async function getSupportUrl(setLoading, token, setResponse) {
    setLoading(true);
    const resp = {};
    let response = {}
    console.log('75', token)
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
                console.log(data)
                setResponse(data)
            })
    } catch (e) {
        console.log('Error en getSupportUrl! ', e);
    } finally {
        setLoading(false)
    }
}