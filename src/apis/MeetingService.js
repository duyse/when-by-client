import axios from '@/http-common'

class MeetingService {
    async getJoinedMeetings(uid) {
        return await axios.get(`/accounts/${uid}/joinedMeetings`)
    }

    async getHostedMeetings(uid) {
        return await axios.get(`/accounts/${uid}/hostedMeetings`)
    }

    async deleteMeeting(meeting_id) {
        return await axios.delete(`/meetings/${meeting_id}`)
    }
}

export default new MeetingService();