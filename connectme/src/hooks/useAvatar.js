import useProfile from "./useProfile";

const useAvatar = (post) => {
    const {state} = useProfile();
    const avatar = post?.author?.id === state?.user?.id ? state?.user?.avatar : post?.author?.avatar;

    const avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;

    return avatarUrl;
}

export default useAvatar;