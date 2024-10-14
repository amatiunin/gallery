import { createRouter, createWebHistory } from 'vue-router'
import GalleryComponent from './components/GalleryComponent.vue'

const routes = [
    {
        path: '/:imageIndex?',
        name: 'Gallery',
        component: GalleryComponent,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router