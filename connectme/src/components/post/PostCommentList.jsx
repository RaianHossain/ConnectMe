import React, { useState } from "react";
import threeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";

function PostCommentList({ comments }) {
  const [showComments, setShowComments] = React.useState(false);
  const { auth } = useAuth();

  const [isOpenMenu, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setShowComments(!showComments)}
        >
          All Comment {showComments ? "▴" : "▾"}
        </button>
      </div>

      {showComments &&
        comments?.map((comment) => (
          <div className="flex items-center justify-between gap-4">
            <div
              className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3"
              key={comment.id}
            >
              <div className="flex items-center gap-3 pt-4">
                <img
                  className="max-w-6 max-h-6 rounded-full"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                    comment.author.avatar
                  }`}
                  alt="avatar"
                />
                <div>
                  <div className="flex gap-1 text-xs lg:text-sm">
                    <span>{comment.author.name}: </span>
                    <span>{comment.comment}</span>
                  </div>
                </div>
              </div>           
            </div>
            {auth?.user?.id === comment?.author?.id &&
             (<div className="relative">
                 <button>
                   <img
                     src={threeDots}
                     alt="3dots of Action"
                     onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
                   />
                 </button>
   
                 
                 {isOpenMenu && 
                    <div className="action-modal-container">
                      <button className="action-menu-item hover:text-lwsGreen">
                        <img src={EditIcon} alt="Edit" />
                        Edit
                      </button>
                      <button className="action-menu-item hover:text-red-500">
                        <img src={DeleteIcon} alt="Delete" />
                        Delete
                      </button>
                    </div>
                  }
               </div>
              )
          }
          </div>
        ))}
    </>
  );
}

export default PostCommentList;
