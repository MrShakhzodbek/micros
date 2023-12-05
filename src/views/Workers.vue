<template>
    <div class="workers">
        <FormWorkers :id="id" @edit="handleEdit"/>
        <TableWorkers @edit="handleEdit"/>
    </div>
</template>

<script setup lang="ts">
import FormWorkers from '../components/workers/FormWorkers.vue'
import TableWorkers from '../components/workers/TableWorkers.vue'
import { categoryStore } from '@/stores/category';
import { onMounted } from 'vue';
import {ref} from 'vue'

const id = ref<number>(0)
const store = categoryStore()

const handleEdit = (val:number)=>{
    id.value = val
}

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