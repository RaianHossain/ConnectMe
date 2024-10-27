import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import {usePost} from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";

const CommentActions = ({postId, comment, setComments}) => {
	const {api} = useAxios();
	const {dispatch:postDispatch} = usePost();

	const handleDeleteComment = async() => {
		const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postId}/comment/${comment.id}`);
		console.log(response);	
		if(response.status === 200) {
			setComments(prev => prev.filter(cmt => cmt.id !== comment.id));
		}	
	}

	return (
		<div className="action-modal-container">
	    <button className="action-menu-item hover:text-red-500" onClick={handleDeleteComment}>
	      <img src={DeleteIcon} alt="Delete" />
	      Delete
	    </button>
	  </div>
	)
}

export default CommentActions;