import useProfile from "./useProfile";

const useAvatar = (post) => {
    const {state} = useProfile();
    const avatar = post?.author?._id === state?.user?._id ? state?.user?.avatar : post?.author?.avatar;

    const avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;
    console.log(post);
    return avatarUrl;
}

export default useAvatar;