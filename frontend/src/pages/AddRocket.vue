<template>
    <div class="add-page">
        <button class="back" @click="$router.back()">← Back</button>

        <h2>Add Rocket</h2>

        <div v-if="success" class="toast success">
            Rocket berhasil ditambahkan — redirecting...
        </div>
        <div v-if="err" class="toast error">
            {{ err }}
        </div>

        <RocketForm @submit="onSubmit" :disabled="submitting" />

        <div v-if="preview" class="preview">
            <h3>Preview</h3>
            <div class="card">
                <img v-if="preview.flickr_images?.[0]" :src="preview.flickr_images[0]" alt="preview" />
                <h4>{{ preview.name }}</h4>
                <p>{{ preview.description }}</p>
                <div class="meta">
                    <span><strong>Country:</strong> {{ preview.country }}</span>
                    <span><strong>First Flight:</strong> {{ preview.first_flight }}</span>
                    <span><strong>Cost:</strong> {{ formatCurrency(preview.cost_per_launch) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import RocketForm from '../components/RocketForm.vue'
import { useRocketStore } from '../store/rockets'
import type { Rocket } from '../types/Rocket'
import { formatCurrency } from '../utils/formatter'

export default defineComponent({
    name: 'AddRocketPage',
    components: { RocketForm },
    setup() {
        const store = useRocketStore()
        const router = useRouter()
        const submitting = ref(false)
        const success = ref(false)
        const err = ref<string | null>(null)
        const preview = ref<Partial<Rocket> | null>(null)
        let redirectTimer: number | null = null

        function persistLocalRockets() {
            try {
                const local = store.localRockets ?? []
                // store.localRockets is a ref in Pinia; when serialized here it's already a reactive object
                // convert to plain array
                const arr = Array.isArray(local) ? local : []
                localStorage.setItem('localRockets', JSON.stringify(arr))
            } catch (e) {
                // ignore persistence error
                // we don't block the user for this
            }
        }

        function validatePayload(payload: any) {
            if (!payload || !payload.name || String(payload.name).trim().length === 0) {
                return 'Name is required'
            }
            return null
        }

        async function onSubmit(payload: any) {
            // show preview while validating
            preview.value = {
                name: payload.name,
                description: payload.description,
                flickr_images: payload.flickr_images,
                country: payload.country,
                first_flight: payload.first_flight,
                cost_per_launch: payload.cost_per_launch
            }

            const v = validatePayload(payload)
            if (v) {
                err.value = v
                // clear error after 3s
                setTimeout(() => (err.value = null), 3000)
                return
            }

            submitting.value = true
            err.value = null

            try {
                // add to Pinia store (local-only)
                // const added = store.addRocket(payload)
                store.addRocket(payload)

                // persist localRockets so it survives reload
                persistLocalRockets()

                success.value = true

                // auto-redirect after short delay (gives time to read toast)
                redirectTimer = window.setTimeout(() => {
                    router.push({ path: '/' })
                }, 1200)
            } catch (e) {
                err.value = (e as Error)?.message || 'Failed to add rocket'
            } finally {
                submitting.value = false
            }
        }

        // cleanup timer if user navigates away
        window.addEventListener('beforeunload', () => {
            if (redirectTimer) window.clearTimeout(redirectTimer)
        })

        return { onSubmit, submitting, success, err, preview, formatCurrency }
    }
})
</script>

<style scoped>
.add-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 12px;
}

.back {
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    margin-bottom: 8px;
    font-size: 14px;
}

.toast {
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 12px;
}

.toast.success {
    background: #e6ffed;
    color: #0b5e1e;
    border: 1px solid #baf3c6;
}

.toast.error {
    background: #ffecec;
    color: #8b0b0b;
    border: 1px solid #f6b1b1;
}

.preview {
    margin-top: 18px;
}

.card {
    border: 1px solid #eee;
    padding: 12px;
    border-radius: 8px;
}

.card img {
    width: 100%;
    max-height: 260px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 8px;
}

.meta {
    display: flex;
    gap: 12px;
    font-size: 13px;
    color: #444;
    margin-top: 8px;
}
</style>
