var moment = require('moment');
var array = require('array');

module.exports = {
    defaultDateFormat: 'YYYY-MM-DD',
    dfServiceUrl: '/_vti_bin/Zeiss.SpotDealer/DealerFileService.svc',
    fileServiceUrl: '../FileHandler.ashx',
    cdServiceUrl: "/_vti_bin/Zeiss.SpotDealer/DealerService.svc", //contract dealer svc url 
    grSplitkey: '#befaa348-78c1-4d67-b15d-bd6caa342b80#', //this is a key for split the gr in contract
    formatDateToString: function(dateObj) {
        if (dateObj == null) {
            return "";
        }
        if (moment.isDate(dateObj)) {
            var mData = moment(dateObj);
            return mData.format(this.defaultDateFormat);
        } else if (dateObj.indexOf('/Date(') > -1) {
            var i = dateObj.indexOf('+');
            var dateNum = new Number(dateObj.substring(6, i));
            var mData;
            //if (i == 16) {
            //    mData = moment.unix(dateNum)
            //} else {
            mData = moment(dateNum);
            //}
            return mData.format(this.defaultDateFormat);
        }
        return "";
    },
    formatDateToServerObj: function(data) {
        var fsDate = null;
        var mDate = moment(data);
        if (mDate.isValid()) {
            fsDate = "/Date(" + mDate.valueOf() + ")/";
        }
        return fsDate;
    },
    loadYearSelectList: function() {
        yearArr = new array();

        for (var i = 1; i > -9; i--) {
            curYearNum1 = (moment().year() + i) % 100;
            curYearNum2 = (moment().year() + i + 1) % 100;
            curYearNum1 = curYearNum1 > 9 ? curYearNum1.toString() : "0" + curYearNum1;
            curYearNum2 = curYearNum2 > 9 ? curYearNum2.toString() : "0" + curYearNum2;
            var itemText = "FY" + curYearNum1 + "/" + curYearNum2;
            yearArr.push({
                label: itemText,
                value: (moment().year() + i).toString()
            });
        }

        return yearArr.toArray();
    },
    getFYText: function(data) {
        var i = new Number(data);
        curYearNum1 = i % 100;
        curYearNum2 = (i + 1) % 100;
        curYearNum1 = curYearNum1 > 9 ? curYearNum1.toString() : "0" + curYearNum1;
        curYearNum2 = curYearNum2 > 9 ? curYearNum2.toString() : "0" + curYearNum2;
        var itemText = "FY" + curYearNum1 + "/" + curYearNum2;
        //var itemText = "FY" + (i - 1) + "/" + i;
        return itemText;
    },
    getPastedFYText: function(data, index) {
        var i = new Number(data);
        return this.getFYText(i - index);
    },
    loadContractTypeList: function() {
        return [{
            label: "经销商协议 Dealer Agreement",
            value: "DealerAgreement"
        }, {
            label: "经销商考察期协议 Dealer Probation Agreement",
            value: "DealerProbationAgreement"
        }];
    },
    loadBUList: function() {
        return [{
            label: "MED",
            value: "MED"
        }, {
            label: "IMT",
            value: "IMT"
        }, {
            label: "MIK",
            value: "MIK"
        }, {
            label: "Vision",
            value: "Vision"
        }];
    },
    loadRecommendedList: function() {
        return [{
            label: "达标, 续签下一年经销商协议",
            value: "Archived"
        }, {
            label: "未达标, 不再续约",
            value: "NotArchived"
        }, {
            label: "未完成全年任务60%, 给予半年考察期",
            value: "Over60"
        }];
    },
    loadDefaultRecommendText: function(status) {
        switch (status) {
            case "Archived":
                return "续签下一年经销商协议";
            case "NotArchived":
                return "不再续约";
            case "Over60":
                return "给予半年考察期";
            default:
                return "";
        }
    },
    loadSTUnitList: function() {
        return [{
            label: "元",
            value: "RMB"
        }, {
            label: "台",
            value: "TAI"
        }, {
            label: "个",
            value: "GE"
        }]; //meicuo, wo jiushi wenmang!
    },
    formatToUnitText: function(value) {
        switch (value) {
            case "RMB":
                return "元";
            case "TAI":
                return "台";
            case "GE":
                return "个";
            default:
                return value;
        }
    },
    loadDealerRegionList: function() {
        return [{
            label: "Dental",
            value: "Dental"
        }, {
            label: "MCS_East",
            value: "MCS_East"
        }, {
            label: "MCS_Middle",
            value: "MCS_Middle"
        }, {
            label: "MCS_NorthCentral",
            value: "MCS_NorthCentral"
        }, {
            label: "MCS_Northeast",
            value: "MCS_Northeast"
        }, {
            label: "MCS_South",
            value: "MCS_South"
        }, {
            label: "MCS_Southwest",
            value: "MCS_Southwest"
        }, {
            label: "OPH_East",
            value: "OPH_East"
        }, {
            label: "OPH_North",
            value: "OPH_North"
        }, {
            label: "OPH_Southwest",
            value: "OPH_Southwest"
        }, {
            label: "National",
            value: "National"
        }, {
            label: "Service",
            value: "Service"
        }];
    },
    buildServerData_BasicInfo: function(data) {
        var fsDate = this.formatDateToServerObj(data.First_SignDate);
        var srValue = data.SalesRegionList.join(";");
        var result = {
            Appointed_Products: data.Appointed_Products,
            DealerAddress: data.DealerAddress,
            DealerStatus: data.DealerStatus,
            Distribution_Area: data.Distribution_Area,
            Exceptions_Hospital: data.Exceptions_Hospital,
            First_SignDate: fsDate,
            IsDeleted: data.IsDeleted,
            PersonInChargeAccount: data.PersonInChargeAccount,
            Remark: data.Remark,
            SalesProductType: data.SalesProductType,
            SalesRegion: srValue,
            Sign_Times: data.Sign_Times,
            dealerCode: data.dealerCode,
            dealerName_CN: data.dealerName_CN,
            dealerName_EN: data.dealerName_EN,
            dealerName_Other: data.dealerName_Other,
            dealerRegion: data.dealerRegion,
            dealer_id: data.dealer_id,
            salesTarget: data.salesTarget
        }
        return result;
    }

}