const API_URL = "https://drofami-app.herokuapp.com/api/";

export async function getRecomendacion(setLoading, token, setResponse) {
  setLoading(true);
  const resp = {};
  let response = {};
  try {
    response = await fetch(API_URL + "recomendacion/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resp["data"] = data;
        setResponse(data);
      });
  } catch (e) {
    console.log("Error en getRecomendacion! ", e);
  } finally {
    setLoading(false);
  }
}
