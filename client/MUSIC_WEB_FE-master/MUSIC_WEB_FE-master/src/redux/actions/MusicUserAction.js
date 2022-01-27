import { SET_FORCE_MUSIC, SET_LIST_MUSIC, SET_TITLE_LIST_MUSIC, SET_LISTENED_MUSIC } from "../constants";
import ApiAction from "./ApiAction";

class MusicUserAction extends ApiAction {

    actSetListMusic(data) {
        return {
            type: SET_LIST_MUSIC,
            payload: data
        }   
    }

    actSetForceMusic(data) {
        return {
            type: SET_FORCE_MUSIC,
            payload: data
        }
    }

    actSetTitleListMusic(data) {
        return {
            type: SET_TITLE_LIST_MUSIC,
            payload: data
        }
    }

    actSetListenedMusic(data) {
        return {
            type: SET_LISTENED_MUSIC,
            payload: data
        }   
    }

    async asyncPlayMusic() {
        return async (dispatch, getState) => {
            const { musicState: { forceMusic } } = getState();
            const response = await dispatch(this.callApi(`music/${forceMusic._id}/play_music`, "put", null, null, null));
            return response;
        }
    }

    async asyncGetCategory() {
        return async (dispatch) => {
            const response = await dispatch(this.callApi("category", "get", null, null, null));
            return response;
        }
    }

    async asyncGetMusic(slugCategory = undefined, keySearch = undefined) {
        return async (dispatch) => {
            const response = await dispatch(this.callApi("music", "get", null, { slugCategory, keySearch }, null));
            return response;
        }
        
    }
}

export default new MusicUserAction;
