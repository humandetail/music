import config from 'utils/config';
import HTTP from 'utils/http';

const API = config.API;

class SearchModel extends HTTP {
  // 获取搜索内容
  getSearch (keywords, page = 1) {
    return new Promise((resolve, reject) => {
      let limit = 30,
          offset = (page - 1) * limit;
      this.axiosGet({
        url: API.GET_SEARCH,
        params: {
          keywords,
          limit, offset
        },
        success: resolve,
        error: reject
      });
    });
  }

  // 获取热门搜索内容
  getHotSearch () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_SEARCH_HOT,
        success: resolve,
        error: reject
      });
    });
  }
}

export default SearchModel;