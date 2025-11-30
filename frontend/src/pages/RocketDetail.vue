<template>
    <div>
        <button @click="$router.back()">Back</button>
        <div v-if="loading">Loading...</div>
        <div v-else-if="!rocket">Not found</div>
        <div v-else>
            <h2>{{ rocket.name }}</h2>
            <img v-if="rocket.flickr_images?.[0]" :src="rocket.flickr_images[0]"
                style="width:100%; max-width:600px; object-fit:cover" />
            <p>{{ rocket.description }}</p>
            <div><strong>Country:</strong> {{ rocket.country || '—' }}</div>
            <div><strong>First Flight:</strong> {{ rocket.first_flight || '—' }}</div>
            <div><strong>Cost:</strong> {{ formatCurrency(rocket.cost_per_launch) }}</div>
        </div>
    </div>
</template>


<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRocketStore } from '../store/rockets'
import { fetchRocketById } from '../api/rockets'
import { formatCurrency } from '../utils/formatter'
import type { Rocket } from '../types/Rocket'


export default {
    setup() {
        const route = useRoute()
        const store = useRocketStore()
        const id = String(route.params.id)
        const rocket = ref<Rocket | null>(store.getById(id))
        const loading = ref(false)


        onMounted(async () => {
            if (!rocket.value) {
                loading.value = true
                rocket.value = await fetchRocketById(id)
                loading.value = false
            }
        })


        return { rocket, loading, formatCurrency }
    }
}
</script>