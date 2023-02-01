import axios from 'axios';

const URL = 'https://frontend-take-home.fetchrewards.com/form';

const getSelectionData = () => {
  return axios.get(URL);
}

const postFormData = (data) => {
  return axios.post(URL, data);
}

export { getSelectionData, postFormData }