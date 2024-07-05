import { createContext, useContext, useState } from "react";

//create context
const VerifyContext = createContext();
//create a provider component
const Authorization = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    return (
        <VerifyContext.Provider value={[isVerified, setIsVerified]}>
            {children}
        </VerifyContext.Provider>
    )
};

//custom hook to use the GlobalContext
const useVerify = () => useContext(VerifyContext);

const chatHistory = [];

export { chatHistory, Authorization, useVerify }



