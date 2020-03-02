
const pageReducer = (state=1,action) =>{
    switch (action.type) {
        case 'INCREMENT':
            return Math.min(80,state+action.payload);
        
        case 'DECREMENT':
            return Math.max(1,state-action.payload);

        default:
            return state;
    }
} 

export default pageReducer;