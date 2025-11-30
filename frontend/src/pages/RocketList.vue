<template>
    <div>
        <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
            <!-- <input v-model="q" placeholder="Search rockets..." /> -->
            <router-link to="/add">Add Rocket</router-link>
        </div>


        <RocketFilter @update="onFilter" />


        <div v-if="store.loading">Loading...</div>
        <div v-else-if="store.error">
            <div>Error: {{ store.error }}</div>
            <button @click="store.fetchAll">Retry</button>
        </div>
        <div v-else>
            <div v-if="store.all.length === 0">No rockets found.</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:12px">
                <RocketCard v-for="r in store.all" :key="r.id" :rocket="r" />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRocketStore } from '../store/rockets'
import RocketCard from '../components/RocketCard.vue'
import RocketFilter from '../components/RocketFilter.vue'


export default {
    components: { RocketCard, RocketFilter },
    setup() {
        const store = useRocketStore()
        const q = ref(store.query)


        onMounted(() => {
            if (store.rockets.length === 0) store.fetchAll()
        })


        watch(q, (v) => store.setQuery(v))


        function onFilter(payload: any) {
            // placeholder: RocketFilter emits search string
            store.setQuery(payload)
        }


        return { store, q, onFilter }
    }
}
</script>