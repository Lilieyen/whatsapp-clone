// initialState is how the datalayer looks like before we add anything to it/ make any changes
// we're starting with user not logged in
export const initialState = {
    user: null,
};

// this is where we can push information into the datalayer
export const actionTypes = {
    SET_USER: "SET_USER",
};

// after an action has been dispatched to the data layer we listen in on it
// if we dispatch SET_USER action, whatever is returned is what we intended tom change in the datalayer
// we maintain the state as it was but we change the user to what we've pushed to the data layer
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

            default:
                return state;
    }
};

export default reducer