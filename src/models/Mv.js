import config from 'utils/config';
import HTTP from 'utils/http';

const API = config.API;

class MvModel extends HTTP {
  /**
   * 接口可选参数 :
   * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 * type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全* 部
   * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
   * limit: 取出数量 , 默认为 30
   * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 * limit 的值 , 默认 为 0
   */
  getAllList () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_ALL_MV,
        params: {
          limit: 30
        },
        success: resolve,
        error: reject
      });
    });
  }

  getNewList () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_NEW_MV,
        params: {
          limit: 30
        },
        success: resolve,
        error: reject
      });
    });
  }
  
  getPersonalizedList () {
    return new Promise((resolve, reject) => {
      this.axiosGet({
        url: API.GET_PERSONALIZED_MV,
        success: resolve,
        error: reject
      });
    });
  }
}

export default MvModel;