import axios from '@/http-common';

export const createMeeting = async (userId, meetingData) => {
    const response = await axios.post(`/accounts/${userId}/meetings`, meetingData);
    return response.data;
}