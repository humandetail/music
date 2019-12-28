// const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'http://musicapi.humandetail.com';

const API = {
  // 首页BANNER
  GET_HOME_BANNER: API_BASE_URL + '/banner',
  // 新歌速递
  // GET_TOP_SONG: API_BASE_URL + '/top/song',
  GET_TOP_SONG: API_BASE_URL + '/personalized/newsong',
  // 推荐歌单
  GET_PERSONALIZED: API_BASE_URL + '/personalized',
  // 音乐URL
  GET_SONG_URL: API_BASE_URL + '/song/url',
  // 检测音乐是否可用
  CHECK_MUSIC: API_BASE_URL + '/check/music',
  // 歌词
  GET_LYRIC: API_BASE_URL + '/lyric',
  // 歌曲详情
  GET_SONG_DETAIL: API_BASE_URL + '/song/detail',
  // 获取全部Mv
  GET_ALL_MV: API_BASE_URL + '/mv/all',
  // 获取最新Mv
  GET_NEW_MV: API_BASE_URL + '/mv/first',
  // 推荐MV
  GET_PERSONALIZED_MV: API_BASE_URL + '/personalized/mv',
  // 电台分类
  GET_DJ_CATELIST: API_BASE_URL + '/dj/catelist',
  // 电台分类推荐
  GET_DJ_RECOMMEND: API_BASE_URL + '/dj/recommend/type',
  // 热门搜索
  GET_SEARCH_HOT: API_BASE_URL + '/search/hot',
  // 搜索
  GET_SEARCH: API_BASE_URL + '/search',
};

export default {
  API
}