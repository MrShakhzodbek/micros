<template>
    <div class="documents">
        <FormDocuments :id="id" @edit="handleEdit"/>
        <TableDocuments @edit="handleEdit"/>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :page-size="10"
            :total="documentsCount"
            @current-change="handleCurrentPage"
        />
    </div>
</template>

<script setup lang="ts">
import FormDocuments from '@/components/documents/FormDocuments.vue';
import TableDocuments from '@/components/documents/TableDocuments.vue';
import { documentsStore } from '@/stores/documents';
import { onMounted,ref } from 'vue';
import { storeToRefs } from 'pinia';

const page = ref<number>(1)

const id = ref<number>(0)
const store = documentsStore()
const {documentsCount} = storeToRefs(store)
const handleEdit = (val:number)=>{
    id.value = val
}

const handleCurrentPage = (val:number)=>{
    page.value = val
    store.all_document(page.value, 10)
}

onMounted(() => {
    store.all_document(page.value, 10)
})
</script>

<style lang="scss" scoped>
.documents{
    max-width: 1200px;
    margin: auto
}
</style>