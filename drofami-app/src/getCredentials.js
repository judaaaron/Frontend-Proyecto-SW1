import * as SecureStore from 'expo-secure-store';
export default async function getCredentials() {
    try {
        const session = await SecureStore.getItemAsync("user_session");
    } catch (error) {
        
        if(error !== "null is not an object (evaluating 'JSON.parse(session)[\"token\"]')"){
            alert("Hubo un error en la lectura de las credenciales.");
            console.log(error);
        }
        return (-1);
    } finally {
        return JSON.parse(session)['token']
    }
}