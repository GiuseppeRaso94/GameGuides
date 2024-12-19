import SingleComment from "./SingleComment";

const CommentsArea = ({ comments }) => {
  return (
    <div className="d-flex flex-column">
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsArea;
