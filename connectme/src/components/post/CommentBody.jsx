import React, { useState } from "react";
import threeDots from "../../assets/icons/3dots.svg";
import { useAuth } from "../../hooks/useAuth";
import CommentActions from "./CommentActions";

const CommentBody = ({ postId, comment, setComments }) => {
  const [isOpenMenu, setIsMenuOpen] = useState(false);
  const { auth } = useAuth();
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3"
        key={comment._id}
      >
        <div className="flex items-center gap-3 pt-4">
          <img
            className="max-w-6 max-h-6 rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              comment.author?.avatar
            }`}
            alt="avatar"
          />
          <div>
            <div className="flex gap-1 text-xs lg:text-sm">
              <span>
                {comment.author?.firstName} {comment.author?.lastName} :{" "}
              </span>
              <span>{comment.comment}</span>
            </div>
          </div>
        </div>
      </div>
      {auth?.user?._id === comment?.author?._id && (
        <div className="relative">
          <button>
            <img
              src={threeDots}
              alt="3dots of Action"
              onClick={() => setIsMenuOpen((prevVal) => !prevVal)}
            />
          </button>

          {isOpenMenu && (
            <CommentActions
              postId={postId}
              comment={comment}
              setComments={setComments}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentBody;
