import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const navigate = useNavigate()

    const value = [
        navigate,
    ]
      return(
        <AppContextProvider value={value}>
            {props.children}
        </AppContextProvider>
      )
}