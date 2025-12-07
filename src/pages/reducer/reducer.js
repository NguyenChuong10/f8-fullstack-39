

const initState = {
    count : 0 
} ;

function reducer(state = initState , action ) {
    switch(action.type){
       case "increase" : {
        return{
            ...state,
            count : state.count + 1 ,
        }
       }
       case "decrease" : {
        return {
            ...state,
            count : state.count - 1,
        }
       }
        default: 
            return state;
    }
}

export default reducer;