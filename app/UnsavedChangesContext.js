import { createContext, useContext, useState } from "react";

const UnsavedChangesContext = createContext();

export const UnsavedChangesProvider = ({ children }) => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    return (
        <UnsavedChangesContext.Provider value={{ hasUnsavedChanges, setHasUnsavedChanges }}>
            {children}
        </UnsavedChangesContext.Provider>
    );
};

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
