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

//creating another context for user Information

const UserInfoContext = createContext();

const UserInfo = ({ children }) => {
    const [userInfo, setUserInfo] = useState({ "name": "System" });

    return (
        <UserInfoContext.Provider value={[userInfo, setUserInfo]} >
            {children}
        </UserInfoContext.Provider>
    )
}

const useUser = () => useContext(UserInfoContext);




export { chatHistory, Authorization, useVerify, UserInfo, useUser }



