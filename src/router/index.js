import Vue from 'vue'
import Router from 'vue-router'
import DealerFileDetail from '@/components/DealerFileDetail'
import ContractLogPage from '@/components/ContractLogPage'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/DealerFileDetail/:dealerId',
        name: 'DealerFileDetail',
        component: DealerFileDetail
    }, {
        path: '/ContractLogPage',
        name: 'ContractLogPage',
        component: ContractLogPage
    }]
})