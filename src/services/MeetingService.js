import axios from '@/http-common'

class MeetingService {
    async createMeeting(uid, meetingData) {
        return await axios.post(`/accounts/${uid}/meetings`, meetingData)
    }

    async getJoinedMeetings(uid) {
        return await axios.get(`/accounts/${uid}/joinedMeetings`)
    }

    async getHostedMeetings(uid) {
        return await axios.get(`/accounts/${uid}/hostedMeetings`)
    }

    async deleteMeeting(meeting_id) {
        return await axios.delete(`/meetings/${meeting_id}`)
    }

    async sendEmail(meeting_id, email) {
        return await axios.post(`/meetings/${meeting_id}/send_email`, email)
    }

}

export default new MeetingService();