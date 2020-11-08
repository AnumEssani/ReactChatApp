const reducer = (state, action) => {
    switch (action.type) {
        case "GETLOGEDINUSER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "USERFROMDB":
            return {
                ...state,
                user: action.payload
            }
        case 'NEWUSERLOGIN':
            return {
                ...state,
                user: [...state.user, action.payload]
            }
        default:
            return state;
    }
};

export default reducer;