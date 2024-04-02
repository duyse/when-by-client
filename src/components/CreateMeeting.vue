<template>
    <div>
        <p>Give your meeting a name!</p>
        <input type="text" id="meetingName" placeholder="Name your meeting" v-model="createMeetingRequest.meetingName"/>
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
        <button type="submit" @click="create">Create Meeting</button>
    </div>
</template>

<script>
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
        async create(event) {
                event.preventDefault();
                console.log("user id: " + this.userId)

                const meetingData = {
                    name: this.createMeetingRequest.meetingName,
                    startTime: this.createMeetingRequest.meetingDate + ' ' + this.createMeetingRequest.startTime,
                    endTime: this.createMeetingRequest.meetingDate + ' ' + this.createMeetingRequest.endTime,
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