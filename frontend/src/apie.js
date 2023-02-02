import axios from "axios";
const url = 'http://localhost:5000/api/events';

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
    static async getEventByDate(created){
        const res = await axios.get(`${url}/date/${created}`);
        return res.data;
    }
    // to insert event into database
    static async addEvent(event){
        const res = await axios.post(url, event);
        return res.data;
    }
    // to update event into database
    static async updateEvent(id, event){
        const res = await axios.patch(`${url}/${id}`, event);
        return res.data;
    }
    // to delete a event
    static async deleteEvent(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
