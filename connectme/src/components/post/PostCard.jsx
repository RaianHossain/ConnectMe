import React from "react";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions post={post} commentCount={post?.comments.length} />
      <PostComments post={post} />
    </article>
  );
}

export default PostCard;
