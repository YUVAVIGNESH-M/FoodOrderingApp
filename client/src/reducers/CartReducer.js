
export const CartReducer=(state={
    cart:[]
},action)=>{

    console.log(action.type)
    switch(action.type)
    {
        case 'ADD_PRODUCT':
            console.log( [...state.cart,action.payload])
            return {
                cart:[...state.cart,action.payload]
            }
        case 'REMOVE_ALLPRODUCT':
            return {
                cart:[]
            }
    }
}