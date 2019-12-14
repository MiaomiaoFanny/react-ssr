// 首页逻辑
import axios from 'axios';
// actionType
const GET_LIST = 'INDEX/GET_LIST';

// actionCreater
const changeList = list => ({
  type: GET_LIST,
  list,
});

export const getIndexList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9000/api/course/list')
      .then(res => {
        const { list } = res.data;
        console.log(['getIndexList'], list);
        dispatch(changeList(list));
      });
  };
};

const defaultState = {
  list: [],
  title: 'Learn React SSR, Awesome!',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
};
