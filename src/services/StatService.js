import axios from 'axios';

import ENDPOINT from '../App.js';


// stats
const STAT = ENDPOINT + "/stat/";
const STAT_ADD = ENDPOINT + "/stat/add";
const STAT_DELETEBYID = ENDPOINT + "/stat/deleteById/";
const STAT_FINDBYID = ENDPOINT + "/stat/findById/";
const STAT_FINDBYNAME = ENDPOINT + "/stat/findByName/";
const STAT_LIST = ENDPOINT + "/stat/list";
const STAT_UPDATE = ENDPOINT + "/stat/update";

const headers = JSON.parse(localStorage.getItem('headers'))

class StatService {

    getStats() {
        return axios.get(STAT_LIST);
    }
    createStat(stat){
        return axios.post(STAT_ADD, stat, headers);
    }

    getStatById(statId){
        return axios.get(STAT_FINDBYID + '/' + statId, headers);
    }

    getStatByName(statName){
        return axios.get(STAT_FINDBYNAME + '/' + statName, headers);
    }

    updateStat(stat, statId){
        return axios.put(STAT_UPDATE + '/' + statId, stat, headers);
    }

    deleteStat(statId){
        return axios.delete(STAT_DELETEBYID + '/' + statId, headers);
    }

}
export default new StatService();