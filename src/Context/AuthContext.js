import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"


export const authContext = createContext()

function AuthContext({ children }) {

    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)

    //Handel refresh
    useEffect(function () {
        //componentDId Mount
        const val = localStorage.getItem('tkn');
        if (val != null) {
            setToken(val);
            getUserData();

            // setUserData(jwtDecode(val))
        }

    }, [])


    function getUserData() {

        // const userData = jwtDecode(token);
        const userData = jwtDecode(localStorage.getItem('tkn'));
        console.log('userData', userData);
        setUserData(userData)
    }





    return <authContext.Provider value={{
        token, setToken,
        userData,
        getUserData,
    }} >

        {children}

    </authContext.Provider>
}

export default AuthContext
