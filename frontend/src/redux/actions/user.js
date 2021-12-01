import { openNotification } from 'utils/helpers';
import { userApi } from 'utils/api';

const Actions = {
  setUserData: data => ({
    type: 'USER:SET_DATA',
    payload: data,
  }),
  setIsAuth: bool => ({
    type: 'USER:SET_IS_AUTH',
    payload: bool,
  }),
  fetchUserData: () => dispatch => {
    userApi
      .getMe()
      .then(({ data }) => {
        dispatch(Actions.setUserData(data));
      })
      .catch(err => {
        if (err.response.status === 403) {
          dispatch(Actions.setIsAuth(false));
          delete window.localStorage.token;
        }
      });
  },
  fetchUserLogin: postData => dispatch => {
    return userApi
      .signIn(postData)
      .then(({ data }) => {
        const { token } = data;
        openNotification({
          title: 'Success!',
          text: 'Authorised successfully.',
          type: 'success',
        });
        window.axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true));
        return data;
      })
      .catch(({ response }) => {
        openNotification({
          title: 'Authorization error',
          text: 'Wrong login or password',
          type: 'error',
        });
      });
  },
  fetchUserRegister: postData => () => {
    return userApi.signUp(postData);
  },
};

export default Actions;
