import { AuthProvider } from "../AuthContext";
import { AppContextProvider } from "../AppContext";
import { AddressApiProvider } from "../address/AddressApiContaxt";



export const Provider = ({ children }) => {
    return (
        <AuthProvider>
            <AppContextProvider>
                <AddressApiProvider>
                   
                        {children}
                  
                </AddressApiProvider>
            </AppContextProvider>
        </AuthProvider>
    );
};