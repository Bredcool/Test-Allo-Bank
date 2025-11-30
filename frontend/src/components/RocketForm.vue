<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["submit"]);

const name = ref("");
const description = ref("");          // ← DESCRIPTION
const country = ref("");
const cost = ref("");                 // ← COST
const imageUrl = ref("");
const previewUrl = ref("");

watch(imageUrl, (val) => {
    previewUrl.value = val || "";
});

function handleSubmit() {
    emit("submit", {
        name: name.value,
        description: description.value,         // ← include
        country: country.value,
        cost_per_launch: Number(cost.value) || 0, // ← convert number
        flickr_images: [imageUrl.value],        // array seperti API
    });

    // Reset form
    name.value = "";
    description.value = "";
    country.value = "";
    cost.value = "";
    imageUrl.value = "";
    previewUrl.value = "";
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6 max-w-lg mx-auto mt-10">

        <!-- ROCKET NAME -->
        <div>
            <label class="block mb-1 font-bold">Rocket Name</label>
            <input
                v-model="name"
                type="text"
                placeholder="e.g. Falcon Heavy"
                class="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            />
        </div>

        <!-- DESCRIPTION -->
        <div>
            <label class="block mb-1 font-bold">Description</label>
            <textarea
                v-model="description"
                placeholder="Rocket description..."
                rows="3"
                class="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            ></textarea>
        </div>

        <!-- COUNTRY -->
        <div>
            <label class="block mb-1 font-bold">Country</label>
            <input
                v-model="country"
                type="text"
                placeholder="e.g. USA"
                class="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            />
        </div>

        <!-- COST -->
        <div>
            <label class="block mb-1 font-bold">Cost Per Launch ($)</label>
            <input
                v-model="cost"
                type="number"
                placeholder="e.g. 90000000"
                class="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            />
        </div>

        <!-- IMAGE URL -->
        <div>
            <label class="block mb-1 font-bold">Image URL</label>
            <input
                v-model="imageUrl"
                type="text"
                placeholder="https://example.com/rocket.jpg"
                class="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            />
        </div>

        <!-- IMAGE PREVIEW -->
        <div v-if="previewUrl" class="mt-3">
            <p class="font-semibold mb-2">Preview:</p>
            <img
                :src="previewUrl"
                alt="Preview"
                class="w-full max-h-60 object-contain rounded border"
                @error="previewUrl = ''"
            />
        </div>

        <!-- SUBMIT -->
        <button
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
        >
            Add Rocket
        </button>
    </form>
</template>

<style scoped></style>
