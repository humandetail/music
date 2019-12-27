import config from 'utils/config';
import HTTP from 'utils/http';

const API = config.API;

class IndexModel extends HTTP {
  // 获取首页Banner数据
  getHomeBanner (type) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_HOME_BANNER,
        params: { // 0：PC; 1: andriod; 2: iphone; 3: ipad
          type
        },
        success: resolve,
        error: reject
      });
    });
  }

  // 新歌速递
  getTopSong (type) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_TOP_SONG,
        // 全部:0
        // 华语:7
        // 欧美:96
        // 日本:8
        // 韩国:16
        params: {
          type
        },
        success: resolve,
        error: reject
      });
    });
  }

  // 推荐歌单
  getPersonalized () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_PERSONALIZED,
        success: resolve,
        error: reject
      });
    });
  }
}

export default IndexModel;