import axios from '@/http-common';

export const login = async payload => {
  return await axios.post('login', payload)
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
}
