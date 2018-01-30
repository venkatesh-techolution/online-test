/* eslint-disable */

import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_USER = 'UPDATE_USER';
const EXAM_TYPES = 'EXAM_TYPES';
const QUESTIONS_LIST = 'QUESTIONS_LIST';
const UPDATE_AUTH = 'UPDATE_AUTH';

const apiUrl = 'http://192.168.1.20:3000'

const store = () => new Vuex.Store({
    state: {
        user: {},
        examTypes: [],
        questionsList: [],
        isAuthenticated: false
    },
    mutations: { 
        [UPDATE_USER] (state, user) {
            state.user = user;
        },
        [EXAM_TYPES] (state, types) {
            state.examTypes = types;
        },
        [QUESTIONS_LIST] (state, questionsList) {
            state.questionsList = questionsList;
        },
        [UPDATE_AUTH] (state, flag) {
            state.isAuthenticated = flag;
        }
    },
    actions: {
        async updateTypes({commit}) {
            commit(EXAM_TYPES, await getTypes());
        },
        async updateUser({commit}, user) {
            commit(UPDATE_USER , await saveUser(user));
        },
        async updateQuestions({commit}, type) {
            commit(QUESTIONS_LIST, await getQuestions(type));
        },

        async updateAuth({commit}) {
            commit(UPDATE_AUTH, true)
        }
    }
})

function saveUser(user) {
    return axios.post(`${apiUrl}/users`, user)
      .then(res => res.data.result)
      .catch(e => {
        console.log(`Error while saving ${e}`);
        return e;
      })
}

function getTypes() {
    return axios.get(`${apiUrl}/types`)
      .then(res => res.data.result)
      .catch((err) => {
        console.log('error ', err);
        return err;
      })
}

function getQuestions(type) {
    return axios.get(`${apiUrl}/types/${type}`)
      .then((res) => res.data.result)
      .catch((err) => {
        console.log('error ', err);
        return err;
      })
}

export default store;
