<template>
    <div style="margin-bottom:12px; display:flex; gap:8px">
        <input v-model="q" placeholder="Search name..." @input="emitUpdate" />
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
    emits: ['update'],
    setup(_, { emit }) {
        const q = ref('')
        function emitUpdate() { emit('update', q.value) }
        return { q, emitUpdate }
    }
})
</script>