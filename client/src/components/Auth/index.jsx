import "./style.css";

const Auth = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="auth-container">
      <a
        href={
          process.env.NODE_ENV === "production"
            ? "https://prota.onrender.com/auth/github"
            : "http://localhost:3001/auth/github"
        }
      >
        <div className="github-button">Sign in with Github</div>
      </a>
    </div>
  );
};

export default Auth;
