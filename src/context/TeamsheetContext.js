import React, {createContext, useState} from 'react';

// create the context object
export const TeamsheetContext = createContext();

// create a provider component
export const TeamsheetProvider = ({children}) => {
    const [team, setTeam] = useState([]);
    const [panel, setPanel] = useState([]);
    const [subs, setSubs] = useState([]);

    const handleSave = () => {
        // implement your save logic here
    };

    const handleCancel = () => {
        // implement your cancel logic here
    };

    const methods = {
        // add any other methods you want to share here
    };

    return (
        <TeamsheetContext.Provider
            value={{team, setTeam, panel, setPanel, subs, setSubs, handleSave, handleCancel, methods}}
        >
            {children}
        </TeamsheetContext.Provider>
    );
};
