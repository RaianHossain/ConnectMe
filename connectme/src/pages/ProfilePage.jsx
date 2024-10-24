import React, { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth.user.id}`
        );
        console.log(response);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.profile.DATA_FETCH_ERROR, payload: error });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
