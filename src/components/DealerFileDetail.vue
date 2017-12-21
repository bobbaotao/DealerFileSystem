<template>
  <div class="divContainer">
      <el-row >
          <el-col :span="12" :offset="1">
              <el-button size="tiny" v-on:click="handleSave" v-if="isInEdit">Save</el-button>
              <el-button size="tiny" v-on:click="handleEdit" v-else>Edit</el-button>
          </el-col>
      </el-row>
      <el-row  class="SectionTitle">
          <el-col :span="22" :offset="1">
              <BasicInfo ref="refBasicInfo" :picData="picUserInfo" :isEdit="isInEdit" :basicInfoData="basicInfo"></BasicInfo>
          </el-col>
      </el-row>
      <el-row  class="SectionTitle">
          <el-col :span="22" :offset="1">
              <AchievementList v-on:reloadAchList="loadAchievementListFromServer" :dealerID="dealerId" 
              :achListData="achList" :isAllowEdit="true"></AchievementList>
          </el-col>
      </el-row>
       <el-row class="SectionTitle">
          <el-col :span="22" :offset="1">
              <ContractLogList v-on:reloadContractList="loadContractLogListFromServer" :dealerID="dealerId" 
              :contractListData="contractList" :isAllowEdit="true"></ContractLogList>
          </el-col>
      </el-row>
      <el-row class="SectionTitle">
          <el-col :span="22" :offset="1">
              <CompanyInfoList v-on:ReloadCompanyList="loadCompanyInfoListFromServer" :dealerID="dealerId" 
              :CompanyInfoDatas="companyList" :isAllowEdit="true" v-on:ReloadAttList="">
              </CompanyInfoList>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import Utility from '../utility/index';
import BasicInfo from './BasicInfo';
import AchievementList from './AchievementList';
import ContractLogList from './ContractLogList';
import CompanyInfoList from './CompanyInfoList';
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
    components: {BasicInfo, AchievementList,ContractLogList,CompanyInfoList},
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

                    this.$store.commit('initAttList',responseData.dfFileAttachList);
                    this.$store.commit('setSignCount', this.contractList? this.contractList.length : 0);

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
        },
        loadAchievementListFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadAchievementList/" + this.dealerId;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadAchievementListResult 
                    && response.data.LoadAchievementListResult.Status == "success") {
                        this.achList = response.data.LoadAchievementListResult.Data;
                    } else if(response.data && response.data.LoadAchievementListResult) {
                        this.$message.error(response.data.LoadAchievementListResult.Message)
                    } else {
                        this.$message.error("load achievement history list failed!");
                    }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });
        },
        loadContractLogListFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadContractList/" + this.dealerId;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadContractListResult 
                    && response.data.LoadContractListResult.Status == "success") {
                        this.contractList = response.data.LoadContractListResult.Data;
                        this.$store.commit('setSignCount', this.contractList ? this.contractList.length : 0);
                        //this.basicInfo.
                    } else if(response.data && response.data.LoadContractListResult) {
                        this.$message.error(response.data.LoadContractListResult.Message)
                    } else {
                        this.$message.error("load Contract list failed!");
                    }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });
        },
        loadCompanyInfoListFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadCompanyInfoList/" + this.dealerId;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadCompanyInfoListResult 
                && response.data.LoadCompanyInfoListResult.Status == "success") {
                    this.companyList = response.data.LoadCompanyInfoListResult.Data;
                } else if(response.data && response.data.LoadCompanyInfoListResult) {
                    this.$message.error(response.data.LoadCompanyInfoListResult.Message);
                } else {
                    this.$message.error("Load company list failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });
        },
        LoadAttListFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadAttList/" + this.dealerId;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadAttListResult 
                && response.data.LoadAttListResult.Status == "success") {
                    this.fileList  = response.data.LoadAttListResult.Data;
                    this.$store.commit('initAttList',response.data.LoadAttListResult.Data);
                } else if(response.data && response.data.LoadAttListResult) {
                    this.$message.error(response.data.LoadAttListResult.Message);
                } else {
                    this.$message.error("Load company list failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });
        }
    }
}
</script>

<style scoped>
.divContainer
{
    text-align: left;
}
.SectionTitle 
{
    margin-top: 15px;
}
</style>
