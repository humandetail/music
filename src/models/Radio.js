import config from 'utils/config';
import HTTP from 'utils/http';

const API = config.API;

class RadioModel extends HTTP {
  getCateList () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_DJ_CATELIST,
        success: resolve,
        error: reject
      });
    });
  }

  getRecommend (type) {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_DJ_RECOMMEND,
        params: {
          type
        },
        success: resolve,
        error: reject
      });
    });
  }
}

export default RadioModel;