import { useState, useEffect, useContext, createContext } from 'react';
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: null})
    useEffect(() => {
        console.log("AuthProvider Called");
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


//--------------------
const useAuth = () => {
    console.log("useAuth Called");
    return useContext(AuthContext)
};

export { useAuth, AuthProvider };