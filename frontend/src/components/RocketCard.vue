<template>
    <div style="border:1px solid #eee; padding:12px; border-radius:8px">
        <img v-if="img" :src="img" alt="rocket" style="width:100%; height:160px; object-fit:cover; border-radius:6px" />
        <h3 style="margin:8px 0">{{ rocket.name }}</h3>
        <div style="font-size:13px; color:#666">{{ short }}</div>
        <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center">
            <router-link :to="`/rocket/${rocket.id}`">View</router-link>
            <div style="font-size:12px">{{ rocket.country || '—' }}</div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { Rocket } from '../types/Rocket'


export default defineComponent({
    props: { rocket: { type: Object as () => Rocket, required: true } },
    setup(props) {
        const img = computed(() => props.rocket.flickr_images && props.rocket.flickr_images[0])
        const short = computed(() => (props.rocket.description || '').slice(0, 120) + (props.rocket.description && props.rocket.description.length > 120 ? '...' : ''))
        return { img, short }
    }
})
</script>