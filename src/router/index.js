import Vue from 'vue'
import Router from 'vue-router'
import DealerFileDetail from '@/components/DealerFileDetail'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/DealerFileDetail/:dealerId',
        name: 'DealerFileDetail',
        component: DealerFileDetail
    }]
})