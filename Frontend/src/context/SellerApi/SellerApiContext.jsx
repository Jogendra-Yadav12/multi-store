import React, { createContext, useContext } from 'react'

export const SellerApiContext = createContext()

export const SellerApiContextProvider = ({children}) => {



    // add Seller data and address

    const addSellerAndCustomerAddress = () => {

        

    }


    const value = {
        addSellerAndCustomerAddress,
    }

    return <SellerApiContext.Provider value={value}>{children}</SellerApiContext.Provider>
}

export const useApi = () => useContext(SellerApiContext);
