import "./style.css";

const TeamCard = ({ imageUrl, name, githubUrl }) => {
  return (
    <div className="team-card">
      <a href={githubUrl} alt={name + " Github"} target="_blank" rel="noopener noreferrer">
        <img
          className="profile-image"
          src={imageUrl}
          alt={name + " profile image"}
        />
      </a>
      <div className="member-name">
        {name}
      </div>
    </div>
  );
}

export default TeamCard;
