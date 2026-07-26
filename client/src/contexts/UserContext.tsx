import React, { createContext } from "react";

export interface User {
    username: string;
    avatar_url: string;
    display_name: string;
    email?: string;
}

interface UserContextType {
    user?: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {
    throw new Error("Not yet implemented");
  },
});

export default UserContext;
