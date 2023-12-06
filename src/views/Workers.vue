<template>
    <div class="workers">
        <FormWorkers :id="id" @edit="handleEdit"/>
        <TableWorkers @edit="handleEdit"/>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :page-size="10"
            :total="caregoryCount"
            @current-change="handleCurrentPage"
        />
    </div>
</template>

<script setup lang="ts">
import FormWorkers from '../components/workers/FormWorkers.vue'
import TableWorkers from '../components/workers/TableWorkers.vue'
import { categoryStore } from '@/stores/category';
import { onMounted,ref } from 'vue';
import { storeToRefs } from 'pinia';


const page = ref<number>(1)

const id = ref<number>(0)
const store = categoryStore()
const {caregoryCount} = storeToRefs(store)
const handleEdit = (val:number)=>{
    id.value = val
}

const handleCurrentPage = (val:number)=>{
    page.value = val
    store.all_category(page.value, 10)
}

onMounted(() => {
    store.all_category(page.value, 10)
})

</script>

<style lang="scss" scoped>
.workers{
    max-width: 1200px;
    margin: auto
}
</style>