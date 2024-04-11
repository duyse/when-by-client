<template>
  <div className="container">
    <p>Give your meeting a name!</p>
    <input type="text" class="input" id="meetingName" placeholder="Name your meeting"
      v-model="createMeetingRequest.name" />
    <br />
    <p>What date would you like to meet?</p>
    <Datepicker id="meetingDate" v-model="createMeetingRequest.date" :lowerLimit="new Date()" />
    <br />
    <p>What time would you like to meet?</p>
    <!-- Time picker -->
    <div id="time-picker">
      <div class="form-group-input">
        <label>Start Time:</label>
        <vue-timepicker v-model="createMeetingRequest.start" manual-input hide-dropdown class="time" format="hh:mm A"
          :hour-range="[[0, 24]]" :minute-interval="0">
          <template #icon>
            <i class="icon fa-regular fa-clock"></i>
          </template>
        </vue-timepicker>
      </div>
      <div class="form-group-input">
        <label>End Time:</label>
        <vue-timepicker v-model="createMeetingRequest.end" manual-input hide-dropdown class="time"
          :hour-range="[[0, 24]]" format="hh:mm A" :minute-interval="0">
          <template #icon>
            <i class="icon fa-regular fa-clock"></i>
          </template>
        </vue-timepicker>

      </div>
    </div>
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
import VueTimepicker from 'vue3-timepicker';
import { useToast } from 'vue-toastification';
import Datepicker from 'vue3-datepicker';
import { compare, formatDate } from '@/utils/dateUtils';
import { ref } from 'vue';

export default {
  name: "CreateMeeting",
  components: {
    Datepicker,
    VueTimepicker,
  },
  mounted() {
    this.uid = localStorage.getItem('uid');
  },
  setup() {
    // Get store
    const sharedStore = useSharedStore();
    const toast = useToast();
    const createMeetingRequest = ref({
      name: '',
      date: new Date(),
      start: '',
      end: '',
    });
    const userId = ref(0);
    const message = ref('');
    return { sharedStore, toast, createMeetingRequest, userId, message }
  },
  methods: {
    next(event) {
      event.preventDefault();

      // Check if end time > start time
      if (compare(this.createMeetingRequest.end, this.createMeetingRequest.start) <= 0) {
        this.toast.error('End time cannot be the same or before start time');
        return;
      }
      // if (compare(this.createMeetingRequest.start, moment().hours()) <= 0 || compare(this.createMeetingRequest.end, moment().hours()) <= 0) {
      //   this.toast.error('Cannot choose earlier time than now');
      //   return;
      // }
      // Check if meeting's name is blank
      if (!this.createMeetingRequest.name) {
        this.toast.error('Please name your meeting');
        return;
      }
      // Format time to yyyy-MM-DD hh:mm:ss A
      const startTime = formatDate(this.createMeetingRequest.date) + ' ' + this.createMeetingRequest.start;
      const endTime = formatDate(this.createMeetingRequest.date) + ' ' + this.createMeetingRequest.end;
      const meetingData = {
        name: this.createMeetingRequest.name,
        startTime,
        endTime,
        host: this.uid,
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

label {
  display: inline-block;
  width: 150px;
  margin-right: 15px;
}
</style>