<template>
  <div>
    <el-row>
      <el-col style="text-align:left">
        <el-autocomplete style="width:250px"
            v-model="selectedUser" :disabled="!isEdit"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名，账号或者Title"
            @select="handleSelect" :valueKey="acProps"
            icon="check" :on-icon-click="checkName">
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        {{searchMessage}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import utility from '../utility/index';

  export default {
    name: 'ZeissPeoplePicker',
    data() {
      var CancelToken = this.axios.CancelToken;
      var source = CancelToken.source();
      return {
        userAccount:'',
        username: '',
        email: '',
        selectedUser: '',
        axiosCancelSource: source,
        searchMessage: '',
        acProps: 'label'
      }
    },
    props: ['userInitData','isEdit'],
    created: function() {
        this.resetUser(this.userInitData);
    },
    watch: {
        userInitData: function(newValue) {
            this.resetUser(newValue);
        }  
    },
    methods: {
        resetUser: function(data) {
            if(data) {
                this.userAccount = data.Account;
                this.username = data.UserName;
                this.email = data.Email;
                this.selectedUser = data.UserName;
            } else {
                this.userAccount = '';
                this.username = '';
                this.email = '';
                this.selectedUser = '';
            }
        },
        querySearchAsync: function(queryString, cb) {
            this.axiosCancelSource.cancel();
            if(queryString == null || queryString == '') {
            return;
            }
            var requestUrl = utility.cdServiceUrl + "/SearchUser/" + queryString;

            this.axios.post(requestUrl).then((response) => {
            if(response.data && response.data.SearchUserResult && response.data.SearchUserResult.Data) {
                cb(response.data.SearchUserResult.Data);
            }
            }).catch((error) => {

            });

        },
        handleSelect: function(item) {
            this.userAccount = item.value;
            this.email = item.email;
            this.username = item.userName;
        },
        checkName: function() {
            this.axiosCancelSource.cancel();
            if(this.selectedUser == null || this.selectedUser == '') {
            return;
            }
            var requestUrl = utility.cdServiceUrl + "/SearchUser/" + this.selectedUser;

            this.axios.post(requestUrl).then((response) => {
            if(response.data && response.data.SearchUserResult && response.data.SearchUserResult.Data) {
                if(response.data.SearchUserResult.Data.length == 0)
                {
                this.searchMessage ="找不到用户";
                } else if(response.data.SearchUserResult.Data.length > 1)
                {
                this.searchMessage ="存在多个用户";
                } else {
                this.selectedUser = response.data.SearchUserResult.Data[0].userName;
                this.handleSelect(response.data.SearchUserResult.Data[0]);
                }
            }
            }).catch((error) => {

            });
        }
    }

  }
</script>

<style scoped>
</style>
