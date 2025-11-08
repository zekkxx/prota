import "./style.css";

import API from "../../../utils/API";
import FuzzyList from "./FuzzyList";
import { useState } from "react";

const SearchUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  const handleSelectUser = (user) => {
    props.handleAddUser(user);
    if (!props.users.includes(user)) {
      setUsers([]);
      setUserQuery("");
    }
  };

  const inviteUser = (username) => {
    props.handleInviteUser(username);
    setUsers([]);
    setUserQuery("");
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (value === "") {
      setUsers([]);
      setUserQuery("");
      return;
    }
    if (validateUsername(value)) {
      API.getUsersFuzzy(value).then((users) => {
        setUsers(users);
        setUserQuery(value);
      });
    } else {
      setUsers([]);
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
        placeholder={`Search for ${props.type}`}
        value={userQuery}
        onChange={handleInput} />
      <FuzzyList
        newUser={userQuery}
        users={users}
        handleInviteUser={inviteUser}
        handleSelectUser={handleSelectUser}
      />
    </>
  );
}

export default SearchUsers;
