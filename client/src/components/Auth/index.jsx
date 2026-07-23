import "./style.css";

import path from "path";

const Auth = () => {
  console.log("process.env.NODE_ENV", process.env.AXIOS_BASE_URL);
  const authPath = process.env.NODE_ENV === "production" ? path.join(process.env.AXIOS_BASE_URL, "./auth/github") : "http://localhost:3001/auth/github";
  return (
    <div className="auth-container">
      <a href={authPath} rel="noopener noreferrer">
        <div className="github-button">Sign in with Github</div>
      </a>
    </div>
  );
};

export default Auth;
