import React, { createContext, useContext, useReducer } from "react";

// preparing the datalayer
// the datalayer lives in the context that's created
export const StateContext = createContext();

// the datalayer is actually that StateProvider
// the ({ reducer, initialState, children }) is a higher order component
export const StateProvider
 = ({ reducer, initialState, children }) => (
     // this allows us to set up the data layer
     <StateContext.Provider value={useReducer(reducer, initialState)}>
         {children}
     </StateContext.Provider>
 );

 // this allows us to pull information from the datalayer
 export const useStateValue = () => useContext(StateContext)