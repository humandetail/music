import axios from 'axios';

export default class HTTP {
  axiosGet (options) {
    axios({
      url: options.url,
      method: 'GET',
      params: options.params
    })
      .then((res) => {
        options.success(res.data);
      })
      .catch((err) => {
        options.error(err);
      })
  }
}