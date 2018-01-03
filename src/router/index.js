import Vue from 'vue'
import Router from 'vue-router'
import DealerFileDetail from '@/components/DealerFileDetail'
//import ContractLogPage from '@/components/ContractLogPage'
import DealerAssessmentPage from '@/components/DealerAssessmentPage'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/DealerFileDetail/:dealerId',
            name: 'DealerFileDetail',
            component: DealerFileDetail
        }, {
            path: '/DealerAssessmentPage',
            name: 'DealerAssessmentPage',
            component: DealerAssessmentPage
        }
        // , {
        //     path: '/ContractLogPage',
        //     name: 'ContractLogPage',
        //     component: ContractLogPage
        // }
    ]
})