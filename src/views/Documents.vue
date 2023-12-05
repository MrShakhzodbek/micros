<template>
    <div class="documents">
        <FormDocuments :id="id" @edit="handleEdit"/>
        <TableDocuments @edit="handleEdit"/>
    </div>
</template>

<script setup lang="ts">
import FormDocuments from '@/components/documents/FormDocuments.vue';
import TableDocuments from '@/components/documents/TableDocuments.vue';
import { documentsStore } from '@/stores/documents';
import { onMounted } from 'vue';
import {ref} from 'vue'

const id = ref<number>(0)
const store = documentsStore()

const handleEdit = (val:number)=>{
    id.value = val
}

onMounted(() => {
    store.all_document()
})

</script>

<style lang="scss" scoped>
.documents{
    max-width: 1200px;
    margin: auto
}
</style>