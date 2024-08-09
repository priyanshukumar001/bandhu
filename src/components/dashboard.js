import { useVerify, useUser } from "../../config/globalVariables.js";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [isVerified, setIsVerified] = useVerify();
    const [userInfo, setUserInfo] = useUser();

    return (!isVerified) ? <Navigate to="/login" /> :
        (
            <h2 className="main_heading">Welcome {userInfo?.name}! </h2>
        );
}

export default Dashboard;