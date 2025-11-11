import "./style.css";

import API from "../../../utils/API";
import FuzzyList from "./FuzzyList";
import { useState } from "react";

// interface SearchUsersProps {
//   type: String;
//   users: User[];
//   handleAddUser: (user: User) => void;
//   handleInviteUser: (username: String) => void;
// }

const SearchUsers = ({ type, users, handleAddUser, handleInviteUser }) => {
  const [localUsers, setLocalUsers] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  const handleSelectUser = (user) => {
    handleAddUser(user);
    if (!users.includes(user)) {
      setLocalUsers([]);
      setUserQuery("");
    }
  };

  const inviteUser = (username) => {
    handleInviteUser(username);
    setLocalUsers([]);
    setUserQuery("");
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (value === "") {
      setLocalUsers([]);
      setUserQuery("");
      return;
    }
    if (validateUsername(value)) {
      API.getUsersFuzzy(value).then((tempUsers) => {
        setLocalUsers(tempUsers);
        setUserQuery(value);
      });
    } else {
      setLocalUsers([]);
      setUserQuery(userQuery);
    }
  };


  const validateUsername = (input) => {
    if(input.startsWith("-") || input.match(/[^a-zA-Z0-9-]/)) return false;
    else return true;
  };

  return (
    <>
      <input
        // className="search-contributors-input"
        placeholder={`Search for ${type}`}
        value={userQuery}
        onChange={handleInput} />
      <FuzzyList
        newUser={userQuery}
        users={localUsers}
        handleInviteUser={inviteUser}
        handleSelectUser={handleSelectUser}
      />
    </>
  );
}

export default SearchUsers;
