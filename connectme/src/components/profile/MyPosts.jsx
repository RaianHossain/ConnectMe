import React from "react";
import useProfile from "../../hooks/useProfile";
import PostList from "../post/PostList";

function MyPosts(props) {
  const { state } = useProfile();
  return (
    <>
      <h4 class="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={state.posts} />
    </>
  );
}

export default MyPosts;
