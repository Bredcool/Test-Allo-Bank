import { createRouter, createWebHistory } from 'vue-router'

import RocketList from '../pages/RocketList.vue'
import RocketDetail from '../pages/RocketDetail.vue'
import AddRocket from '../pages/AddRocket.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: RocketList },
        { path: '/rocket/:id', component: RocketDetail },
        { path: '/add', component: AddRocket },
    ]
})

export default router
