import { useVerify } from "../../config/globalVariables.js";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [isVerified, setIsVerified] = useVerify();
    return isVerified ? <h2>Dashboard</h2> : <Navigate to="/login" />;
}

export default Dashboard;