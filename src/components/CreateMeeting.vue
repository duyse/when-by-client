<template>
    <div className="container">
        <p>Give your meeting a name!</p>
        <input type="text" class="input" id="meetingName" placeholder="Name your meeting" v-model="createMeetingRequest.meetingName"/>
        <br/>
        <br/>
        <p>What date would you like to meet?</p>
        <input type="date" id="meetingDate" v-model="createMeetingRequest.meetingDate"/>
        <br/>
        <br/>
        <p>What time would you like to meet?</p>
        <input type="time" id="startTime" v-model="createMeetingRequest.startTime"/>
        <p>to</p>
        <input type="time" id="endTime" v-model="createMeetingRequest.endTime"/>
        <br/>
        <br/>
        <button type="submit" class="submit-btn" @click="create">Create Meeting</button>
    </div>
</template>

<script>
import '../assets/styles/createMeeting.css'
import {createMeeting} from "../apis/create";
export default {
    name: "createMeeting",
    data() {
        return {
            createMeetingRequest: {
                meetingName:"",
                meetingDate:"",
                startTime:"",
                endTime:"",
            },
            userId: 0,
        }
    },
    methods: {
        retrieveAccount() {
            const id = localStorage.getItem('id');
            this.userId = id;
            console.log("UserId: " + this.userId)
        },

        formatDate(date) {
            const options = { 
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true, };
                const formattedDate = new Intl.DateTimeFormat('en', options).format(date);

                const dateParts = formattedDate.split(', ');
                const [datePart, timePart] = dateParts;

                const [month, day, year] = datePart.split('/');
                const [time, ampm] = timePart.split(' ');

                return `${day}-${month}-${year} ${time} ${ampm}`;
        },
        async create(event) {
                event.preventDefault();
                console.log("user id: " + this.userId)
                
                const startDate = new Date(this.createMeetingRequest.meetingDate + 'T' + this.createMeetingRequest.startTime);
                const endDate = new Date(this.createMeetingRequest.meetingDate + 'T' + this.createMeetingRequest.endTime);
                console.log("time: " + this.formatDate(startDate))

                const meetingData = {
                    name: this.createMeetingRequest.meetingName,
                    startTime: this.formatDate(startDate),
                    endTime: this.formatDate(endDate)
                };

                try {
                    const response = await createMeeting(this.userId, meetingData);
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }
        },
    mounted() {
        this.retrieveAccount();
    },
}

</script>

<style scoped></style>