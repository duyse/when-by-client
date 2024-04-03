<template>
  <h1 id="title">Availabilities</h1>
  <div class="time-slots">
    <div id="selector">
      <vue-meeting-selector v-model="meeting" :date="date" :loading="loading" :class-names="classNames"
        :meetings-days="meetingsDays" :multi="true" />
      <div id="action">
        <button id="add" class="custom-button" @click="add">
          <span>Add</span>
          <i id="icon" class="fa-solid fa-plus"></i>
        </button>
        <button id="send" class="custom-button" @click="send">
          <span>Send</span>
          <i id="icon" class="fa-solid fa-paper-plane"></i>
        </button>
        <input type="text" v-model="attendee" placeholder="Input attendee" />
        <p>Time slots:</p>
        <p v-for="(element, index) in selections" :key="index">
          {{ element.attendee }}: {{ Array.from(element.slots).join(', ') }}
          <i id="icon" class="fa-solid fa-xmark" @click="remove(index)"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
} from 'vue';

import VueMeetingSelector from 'vue-meeting-selector';
import slotsGenerator from 'vue-meeting-selector/src/helpers/slotsGenerator.js';
import 'vue-meeting-selector/dist/style.css';
import { convertISOToCustomFormat, getEndTime, findIntersection } from '@/utils/dateUtils';

export default defineComponent({
  name: 'SimpleMultiExample',
  components: {
    VueMeetingSelector,
  },
  setup() {
    const date = ref(new Date());
    const meetingsDays = ref([]);
    const meeting = ref([]);
    const loading = ref(true);
    const daysToDisplay = computed(() => 1);
    const selections = ref([]);
    const attendee = ref('');

    const classNames = computed(() => ({
      tabPaginationPreviousButton: 'prev-button',
      tabPaginationNextButton: 'next-button',
      tabMeeting: 'meetings',
    }));

    const slotsGeneratorAsync = (
      d,
      n,
      start,
      end,
      timesBetween,
    ) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(slotsGenerator(d, n, start, end, timesBetween));
      }, 1000);
    });

    onMounted(async () => {
      const start = {
        hours: 1,
        minutes: 0,
      };
      const end = {
        hours: 24,
        minutes: 0,
      };

      meetingsDays.value = await slotsGeneratorAsync(
        date.value,
        daysToDisplay.value,
        start,
        end,
        30,
      );
      loading.value = false;
    });

    return {
      date,
      meetingsDays,
      meeting,
      loading,
      daysToDisplay,
      classNames,
      attendee,
      selections,
    };
  },
  methods: {
    send() {
      let slots = [];
      this.selections.forEach(selection => {
        selection.slots.forEach(slot => {
          slots.push({ start: slot, end: getEndTime(slot, 30) })
        });
      });
      console.log(findIntersection(slots));
    },
    add() {
      if (!this.attendee.length || !this.meeting.length) return; // if attendee is inputted or time slots are selected, do nothing
      const slotsSet = new Set(this.meeting.map(time => convertISOToCustomFormat(time.date)));
      const foundEntry = this.selections.find(selection => selection.attendee === this.attendee);
      if (foundEntry) {
        let existingSlotsSet = foundEntry.slots;
        slotsSet.forEach(slot => existingSlotsSet.add(slot));
      }
      else this.selections.push({ attendee: this.attendee, slots: slotsSet });
    },
    remove(index) {
      this.selections = this.selections.filter(selection => selection.attendee !== this.selections[index].attendee);
    }
  }
});
</script>

<style scoped>
.time-slots {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#selector {
  width: 50%;
}

:deep(.meetings) {
  flex-direction: row;
}

:deep(.prev-button),
:deep(.next-button) {
  display: none;
}

#send {
  margin: 0 10px 0 10px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.custom-button {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 10px;
  transition: 0.3s ease;
}

.custom-button:hover {
  background-color: #0056b3;
}

#icon {
  margin-left: 5px;
  cursor: pointer;
}

#action {
  margin-top: 20px;
}
</style>
