export const initialState = {
    user : null,
}
export const actionTypes ={
    //define all actions here
    SET_USER :"SET_USER"
}

const reducer = (state, action)=>{
    console.log(action)

    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user : action.user
            }
            default:
                return state;
    }
}
export default reducer
