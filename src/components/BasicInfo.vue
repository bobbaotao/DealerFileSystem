<template>
    <div class="divContainer">
        <el-row class="SectionTitle" >
            <el-col>
                <span v-on:click="isHide = !isHide" style="padding-left:20px">
                    Dealer Information / 经销商基本信息
                </span>
            </el-col>
        </el-row>
        <el-row v-if="!isHide">
            <el-col>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Dealer Name<br />
                        经销商全名
                    </el-col>
                    <el-col :span="12">
                        <el-row class="smallRow">
                            <el-col :span="2">
                                EN:
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="dealerName_EN"  :disabled="!isEdit" size="mini"></el-input>
                            </el-col>
                        </el-row>
                        <el-row class="smallRow">
                            <el-col :span="2">
                                CN:
                            </el-col>
                            <el-col  :span="20">
                                <el-input v-model="dealerName_CN"  :disabled="!isEdit" size="mini"></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Dealer Code<br />
                        经销商编号
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="dealerCode" :disabled="!isEdit" size="mini"></el-input>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Sales Product Type<br />
                        负责产品类型
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="SalesProductType"  :disabled="!isEdit" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Dealer Address<br />
                        经销商地址
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="DealerAddress" :disabled="!isEdit" size="mini"></el-input>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Status<br />
                        经销商状态
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="DealerStatus" :disabled="!isEdit">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Person in Charge<br />
                        销售负责人
                    </el-col>
                    <el-col :span="8">
                        <ZeissPeoplePicker ref="picPicker" :isEdit="isEdit" v-bind:userInitData="PersonInCharge"></ZeissPeoplePicker>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Sales Region<br />
                        销售区域
                    </el-col>
                    <el-col :span="8">
                        <!-- <el-input v-model="SalesRegion" :disabled="!isEdit" size="mini"></el-input> -->
                        <el-select :disabled="!isEdit" class="middleSelector" multiple v-model="SalesRegionList">
                          <el-option v-for="item in srOptions" :key="item.value" 
                            :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Other Company Name<br />
                        其他曾用名
                    </el-col>
                    <el-col :span="18">
                        <el-input v-model="dealerName_Other"  :disabled="!isEdit" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Dealer Region<br />
                        经销商区域
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="dealerRegion"  :disabled="!isEdit" size="mini"></el-input>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Sales Target<br />
                        销售目标
                    </el-col>
                    <el-col :span="6">
                        <el-input-number v-model="salesTarget" :step="10000"
                            :disabled="!isEdit" :min="0" size="mini"></el-input-number>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Appointed Products<br />
                        指定商品
                    </el-col>
                    <el-col :span="18"  class="colValue">
                        <el-input v-model="Appointed_Products"  type="textarea" :autosize="{ minRows: 2, maxRows: 9}"
                             :disabled="!isEdit"></el-input>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                        Distribution Area<br />
                        代理区域
                    </el-col>
                    <el-col :span="18"  class="colValue">
                        <el-input v-model="Distribution_Area" type="textarea" :autosize="{ minRows: 2, maxRows: 9}"
                            :disabled="!isEdit"></el-input>
                    </el-col>
                </el-row>
                <el-row class="middleRow">
                    <el-col class="colTitle" :span="4">
                       First Signature Date<br />
                        最初代理协议日期
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker v-model="First_SignDate"  :disabled="!isEdit" size="mini"
                            type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Signature Time<br />
                        签约次数
                    </el-col>
                    <el-col :span="6">
                        <el-input-number v-model="signCount" :disabled="true" :min="0" size="mini"></el-input-number>
                    </el-col>
                </el-row>
                <el-row class="miniRow">
                    <el-col class="colTitle" :span="4">
                        Remark<br />
                        备注说明
                    </el-col>
                    <el-col :span="18"  class="colValue">
                        <el-input v-model="Remark" :disabled="!isEdit" type="textarea" 
                        :autosize="{ minRows: 2, maxRows: 9}"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ZeissPeoplePicker from './ZeissPeoplePicker'
import Utility from '../utility/index'

