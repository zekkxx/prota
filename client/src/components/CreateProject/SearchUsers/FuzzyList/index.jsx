import "./style.css";

// interface FuzzyListProps {
//   users: User[];
//   handleSelectUser: (user: User) => void;
//   handleInviteUser: (username: String) => void;
//   newUser: String;
// }

const FuzzyList = ({
  users,
  handleSelectUser,
  handleInviteUser,
  newUser
}) => {
  //results.push("Add ", query);

  //if the selected user matches a user in the added list return true
  let inputMatchesListItem = () => {
    for (let user in users) {
      if (newUser === user.username) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="fuzzy-list-container">
      {users && users.length > 0 && [users].map((user, i) => {
        return (
          <div
            className="fuzzy-user"
            key={i}
            onClick={() => {
              handleSelectUser(user);
            }}
          >
            {user.username}
          </div>
        );
      })}
      {newUser !== "" && !inputMatchesListItem() && (
        <div
          className="fuzzy-invite"
          onClick={() => {
            handleInviteUser(newUser);
          }}
        >
          Invite: {newUser}
        </div>
      )}
    </div>
  );
}

export default FuzzyList;
