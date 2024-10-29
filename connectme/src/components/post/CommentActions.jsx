import DeleteIcon from "../../assets/icons/delete.svg";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";

const CommentActions = ({ postId, comment, setComments }) => {
  const { api } = useAxios();
  const { dispatch: postDispatch } = usePost();

  const handleDeleteComment = async () => {
    const response = await api.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postId}/comment/${
        comment._id
      }`
    );
    if (response.status === 200) {
      setComments((prev) => prev.filter((cmt) => cmt._id !== comment._id));
    }
  };

  return (
    <div className="action-modal-container">
      <button
        className="action-menu-item hover:text-red-500"
        onClick={handleDeleteComment}
      >
        <img src={DeleteIcon} alt="Delete" />
        Delete
      </button>
    </div>
  );
};

export default CommentActions;