export default {
  name: 'BasicInfo',
  data() {
      var srList = Utility.loadDealerRegionList();
      return {
            Appointed_Products: null,
            DealerAddress: null,
            DealerStatus: null,
            Distribution_Area: null,
            Exceptions_Hospital: null,
            First_SignDate: null,
            IsDeleted: false,
            PersonInChargeAccount: null,
            PersonInChargeName: null,
            PersonInCharge: null,   //userInfo class entity
            Remark: null,
            SalesProductType: null,
            SalesRegion: null,
            SalesRegionList: [],
            Sign_Times: null,
            dealerCode: null,
            dealerName_CN: null,
            dealerName_EN: null,
            dealerName_Other: null,
            dealerRegion: null,
            dealer_id: null,
            salesTarget: null,
            isHide: false,

            srOptions: srList,
            statusOptions: [{value: '考察期',label: '考察期'},
                      {value: '正式经销商暂不授权',label: '正式经销商暂不授权'},
                      {value: '正式经销商',label: '正式经销商'},
                      {value: '终止',label: '终止'}]

        }
    },
    props: ['basicInfoData','picData', 'isEdit'],
    components: {ZeissPeoplePicker},
    created: function() {
       //todo
    },
    watch: {
      basicInfoData: function(newValue) {
          this.setData(newValue);
      },
      picData: function(newValue) {
          this.setPICData(newValue);
      }  
    },
    computed: {
      signCount: function() {
          return this.$store.state.signCount;
      }  
    },
    methods: {
        setData: function(basicInfoData) {
            this.Appointed_Products = basicInfoData.Appointed_Products;
            this.DealerAddress = basicInfoData.DealerAddress;
            this.DealerStatus = basicInfoData.DealerStatus;
            this.Distribution_Area = basicInfoData.Distribution_Area;
            this.Exceptions_Hospital = basicInfoData.Exceptions_Hospital;
            this.First_SignDate = Utility.formatDateToString(basicInfoData.First_SignDate);
            this.IsDeleted = basicInfoData.IsDeleted;
            this.Remark = basicInfoData.Remark;
            this.SalesProductType = basicInfoData.SalesProductType;
            this.SalesRegion = basicInfoData.SalesRegion;
            this.Sign_Times = basicInfoData.Sign_Times;
            this.dealerCode = basicInfoData.dealerCode;
            this.dealerName_CN = basicInfoData.dealerName_CN;
            this.dealerName_EN = basicInfoData.dealerName_EN;
            this.dealerName_Other = basicInfoData.dealerName_Other;
            this.dealerRegion = basicInfoData.dealerRegion;
            this.dealer_id = basicInfoData.dealer_id;
            this.salesTarget = basicInfoData.salesTarget;
            this.PersonInChargeAccount = basicInfoData.PersonInChargeAccount;
            if(basicInfoData.SalesRegion && basicInfoData.SalesRegion != "") {
                this.SalesRegionList = basicInfoData.SalesRegion.split(";");
            }
        },
        setPICData: function(picData) {
            this.PersonInChargeName = picData.UserName;
            this.PersonInCharge = picData;
        },
        buildServerBasicInfoData: function() {
            this.PersonInChargeAccount = this.$refs.picPicker.userAccount;
            this.PersonInCharge = {
                Account:this.$refs.picPicker.userAccount,
                UserName:this.$refs.picPicker.username,
                Email:this.$refs.picPicker.email
            };
            this.Sign_Times = this.$store.state.signCount;
            var result = Utility.buildServerData_BasicInfo(this._data);
            return result;
        }
    }
}
</script>

<style scoped>
.divContainer {
    text-align: left;
    font-size: 14px;
    line-height: 20px;
}
.SectionTitle {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 15px;
    background-color: rgba(107, 145, 188);
    color: rgba(254, 254, 254);
}
.colTitle {
    padding-left: 10px;
}
.middleRow {
    padding: 5px 0px 5px 0px;
}
.smallRow {
    padding: 3px 0px 3px 0px;
}
.middleSelector {
    width: 250px;
}
.miniRow {
    padding: 3px 0px 3px 0px;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
}
</style>

