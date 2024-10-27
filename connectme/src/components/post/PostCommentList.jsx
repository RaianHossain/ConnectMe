import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CommentBody from "./CommentBody";

function PostCommentList({ postId, comments, setComments }) {
  const [showComments, setShowComments] = React.useState(false);
  const { auth } = useAuth();
  

  return (
    <>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => {setShowComments(!showComments)}}
        >
          All Comment {showComments ? "▴" : "▾"}
        </button>
      </div>

      {!showComments && comments.length > 1 && (
          <CommentBody postId={postId} comment={comments[0]} key={comments[0].id} setComments={setComments} />
      )}

      {!showComments && comments.length > 2 && (<p className="flex-center">{comments.length - 1} more comments</p>)}         


      {showComments &&
        comments?.map((comment) => (
         <CommentBody key={comment.id} postId={postId} comment={comment} setComments={setComments} />
        ))}
    </>
  );
}

export default PostCommentList;
