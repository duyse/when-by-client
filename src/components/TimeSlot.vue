<template>
  <div class="time-slots">
    <p v-if="isEditable">{{ meetingName }}</p>
    <h1 id="title">Availabilities</h1>
    <div id="selector">
      <vue-meeting-selector
      v-model="meeting" :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      :multi="true" />
      <p> {{ meeting.length ? meeting : "No time slot selected" }}</p>
      <div id="action">
        <custom-button icon="plus" @click="add">Add</custom-button>
        <custom-button icon="paper-plane" @click="send">Send</custom-button>
      </div>
  </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted
} from 'vue';

import VueMeetingSelector from 'vue-meeting-selector';
import slotsGenerator from 'vue-meeting-selector/src/helpers/slotsGenerator.js';
import CustomButton from './widgets/CustomButton.vue';
import 'vue-meeting-selector/dist/style.css';

export default defineComponent({
  name: 'SimpleMultiExample',
  props: {
    meetingName: {
      type: String,
      required: true,
    },
  },
  components: {
    VueMeetingSelector,
    CustomButton,
  },
  setup() {
    const date = ref(new Date());
    const meetingsDays = ref([]);
    const meeting = ref([]);
    const loading = ref(true);
    const daysToDisplay = computed(() => 1);

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
        hours: 8,
        minutes: 0,
      };
      const end = {
        hours: 16,
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

    const send = () => {
      `
      <h4><b>Whenby Team</b></h4>
      <p>
        Your meeting information is as follows:\n
        Meeting: example\n
        Time: \n
      </p>
      `
    };

    const add = () => {
      
    };

    return {
      date,
      meetingsDays,
      meeting,
      loading,
      daysToDisplay,
      classNames,
      add,
      send,
    };
  },
});
</script>

<style scoped>
.time-slots {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 300px;
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

#action {
  display: flex;
  align-items:center;
}
</style>
