import axios from "axios";
const url = 'http://localhost:5000/api/timelines';

export default class APIT {
    // to get all the event from the server
    static async getAllEvents(){
        const res = await axios.get(url);
        return res.data;
    }
    // to get single event by id
    static async getEventByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to get all the timeline from the server
    static async getAllTimelines(){
        const res = await axios.get(url);
        return res.data;
    }
    // to insert timeline into database
    static async addTimeline(timeline){
        const res = await axios.post(url, timeline);
        return res.data;
    }
    // to delete a timeline
    static async deleteTimeline(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
