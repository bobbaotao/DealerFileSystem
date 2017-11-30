<template>
  <div class="divContainer">
      <el-row>
          <el-col :span="12" :offset="1">
              <el-button size="tiny" v-on:click="handleSave" v-if="isInEdit">Save</el-button>
              <el-button size="tiny" v-on:click="handleEdit" v-else>Edit</el-button>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="22" :offset="1">
              <BasicInfo ref="refBasicInfo" :picData="picUserInfo" :isEdit="isInEdit" :basicInfoData="basicInfo"></BasicInfo>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="22" :offset="1">
              <AchievementList :dealerID="dealerId" :achListData="achList" :isAllowEdit="true"></AchievementList>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import Utility from '../utility/index';
import BasicInfo from './BasicInfo';
import AchievementList from './AchievementList';
import { Loading } from 'element-ui';

export default {
    name: "DealerFileDetail",
    data() {
        return {
            dealerId: '',
            isNew: false,
            isInEdit: false,
            basicInfo: null,
            achList: null,
            companyList: null,
            contractList: null,
            fileList: null,
            picUserInfo: null
        }
    },
    components: {BasicInfo, AchievementList},
    watch: {
        '$route' (to, from) {
            if(this.$route.params && this.$route.params.dealerId) {
                this.dealerId = this.$route.params.dealerId;
                this.LoadDFDetailFromServer();
            } else {
                this.$message.error("Dealer id is null!");
            }
        }
    },
    created: function() {
            if(this.$route.params && this.$route.params.dealerId) {
                this.dealerId = this.$route.params.dealerId;
                this.LoadDFDetailFromServer();
            } else {
                this.$message.error("Dealer id is null!");
            }
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        LoadDFDetailFromServer: function() {
            //TODO
            var requestUrl = Utility.dfServiceUrl + "/LoadDealerFileDetail/" + this.dealerId;
            this.ShowLoadingView()

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadDealerFileDetailResult 
                    && response.data.LoadDealerFileDetailResult.Status == "success")
                {
                    var responseData = response.data.LoadDealerFileDetailResult.Data;

                    this.basicInfo = responseData.dfBasicInfo;
                    this.achList = responseData.dfAchievementList;
                    this.companyList = responseData.dfCompanyInfoList;
                    this.contractList = responseData.dfContractList;
                    this.fileList = responseData.dfFileAttachList;
                    this.picUserInfo = responseData.userInfoOfPIC;

                } else if(response.data && response.data.LoadDealerFileDetailResult) {
                    this.$message.error(response.data.LoadDealerFileDetailResult.Message);
                } else {
                    this.$message.error(response.message);
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });
        },
        saveBasicInfoToServer: function(data) {
            var requestUrl = Utility.dfServiceUrl + "/SaveBasicInfo";
            var requestData = {
                basicInfodata: data
            };
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();
                
                if(response.data && response.data.SaveBasicInfoResult && 
                    response.data.SaveBasicInfoResult.Status == "success") {
                    this.$message("Save Success!");
                } else if(response.data && response.data.SaveBasicInfoResult) {
                    this.$message.error(response.data.SaveBasicInfoResult.Message);
                } else {
                    this.$message.error(response.message);
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });
        },
        handleEdit: function() {
            this.isInEdit = true;
        },
        handleSave: function() {
            this.isInEdit = false;
            
            var requestData = this.$refs.refBasicInfo.buildServerBasicInfoData();
            this.picUserInfo = this.$refs.refBasicInfo.PersonInCharge;

            this.saveBasicInfoToServer(requestData);
        }
    }
}
</script>

<style scoped>
.divContainer
{
    text-align: left;
}
</style>
