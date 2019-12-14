// 首页逻辑
import axios from 'axios';
// actionType
const GET_APP_INFO = 'ABOUT/APP_INFO';

// actionCreater
const changeList = info => ({
  type: GET_APP_INFO,
  info,
});

export const getAppInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9000/api/app/info')
      .then(res => {
        const { info } = res.data;
        console.log(['getAppInfo'], info);
        dispatch(changeList(info));
      });
  };
};

const defaultState = {
  info: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_APP_INFO:
      return {
        ...state,
        info: action.info,
      };
    default:
      return state;
  }
};
