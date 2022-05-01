//set el valor inicial del token
const tokenReducer = (state=0, action)=>{
    switch(action.type){
        case "TOKEN":
            console.log("hOLAAAAA ", action.payload);
            return action.payload;
        default:
            console.log("ADIOOOOS");
            return 3;
    }
}
export default tokenReducer;