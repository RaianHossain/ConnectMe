import React, { useState, useEffect } from "react";
import threeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";
import useAvatar from "../../hooks/useAvatar";
import timeDiff from "../../utils/timeDiff";
import {useAuth} from "../../hooks/useAuth";

import AddPhoto from "../../assets/icons/addPhoto.svg";
import CloseIcon from "../../assets/icons/close.svg";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { actions } from "../../actions";


function PostHeader({ post }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  const {dispatch:postDispatch} = usePost();
  const {dispatch:profileDispatch} = useProfile();
  const { api } = useAxios();

  const isMe = auth?.user?.id === post?.author?.id;

  const handleEditPost = () => {
    setIsEditing(true);
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    alert("Check");

    const files = Array.from(event.target.files);
    setPreviewImage(URL.createObjectURL(files[0]));
    setImageFile(files[0]);
  };

  const handleCloseModal = () => {
    setPreviewImage(null); 
    setIsEditing(false);
    setIsMenuOpen(false);
  }

  const handlePostSubmit = async (formData) => {
    console.log(formData);
    const newFormData = new FormData();
    newFormData.append("content", formData.content);
    if (imageFile) {
      newFormData.append("image", imageFile);
    }
    console.log(newFormData);

    // postDispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
        newFormData
      );
      if (response.status === 200) {
        setTimeout(() => {
          postDispatch({
            type: actions.post.DATA_EDITED,
            data: response.data,
          });

          profileDispatch({
            type: actions.profile.POST_EDITED,
            data: response.data,
          });
        }, 1000);

        handleCloseModal()
      }
    } catch (error) {
      postDispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const handlePostDelete = async() => {
    const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`);
    if(response.status === 200) {

    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      content: "post?.content"
    },
  });

  useEffect(() => {
    reset({
      content: post?.content || '',
    });
  }, [post]);

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={useAvatar(post)}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={timeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {timeDiff(post?.createAt)} ago
            </span>
          </div>
        </div>
      </div>

      {isMe && 
        <div className="relative">
          <button onClick={() => setIsMenuOpen((prevVal) => !prevVal)}>
            <img
              src={threeDots}
              alt="3dots of Action"              
            />
          </button>
  
          {isMenuOpen && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen" onClick={() => {setIsEditing(true)}}>
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      }
      <div class={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${isEditing ? '' : 'hidden'}`} id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="card">
                <form  onSubmit={handleSubmit(handlePostSubmit)}>    
                  <label
                    className="btn-primary cursor-pointer !text-gray-100 mb-3"
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
                  <Field label="" error={errors.content}>
                    <textarea
                      {...register("content", {
                        required: "Adding some text is mandatory!",
                      })}
                      name="content"
                      id="content"
                      placeholder="Share your thoughts..."
                      className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px] border rounded p-1 border-gray-600"
                    ></textarea>
                  </Field>
                  {post?.image && !previewImage && (
                    <div className="flex justify-center">
                      <img src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post.image}`} className="h-[400px] w-[400px]" />
                    </div>
                    )}
                  {previewImage && (
                    <div className="flex justify-center">
                      <img src={previewImage} className="h-[400px] w-[400px]" />
                    </div>
                  )}

                  <div class="bg-gray-200 px-4 py-3 text-right">
                    <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={handleCloseModal}><i class="fas fa-times"></i> Cancel</button>
                    <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"><i class="fas fa-plus"></i> Update</button>
                  </div>
                </form>
              </div>
              
            </div>
        </div>
      </div>

       
    </header>
  );
}

export default PostHeader;


//sukina hoyuga imasuka  = 
//watashiwa mosharraf karim sukidesu = 

//mosha wa do desuka
//mosha wa en gi ga jojuu dashi, hontoni omoshiroi desu. Dorama wo mite sukini narimashita.