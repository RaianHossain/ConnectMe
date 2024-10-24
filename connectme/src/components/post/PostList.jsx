import React from "react";
import PostCard from "./PostCard";
import { usePost } from "../../hooks/usePost";

function PostList({ posts }) {
  return (
    <>{posts && posts.map((post) => <PostCard key={post.id} post={post} />)}</>
  );
}

export default PostList;
