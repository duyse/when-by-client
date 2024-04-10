<template>
  <div className="container">
    <p>Give your meeting a name!</p>
    <input type="text" class="input" id="meetingName" placeholder="Name your meeting"
      v-model="createMeetingRequest.name" />
    <br />
    <p>What date would you like to meet?</p>
    <input type="date" id="meetingDate" v-model="createMeetingRequest.date" min="" />
    <br />
    <p>What time would you like to meet?</p>
    <input type="time" id="start" v-model="createMeetingRequest.start" />&nbsp;&nbsp;to&nbsp;
    <input type="time" id="endTime" v-model="createMeetingRequest.end" />
    <br />
    <button id="send" @click="next">
      <span>Next</span>
      <i id="icon" class="fa-solid fa-arrow-right"></i>
    </button>
    <br />
  </div>
</template>

<script>
import { useSharedStore } from '@/utils/store';
import { useToast } from 'vue-toastification';

export default {
  name: "CreateMeeting",
  mounted() {
    this.userId = localStorage.getItem('id');
  },
  setup() {
    // Get store
    const sharedStore = useSharedStore();
    const toast = useToast();
    return { sharedStore, toast }
  },
  data() {
    return {
      createMeetingRequest: {
        name: '',
        date: '',
        start: this.currentTime,
        end: '',
      },
      userId: 0,
      message: '',
    }
  },
  methods: {
    next(event) {
      event.preventDefault();

      // Check if end time > start time
      if (this.createMeetingRequest.endTime <= this.createMeetingRequest.startTime) {
        this.toast.error('End time cannot be the same or before start time');
        return;
      }
      // Check if meeting's name is blank
      if (this.createMeetingRequest.name.length === 0) {
        this.toast.error('Please name your meeting');
        return;
      }
      // Format time to yyyy-MM-DD hh:mm:ss A
      const startDate = new Date(this.createMeetingRequest.date + 'T' + this.createMeetingRequest.start);
      const endDate = new Date(this.createMeetingRequest.date + 'T' + this.createMeetingRequest.end);
      const meetingData = {
        name: this.createMeetingRequest.name,
        startTime: startDate,
        startDate: this.createMeetingRequest.date,
        endTime: endDate,
        host: this.userId,
      };
      // Store meeting data to a shared store
      this.sharedStore.setSharedData(meetingData);
      this.$router.push({ name: 'UserTimeSlots' });
    }
  },
}
</script>

<style scoped>
.container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 370px;
  margin: auto;
  margin-top: 140px;
}

.input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.95);
}

#icon {
  margin-left: 5px;
  cursor: pointer;
}

.error {
  margin-bottom: 10px;
  font-size: 0.9em;
  color: red;
}
</style>@/utils/emitter