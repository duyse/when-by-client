<template>
  <h1>Availabilities</h1>
  <div id="main">
    <!-- Action -->
    <div id="action">
      <input type="text" v-model="attendee" placeholder="Input attendee" />
      <button id="add" @click="add">
        <span>Add</span>
        <i class="icon fa-solid fa-plus"></i>
      </button>
      <button id="send" @click="create">
        <span>Create</span>
        <i class="icon fa-solid fa-paper-plane"></i>
      </button>
    </div>
    <!-- Slots -->
    <div id="slots" v-if="selections.length > 0">
      <p>Time intervals:</p>
      <div v-for="(element, index) in selections" :key="index">
        <p v-for="(slot, _index) in Array.from(element.slots)" :key="_index">
          {{ element.attendee }}: {{ slot.start }} - {{ slot.end }}
          <i class="icon fa-solid fa-trash"></i>
        </p>
      </div>
      <p v-if="intersection.start">Best time interval: {{ intersection.start }} - {{ intersection.end }}</p>
    </div>
    <!-- Time picker -->
    <div id="time-picker">
      <vue-timepicker hide-disabled-hours v-model="startTime" manual-input hide-dropdown class="time"
        :hour-range="[[0, 24]]" :minute-interval="30" placeholder="Start Time">
        <template #icon>
          <i class="icon fa-regular fa-clock"></i>
        </template>
      </vue-timepicker>
      &nbsp;
      <vue-timepicker v-model="endTime" manual-input hide-dropdown class="time" :hour-range="[[0, 24]]"
        :minute-interval="30" placeholder="End Time">
        <template #icon>
          <i class="icon fa-regular fa-clock"></i>
        </template>
      </vue-timepicker>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue3-timepicker';
import moment from 'moment';
import { findIntersection, formatDate } from '@/utils/dateUtils';
import { useToast } from 'vue-toastification';
import 'vue3-timepicker/dist/VueTimepicker.css';
import { useSharedStore } from '@/utils/store';
import { createMeeting } from "@/apis/create";

export default {
  name: 'TimePicker',
  components: {
    VueTimepicker,
  },
  setup() {
    const sharedStore = useSharedStore();
    const toast = useToast();
    const meetingData = sharedStore.sharedData;
    return { meetingData, toast }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      placeholder: 'Start Time',
      attendee: '',
      selections: [],
      intersection: {
        start: '',
        end: '',
      },
    }
  },
  methods: {
    add() {
      if (!this.attendee || !this.startTime || !this.endTime) {
        this.toast.error('Attendee and time must not be blank');
        return;
      }
      const newSlot = { start: moment(this.startTime).format('hh:mm:ss A'), end: moment(this.endTime).format('hh:mm:ss A') };
      let foundEntry = this.selections.find(selection => selection.attendee === this.attendee);
      if (!foundEntry) {
        foundEntry = { attendee: this.attendee, slots: new Set() };
        this.selections.push(foundEntry);
      }
      const slotExists = [...foundEntry.slots].some(slot =>
        slot.start === newSlot.start && slot.end === newSlot.end,
      );
      if (!slotExists) foundEntry.slots.add(newSlot);
    },
    async create() {
      this.intersection = findIntersection(this.selections);
      this.meetingData = {
        ...this.meetingData,
        startTime: formatDate(this.meetingData.startDate + ' ' + this.intersection.start),
        endTime: formatDate(this.meetingData.startDate + ' ' + this.intersection.end),
      };
      try {
        await createMeeting(parseInt(this.meetingData.host), this.meetingData);
        this.toast.success('Meeting is created successfully');
      } catch (error) {
        this.toast.error(error);
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
#main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

#add {
  margin: 0 10px 0 10px;
}

.icon {
  margin-left: 5px;
  cursor: pointer;
}

#action,
#slots,
#time-picker {
  margin-top: 20px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>