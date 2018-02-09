import Vue from 'vue'
import Router from 'vue-router'
import DealerFileDetail from '@/components/DealerFileDetail'
//import ContractLogPage from '@/components/ContractLogPage'
import DealerAssessmentPage from '@/components/DealerAssessmentPage'
import AssessmentTaskPage from '@/components/AssessmentTaskPage'
import AssessmentPrintView from '@/components/AssessmentPrintView'

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
        }, {
            path: '/AssessmentTaskPage/:dealerID/:assessmentID/:taskID',
            name: 'AssessmentTaskPage',
            component: AssessmentTaskPage
        }, {
            path: '/AssessmentPrintView/:dealerID/:assessmentID',
            name: 'AssessmentPrintView',
            component: AssessmentPrintView
        }
        // , {
        //     path: '/ContractLogPage',
        //     name: 'ContractLogPage',
        //     component: ContractLogPage
        // }
    ]
})