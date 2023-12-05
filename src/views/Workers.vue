<template>
    <div class="workers">
        <FormWorkers/>
        <TableWorkers/>
    </div>
</template>

<script setup lang="ts">
import FormWorkers from '../components/workers/FormWorkers.vue'
import TableWorkers from '../components/workers/TableWorkers.vue'
import { categoryStore } from '@/stores/category';
import { onMounted } from 'vue'

;
const store = categoryStore()

onMounted(() => {
    store.all_category()
})

</script>

<style lang="scss" scoped>
.workers{
    max-width: 1200px;
    margin: auto
}
</style>