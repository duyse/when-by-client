<template>
  <div id="main">
    <div id="availabilites">
      <h1>Availabilities</h1>
      <p><em>Meeting information:</em></p>
      Title: {{ meetingData && meetingData.name }}<br />
      Time: {{ meetingData && meetingData.startTime }} - {{ meetingData && meetingData.endTime }}
      <!-- Time picker -->
      <div id="time-picker">
        <div class="form-group-input">
          <label>Start Time:</label>
          <vue-timepicker hide-disabled-hours v-model="startTime" manual-input hide-dropdown class="time"
            format="hh:mm A" :hour-range="[[0, 24]]" :minute-interval="0">
            <template #icon>
              <i class="icon fa-regular fa-clock"></i>
            </template>
          </vue-timepicker>
        </div>
        <div class="form-group-input">
          <label>End Time:</label>
          <vue-timepicker hide-disabled-hours v-model="endTime" manual-input hide-dropdown class="time"
            :hour-range="[[0, 24]]" format="hh:mm A" :minute-interval="0">
            <template #icon>
              <i class="icon fa-regular fa-clock"></i>
            </template>
          </vue-timepicker>

        </div>
      </div>
      <!-- Action -->
      <div id="action">
        <div class="form-group-input">
          <label>Attendee:</label>
          <input type="text" v-model="attendee.name" placeholder="Input attendee" />
        </div>
        <div class="form-group-input">
          <label>Email:</label>
          <input type="email" v-model="attendee.email" pattern=".+@gmail\.com" placeholder="Input email" />
        </div>
        <div class="form-group-btn">
          <button id="add" @click="add">
            <span>Add</span>
          </button>
          <button id="create" @click="create">Create</button>
          <button id="send" @click="send">
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Slots -->
    <div id="slots" v-if="selections.length > 0">
      <h1>Time intervals:</h1>
      <div v-for="(element, index) in selections" :key="index">
        <p v-for="(slot, _index) in Array.from(element.slots)" :key="_index">
          {{ element.attendee }}: {{ slot.start }} - {{ slot.end }}
          <i class="icon fa-solid fa-trash" @click="remove(index)"></i>
        </p>
      </div>
      <p v-if="intersection.start">Best time interval: {{ intersection.start }} - {{ intersection.end }}</p>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue3-timepicker';
import moment from 'moment';
import { compare, findIntersection, formatDate, formatTime } from '@/utils/dateUtils';
import { useToast } from 'vue-toastification';
import 'vue3-timepicker/dist/VueTimepicker.css';
import { useSharedStore } from '@/utils/store';
import { ref } from 'vue';
import MeetingService from '@/services/MeetingService';

export default {
  name: 'TimePicker',
  components: {
    VueTimepicker,
  },
  setup() {
    const sharedStore = useSharedStore();
    const meetingData = sharedStore.sharedData;
    const toast = useToast();
    let mid = ref('');
    return { meetingData, mid, toast }
  },
  mounted() {
    if (!this.meetingData) this.$router.push({ name: 'CreateMeeting', params: { userId: this.uid } });
    console.log(this.meetingData);
  },
  data() {
    return {
      uid: localStorage.getItem('uid'),
      startTime: '',
      endTime: '',
      placeholder: 'Start Time',
      attendee: {
        name: '',
        email: '',
      },
      recipients: [],
      selections: [],
      intersection: {
        start: '',
        end: '',
      },
    }
  },
  methods: {
    add() {
      if (!this.attendee.name || !this.startTime || !this.endTime || !this.attendee.email) {
        this.toast.error('All fields must not be blank');
        return;
      }
      if (compare(this.startTime, this.meetingData.startTime) < 0 || compare(this.endTime, this.meetingData.endTime) > 0) {
        this.toast.error('Invalid interval, please choose again');
        return;
      }
      this.recipients.push(this.attendee.email);
      const newSlot = { start: moment(this.startTime, 'hh:mm:ss A').format('hh:mm:ss A'), end: moment(this.endTime, 'hh:mm:ss A').format('hh:mm:ss A') };
      let foundEntry = this.selections.find(selection => selection.attendee === this.attendee.name);
      if (!foundEntry) {
        foundEntry = { attendee: this.attendee.name, slots: new Set() };
        this.selections.push(foundEntry);
      }
      const slotExists = [...foundEntry.slots].some(slot =>
        slot.start === newSlot.start && slot.end === newSlot.end,
      );
      if (!slotExists) foundEntry.slots.add(newSlot);
    },
    async create() {
      if (!this.meetingData || !this.intersection.start || !this.intersection.end) {
        this.toast.error('All fields must not be blank');
        return;
      }
      this.intersection = findIntersection(this.selections);
      this.meetingData = {
        ...this.meetingData,
        startTime: formatDate(this.meetingData.startTime) + ' ' + formatTime(this.intersection.start),
        endTime: formatDate(this.meetingData.endTime) + ' ' + formatTime(this.intersection.end),
      };
      await Promise.all([
        MeetingService.createMeeting(this.meetingData.host, this.meetingData),
        MeetingService.getHostedMeetings(this.meetingData.host)
          .then(response => {
            const records = response.data;
            const lastRecord = records.reduce((max, obj) => obj.id > max.id ? obj : max, records[0]);
            this.mid = lastRecord.id;
          })
          .catch(error => {
            this.toast.error(error);
          })
      ]);
      this.toast.success('Meeting is created successfully');
    },
    remove(index) {
      this.selections.splice(index, 1);
    },
    async send() {
      if (!this.meetingData) {
        this.toast.error('All fields must not be blank');
        return;
      }
      const { name } = this.meetingData;
      const sender = "duynse@gmail.com";
      const subject = `Confirmation of meeting ${name}`;
      for (let i = 0; i < this.recipients.length; i++) {
        const email = {
          from: sender,
          to: this.recipients[i],
          subject,
          name,
        };
        await MeetingService.sendEmail(this.mid, email).then(res => {
          console.log(res.data);
          this.toast.success('Invite successfully');
        }).catch(error => this.toast.error(error));
      }
    },
  },
}
</script>

<style scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  display: inline-block;
  width: 150px;
  margin-right: 15px;
}

#availabilites,
#slots {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 370px;
  margin-top: 80px;
}

#slots {
  margin-left: 20px;
}

.fa-trash {
  color: red;
}

.fa-trash:hover {
  color: #d30000;
}

.icon {
  margin-left: 5px;
  cursor: pointer;
}

.form-group-btn {
  display: flex;
  justify-content: space-around;
}

#action,
#slots,
#time-picker {
  margin-top: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 12em;
  box-sizing: border-box;
}

#send,
#add,
#create {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s ease;
  margin-top: 20px;
  width: 100px;
}

#add:hover,
#create:hover,
#send:hover {
  background-color: #0056b3;
}
</style>