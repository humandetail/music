import config from 'utils/config';
import HTTP from 'utils/http';

const API = config.API;

class PlayModel extends HTTP {

  getSong (id) {
    return Promise.all([this.getSongUrl(id), this.checkMusic(id)])
  }

  getSongUrl (id) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_SONG_URL,
        params: {
          id
        },
        success: resolve,
        error: reject
      });
    });
  }

  checkMusic (id) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.CHECK_MUSIC,
        params: {
          id
        },
        success: resolve,
        error: reject
      });
    });
  }

  getDetail (ids) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_SONG_DETAIL,
        params: {
          ids
        },
        success: resolve,
        error: reject
      });
    });
  }

  getLyric (id) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_LYRIC,
        params: {
          id
        },
        success: resolve,
        error: reject
      });
    });
  }
}

export default PlayModel;