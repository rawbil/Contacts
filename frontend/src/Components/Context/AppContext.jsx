import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const ProviderFunction = (props) => {
    const url = "https://contacts-backend.vercel.app";


    const [contacts, setContacts] = useState([])
    const [token, setToken] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const isTokenAvailable = localStorage.getItem('token');
        if(isTokenAvailable) {
            setToken(isTokenAvailable);
        }
        else {
            navigate('/auth');
        }
    }, [token, navigate])
    return(
        <AppContext.Provider value={{url, contacts, setContacts, token, setToken}}>
            {props.children}
        </AppContext.Provider>
    )
}

ProviderFunction.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProviderFunction;