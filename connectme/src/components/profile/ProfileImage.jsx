import React, { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      console.log(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          dispatch({
            type: actions.profile.IMAGE_UPDATED,
            payload: response.data,
          });
          setAvatar(
            `${import.meta.env.VITE_SERVER_BASE_URL}/${response.data.avatar}`
          );
        }, 2000)
        
      }
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.avatar}
        key={state?.user?.avatar}
      />

      <form id="form" encType="multipart/form-data">
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
          type="submit"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input id="file" type="file" ref={fileUploaderRef} hidden />
      </form>
    </div>
  );
}

export default ProfileImage;