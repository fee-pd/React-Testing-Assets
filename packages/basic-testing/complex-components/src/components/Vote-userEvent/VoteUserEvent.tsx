import React, { useReducer } from "react";
import thumbsDown from "../../images/thumbs-down.svg";
import thumbsUp from "../../images/thumbs-up.svg";
import './styles.css'

interface IVoteProps {
  totalGlobalLikes: number;
}

type State = {
  totalLikes: number;
  hasVoted: boolean;
  clickedLike: boolean;
  clickedDislike: boolean;
};

type Action = { type: "LIKE" } | { type: "DISLIKE" } | { type: "RESET" };

const VoteUserEvent: React.FC<IVoteProps> = ({ totalGlobalLikes }) => {
  const likeReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "LIKE":
        return {
          ...state,
          totalLikes: state.totalLikes + 1,
          hasVoted: true,
          clickedLike: true,
        };
      case "DISLIKE":
        return {
          ...state,
          totalLikes: state.totalLikes - 1,
          hasVoted: true,
          clickedDislike: true,
        };
      case "RESET":
        return {
          ...state,
          totalLikes: totalGlobalLikes,
          hasVoted: false,
          clickedLike: false,
          clickedDislike: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(likeReducer, {
    totalLikes: totalGlobalLikes,
    hasVoted: false,
    clickedLike: false,
    clickedDislike: false,
  });

  const { totalLikes, hasVoted, clickedLike, clickedDislike } = state;
  const handleLikeVote = () => dispatch({ type: "LIKE" });
  const handleDislikeVote = () => dispatch({ type: "DISLIKE" });
  const handleReset = () => dispatch({ type: 'RESET' });

  return (
    <div className="voting">
      <h5>Note: You are not allowed to change your vote once selected!</h5>
      <button
        onClick={handleLikeVote}
        disabled={hasVoted}
        style={clickedLike ? { background: "green" } : undefined}
      >
        <img src={thumbsUp} alt="thumbs up" />
      </button>
      <div>{totalLikes}</div>
      <button
        onClick={handleDislikeVote}
        disabled={hasVoted}
        style={clickedDislike ? { background: "red" } : undefined}
      >
        <img src={thumbsDown} alt="thumbs down" />
      </button>
      <button onClick={handleReset} className="reset-button">Reset</button>
    </div>
  );
};

export default VoteUserEvent;
