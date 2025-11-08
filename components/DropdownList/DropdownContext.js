import { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    return (
        <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useDropdown = () => useContext(DropdownContext);