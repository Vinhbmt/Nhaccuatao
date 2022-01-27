import ApiAction from "./ApiAction";

class AccountUserAction extends ApiAction {

    async asyncGetAccountInfo(accountId) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState();
            const response = await dispatch(this.callApi(`account/${accountId}`, "get", { token }, null, null));
            return response;
        }
    }

    async asyncChangePassword(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState();
            const response = await dispatch(this.callApi("account/change_password", "put", { token }, null, data));
            return response;
        }
    }


    async asyncChangeAvatar(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState();
            const response = await dispatch(this.callApi("account/change_avatar", "put", { token, 'Content-Type': 'multipart/form-data' }, null, data));
            return response;
        }
    }

    async asyncUpdateInfo(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState();
            const response = await dispatch(this.callApi("account", "put", { token }, null, data));
            return response;
        }
    }


}

export default new AccountUserAction();