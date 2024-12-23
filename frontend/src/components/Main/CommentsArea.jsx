import useSession from "../../hooks/useSession";
import SingleComment from "./SingleComment";

const CommentsArea = ({ comments }) => {
  const session = useSession();
  return (
    <div className="d-flex flex-column">
      <span className="bolder divider w-100 text-center pb-3">Comments</span>
      {session ? (
        <form className="barToRight my-3 w-100 d-flex align-items-center">
          <input
            type="text"
            placeholder="Add a comment"
            className="border border-0 w-100"
          />
          <button type="submit" className="border border-0">
            <img src="/add.svg" alt="" />
          </button>
        </form>
      ) : (
        <></>
      )}
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsArea;
