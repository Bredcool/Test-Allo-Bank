import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Rocket } from '../types/Rocket'
import * as api from '../api/rockets'


export const useRocketStore = defineStore('rockets', () => {
    const rockets = ref<Rocket[]>([])
    const localRockets = ref<Rocket[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const query = ref('')


    const all = computed(() => {
        const merged = [...rockets.value, ...localRockets.value]
        if (!query.value) return merged
        return merged.filter(r => r.name.toLowerCase().includes(query.value.toLowerCase()))
    })


    async function fetchAll() {
        loading.value = true
        error.value = null
        try {
            const data = await api.fetchRockets()
            rockets.value = data
        } catch (e) {
            error.value = 'Failed to fetch rockets'
        } finally {
            loading.value = false
        }
    }


    function getById(id: string) {
        return [...rockets.value, ...localRockets.value].find(r => r.id === id) || null
    }


    function addRocket(payload: Partial<Rocket>) {
        const newRocket: Rocket = {
            id: `local-${Date.now()}`,
            name: payload.name || 'Untitled',
            description: payload.description || '',
            flickr_images: payload.flickr_images || [],
            country: payload.country || 'Unknown',
            first_flight: payload.first_flight || new Date().toISOString().slice(0, 10),
            cost_per_launch: payload.cost_per_launch || 0
        }
        localRockets.value.unshift(newRocket)
        return newRocket
    }


    function setQuery(q: string) { query.value = q }


    return { rockets, localRockets, loading, error, all, fetchAll, getById, addRocket, setQuery, query }
})