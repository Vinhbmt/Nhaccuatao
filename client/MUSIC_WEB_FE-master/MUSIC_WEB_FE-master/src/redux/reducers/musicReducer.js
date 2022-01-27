import { SET_FORCE_MUSIC, SET_LIST_MUSIC, SET_TITLE_LIST_MUSIC, SET_LISTENED_MUSIC} from '../constants';

const musicInitState = {
    titleListMusic: null,
    listMusic: [],
    forceMusic: null,
    indexForceMusic: null,
    listenedMusic: [],
}


const handleMusicState = (state =  musicInitState, action) => {
    switch(action.type) {
        case SET_LIST_MUSIC:
            return {
                ...state,
                listMusic: action.payload
            }
        case SET_TITLE_LIST_MUSIC: 
            return {
                ...state,
                titleListMusic: action.payload
            }
        case SET_FORCE_MUSIC:
            return {
                ...state,
                forceMusic: action.payload.music,
                indexForceMusic: action.payload.index
            }
        case SET_LISTENED_MUSIC:
            return {
                ...state,
                listenedMusic: action.payload
            }
        default:
            return state;
    }
}

export default handleMusicState;