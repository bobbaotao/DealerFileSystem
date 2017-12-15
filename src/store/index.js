import Vue from 'vue'
import Vuex from 'vuex'
var array = require('array');

Vue.use(Vuex)

const state = {
    attachmentList: null
}

const mutations = {
    initAttList(state, attDatas) {
        if (attDatas != null && attDatas.length > 0) {
            var attArr = new array();

            attDatas.forEach(item => {
                attArr.push(item);
            });
            state.attachmentList = attArr;
        }
    },
    addAtt(state, newAtt) {
        if (newAtt) {
            state.attachmentList.push(newAtt);
        }
    }
}

const getters = {
    loadAttInfoByID: (state, getters) => (id) => {
        return state.attachmentList.find((item) => item.id.toString() == id);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})