import React from "react";
import PostCard from "./PostCard";

function PostList({ posts }) {
  return (
    <>{posts && posts.map((post) => <PostCard key={post._id} post={post} />)}</>
  );
}

export default PostList;
