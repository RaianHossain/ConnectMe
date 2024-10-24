import { actions } from "../actions"

const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null
}

const profileReducer = (state, action) => {
    switch(action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            }
        }
        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                posts: action.payload.posts
            }
        }
        case actions.profile.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case actions.profile.DATA_EDITED: {
            return {
                ...state,
                user: action.payload
            }
        }
        case actions.profile.IMAGE_UPDATED: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,

                    avatar: action.payload.avatar
                }
            }
        }

        case actions.profile.POST_EDITED: {
            return {
                ...state,
                posts: state.posts.map(post => {
                        if(post.id === action.data.id) {
                            return action.data
                        } else {
                            return post
                        }
                    }),
            }
        }
    }
}

export { initialState, profileReducer }

