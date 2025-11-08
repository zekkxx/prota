import './assets/css/style.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from 'react';

import API from "./utils/API";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import WelcomeRedirect from './components/WelcomeRedirect';
import smoothscroll from 'smoothscroll-polyfill';

// smoothscroll polyfill is an NPM package that brings smoothscroll functionality to
// browsers like Safari, Edge, and IE. 

smoothscroll.polyfill();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (isLoggedIn ? <Profile /> : <WelcomeRedirect />)
    },
    {
      path: "/project/:id",
      element: (isLoggedIn ? <Project /> : <WelcomeRedirect />)
    },
    {
      path: "/welcome",
      element: <Landing />
    }
  ]);

  const getLoginStatus = () => {
    API.isLoggedIn()
      .then(status => {
        return setIsLoggedIn(status);
      })
      .catch(err => console.log(err)); // todo: improve error handling
  };

  useEffect(() => {
    getLoginStatus()
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
