import { useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import CloseIcon from "../../assets/icons/close.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const [previewImage, setPreviewImage] = useState();
  const [imageFile, setImageFile] = useState();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleImageUpload = (event) => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    setPreviewImage(URL.createObjectURL(files[0]));
    setImageFile(files[0]);
  };

  const handlePostSubmit = async (formData) => {
    const newFormData = new FormData();
    newFormData.append("content", formData.content);
    if (imageFile) {
      newFormData.append("image", imageFile);
    }
    console.log(newFormData);

    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        newFormData
      );

      if (response.status === 201) {
        onCreate();
        setTimeout(() => {
          dispatch({
            type: actions.post.DATA_CREATED,
            data: response.data,
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.response?.data?.message,
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="align-self-end"
            onClick={() => onCreate()}
            type="button"
          >
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        {previewImage && (
          <img className="w-[300px] h-[300px]" src={previewImage} />
        )}
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
