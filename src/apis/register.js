import axios from '@/http-common';

export const register = async payload => {
  return await axios.post('accounts', payload)
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
}
