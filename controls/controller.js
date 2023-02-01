import axios from 'axios';

const URL = 'https://frontend-take-home.fetchrewards.com/form';

const getSelectionData = async () => {
  return await axios.get(URL);
}

const postFormData = async (data) => {
  return await axios.post(URL, data);
}

module.exports = { getSelectionData, postFormData }