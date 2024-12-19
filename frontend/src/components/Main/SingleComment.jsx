import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Audio } from "react-loader-spinner";

function OptionsDropDown({ setEditUserModalShow }) {
  const start = "start";
  return (
    <DropdownButton drop={start}>
      <Dropdown.Item eventKey="1">Reply</Dropdown.Item>
      <Dropdown.Item eventKey="2">Modify Comment</Dropdown.Item>
      <Dropdown.Item eventKey="3">Delete Comment</Dropdown.Item>
    </DropdownButton>
  );
}

const SingleComment = ({ comment }) => {
  return !!comment?._id ? (
    <div className="ps-3 d-flex flex-column">
      <div className="d-flex align-items-center divider">
        <div className="d-flex flex-grow-1 flex-column">
          <span>{comment.user.userName}</span>
          <span className="pb-3">{comment.text}</span>
        </div>
        <OptionsDropDown />
      </div>
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
