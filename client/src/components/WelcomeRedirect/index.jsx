import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/welcome", {replace: true})
    }, []);

    return <div>Redirecting to splash page...</div>;
}

export default WelcomeRedirect;