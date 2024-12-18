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
    <Audio
      height="20"
      width="20"
      radius="9"
      color="rgb(11, 243, 241)"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
      className="pb-3"
    />
  );
};

export default SingleComment;
