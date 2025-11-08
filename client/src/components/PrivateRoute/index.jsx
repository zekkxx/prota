import { Navigate, Route } from "react-router-dom";

function PrivateRoute({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/welcome", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
