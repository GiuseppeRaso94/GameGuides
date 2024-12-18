import { Audio } from "react-loader-spinner";

const SingleComment = ({ comment }) => {
  return !!comment?._id ? (
    <div className="ps-3 d-flex flex-column">
      <span>{comment.user.userName}</span>
      <span className="divider pb-3">{comment.text}</span>
      {comment.comments.map((c) => (
        <SingleComment key={c._id} comment={c} />
      ))}
    </div>
  ) : (
    <div className="w-100 d-flex p-3 justify-content-center align-content-center p-3">
      <Audio
        height="20"
        width="20"
        radius="9"
        color="rgb(11, 243, 241)"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default SingleComment;
