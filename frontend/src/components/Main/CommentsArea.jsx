import SingleComment from "./SingleComment";

const CommentsArea = ({ comments }) => {
  return comments.map((comment) => (
    <SingleComment key={comment._id} comment={comment} />
  ));
};

export default CommentsArea;
