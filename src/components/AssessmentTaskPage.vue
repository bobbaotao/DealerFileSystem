<template>
    <div class="container">
        <el-row class="tinyRow">
            <!-- <el-col :span="4" :offset="2">
                <el-button size="small" v-on:click="returnToLastPage">Return</el-button>
            </el-col> -->
        </el-row>
        <el-row>
            <el-col :span="22" :offset="1">
                <DealerAssessmentPage :initData="assessmentDiaData" :refreshKey="refreshKey" :dealerID="dealerID"
                    v-on:close="returnToLastPage" :taskID="taskID">
                </DealerAssessmentPage>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DealerAssessmentPage from './DealerAssessmentPage';
import Utility from '../utility/index';
import { Loading } from 'element-ui';
var moment = require('moment');
var array = require('array');

export default {
    name: "AssessmentTaskPage",
    data () {
        return {
            refreshKey: -1,
            assessmentDiaData: null,
            dealerID: null,
            assessmentID: null,
            taskID: null
        }
    },
    components: {
        DealerAssessmentPage
    },
    watch: {
        '$route' (to, from) {
            this.initData();
        }
    },
    created () {
        this.initData();
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        returnToLastPage: function() {
            this.$router.go(-1);
        },
        initData: function() {
            if(this.$route.params && this.$route.params.dealerID 
            && this.$route.params.assessmentID  && this.$route.params.taskID) {
                this.dealerID = this.$route.params.dealerID;
                this.assessmentID = this.$route.params.assessmentID;
                this.taskID = this.$route.params.taskID;
                this.loadDataFromServer();
            } else {
                this.$message.error("params is null!");
            }
        },
        loadDataFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadAssessment/" + this.dealerID + "/" + this.assessmentID;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((rep) => {
                this.HideLoadingView();

                if(rep.data && rep.data.LoadAssessmentResult &&
                    rep.data.LoadAssessmentResult.Status == "success") {
                        this.assessmentDiaData = rep.data.LoadAssessmentResult.Data;
                        this.refreshKey = this.refreshKey + 1;
                    } else if(rep.data && rep.data.LoadAssessmentResult) {
                        this.$message.error(rep.data.LoadAssessmentResult.Message);
                    } else {
                        this.$message.error("Load assessment failed!");
                    }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Load assessment failed!");
            });
        }
    }
}
</script>

<style scoped>
.tinyRow {
    padding: 5px 0px 5px 0px;
    text-align: left;
}
</style>
