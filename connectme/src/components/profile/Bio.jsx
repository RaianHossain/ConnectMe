import React from "react";
import { actions } from "../../actions";
import Close from "../../assets/icons/close.svg";
import Edit from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

function Bio() {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = React.useState(state?.user?.bio);
  const [isEditing, setIsEditing] = React.useState(false);
  const { api } = useAxios();

  const handleSubmit = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?._id}`,
        { bio }
      );
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.DATA_EDITED,
          payload: response.data,
        });
        setBio(response.data.bio);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      {isEditing ? (
        <textarea
          cols={55}
          rows={4}
          className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      ) : (
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        </div>
      )}

      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {isEditing ? (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleSubmit}
        >
          <img src={Close} alt="close" />
        </button>
      ) : (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setIsEditing(true)}
        >
          <img src={Edit} alt="edit" />
        </button>
      )}
    </div>
  );
}

export default Bio;
