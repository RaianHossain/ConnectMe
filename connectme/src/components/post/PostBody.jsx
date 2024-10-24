import React from "react";

function PostBody({ poster, content }) {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p>{content}</p>
      {poster && (
        <div className="flex items-center justify-center overflow-hidden mt-2">
          <img
            className="max-w-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        </div>
      )}
    </div>
  );
}

export default PostBody;
