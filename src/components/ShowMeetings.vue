<template>
  <div class="meetings-container">
    <div class="meetings-controller">
      <ul>
        <li class="left-btn"><a href="" @click="showHostedMeetings">Meetings Hosted By You</a></li>
        <li class="right-btn"><a href="" @click="showAllMeetings">All Meetings</a></li>
      </ul>
    </div>
    <div v-if="action === 'All Meetings'" class="show-meetings all-meetings">
      <div v-if="meetings.length === 0">
        <h2>You are not in any meetings</h2>
      </div>
      <div v-else>
        <h2 class="title">All Meetings</h2>
        <div class="meetings">
          <table>
            <thead>
              <tr class="meeting-header">
                <th>Date</th>
                <th>Meeting Name</th>
                <th>Host</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              <tr class="meeting-data" v-for="(meeting, index) in meetings" :key="index">
                <td>{{ meeting.startTime.split(' ')[0] }}</td>
                <td>{{ meeting.name }}</td>
                <td>{{ meeting.host.email }}</td>
                <td>{{ meeting.startTime.split(' ')[1] }}</td>
                <td>{{ meeting.endTime.split(' ')[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div v-if="action === 'Hosted Meetings'" class="show-meetings hosted-meetings">
      <div v-if="meetings.length === 0">
        <h2>You have not scheduled any meetings</h2>
      </div>
      <div v-else>
        <h2 class="title">Meetings Hosted By You</h2>
        <div class="meetings">
          <table>
            <thead>
              <tr class="meeting-header">
                <th>Date</th>
                <th>Meeting Name</th>
                <th>Host</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete Meeting</th>
              </tr>
            </thead>
            <tbody>
              <tr class="meeting-data" v-for="(meeting, index) in meetings" :key="index">
                <td>{{ meeting.startTime.split(' ')[0] }}</td>
                <td>{{ meeting.name }}</td>
                <td>{{ meeting.host.email }}</td>
                <td>{{ meeting.startTime.split(' ')[1] }}</td>
                <td>{{ meeting.endTime.split(' ')[1] }}</td>
                <td><i class="icon fa-solid fa-trash" @click="handleDelete(meeting.id)"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import MeetingService from '@/services/MeetingService';
import moment from 'moment';
export default {
  name: "ShowMeetings",

  data() {
    return {
      action: "All Meetings",
      meetings: [],
      message: "",
    }
  },

  methods: {
    checkLogin() {
      if (!localStorage.getItem('uid')) {
        this.$router.push({ name: "login" });
      }
    },

    handleDelete(meetingId) {
      this.meetings = this.meetings.filter(meeting => meeting.id !== meetingId);
      MeetingService.deleteMeeting(meetingId)
        .then(() => this.action = "Hosted Meetings")
        .catch((err) => console.log(err))
    },

    convertTime(time) {
      return moment(time, moment.ISO_8601).format('DD/MM/YYYY HH:mm:ss A')
    },

    showAllMeetings(event) {
      if (event) {
        event.preventDefault();
      }
      this.action = 'All Meetings';

      MeetingService.getJoinedMeetings(localStorage.getItem('uid'))
        .then((res) => {
          this.meetings = res.data;
          this.meetings.forEach(meeting => {
            meeting.startTime = this.convertTime(meeting.startTime);
            meeting.endTime = this.convertTime(meeting.endTime);
          });
          if (!this.meetings.length) this.message = 'You are not in any meetings';
        })
        .catch((err) => console.log(err))
    },

    showHostedMeetings(event) {
      if (event) event.preventDefault();
      this.action = 'Hosted Meetings';

      MeetingService.getHostedMeetings(localStorage.getItem('uid'))
        .then((res) => {
          this.meetings = res.data

          this.meetings && this.meetings.forEach(meeting => {
            meeting.startTime = this.convertTime(meeting.startTime);
            meeting.endTime = this.convertTime(meeting.endTime);
          });

          if (!this.meetings.length)
            this.message = 'You have not scheduled any meetings';
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.checkLogin();
    this.showHostedMeetings();
  }
}
</script>

<style scoped>
.meetings-container {
  margin-top: 100px;
}

.meetings-controller {
  width: 40%;
  margin: auto;
}

.meetings-controller ul {
  margin: auto;
  list-style-type: none;
  display: flex;
  /* margin-left: 50px; */
}

.meetings-controller li {
  height: auto;
  float: right;
  padding: 10px;
  margin-top: 20px;
  background-color: #D3D3D3;
  cursor: pointer;
}

.meetings-controller a {
  display: block;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1.1em;
  line-height: 40px;
  width: 250px;
}

.left-btn {
  margin-right: 30px;
}

.right-btn {
  margin-left: 30px;
}

.meetings-controller li:hover {
  background-color: lightslategray;
}

h2 {
  margin-top: 50px;
}

.meetings {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  height: 40px;
}

th {
  background-color: lightblue;
}

.icon {
  color: red;
  cursor: pointer;
}

.icon:hover {
  color: #d30000;
}
</style>