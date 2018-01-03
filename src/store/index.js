import Vue from 'vue'
import Vuex from 'vuex'
var array = require('array');

Vue.use(Vuex)

const state = {
    attachmentList: null,
    signCount: 0,
    assessmentList: null
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
    setSignCount(state, newCount) {
        state.signCount = newCount;
    },
    addAtt(state, newAtt) {
        if (newAtt) {
            state.attachmentList.push(newAtt);
        }
    },
    initAssessmentScoreList(state, assessmentList) {
        var asmtList = new array();
        if (assessmentList != null && assessmentList.length > 0) {
            assessmentList.forEach(item => {
                asmtList.push(item);
            });
        }
        state.assessmentList = asmtList.toArray();
    }
}

const getters = {
    loadAttInfoByID: (state, getters) => (id) => {
        return state.attachmentList.find((item) => item.id.toString() == id);
    },
    loadAssessmentByYear: (state, getters) => (year) => {
        return state.assessmentList.find((item) => item.Year == year);
    },
    loadAssessmentASScoreByYear: (state, getters) => (year) => {
        var assessmentItem = state.assessmentList.find((item) => item.Year == year);
        if (assessmentItem) {
            return assessmentItem.Overall_AS;
        }
        return null;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})