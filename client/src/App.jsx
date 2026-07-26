import './assets/css/style.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from 'react';

import API from "./utils/API";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import UserContext from './contexts/UserContext';
import WelcomeRedirect from './components/WelcomeRedirect';
import smoothscroll from 'smoothscroll-polyfill';

// smoothscroll polyfill is an NPM package that brings smoothscroll functionality to
// browsers like Safari, Edge, and IE. 
smoothscroll.polyfill();

function App() {
  const [user, setUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (user ? <Profile /> : <WelcomeRedirect />)
    },
    {
      path: "/project/:id",
      element: (user ? <Project /> : <WelcomeRedirect />)
    },
    {
      path: "/welcome",
      element: <Landing />
    }
  ]);

  useEffect(() => {
      (async () => {
        if (!user) {
          let tempUser = await API.getUser()
          if (!tempUser) {
            return;
          }
          setUser(tempUser);
          setUserLoading(false);
        }
      })();
    }, [user]);

  const userContext = { user: user, setUser: setUser };

  return (
    userLoading ? <div>Loading...</div> : (
      <UserContext.Provider value={userContext}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    )
  );
}

export default App;
