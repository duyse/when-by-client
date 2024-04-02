import axios from '@/http-common';

export const sendEmail = async payload => {
  return await axios.post(`/meetings/${meetingId}/send_email`, payload)
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
}
