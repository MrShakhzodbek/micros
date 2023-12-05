<template>
    <div class="table">
        <h4>Список документов</h4>
        <el-row :gutter="30">
            <el-table :data="filterTableData" style="width: 100%" :span="24">
                <el-table-column label="#" type="index" />
                <el-table-column label="Имя" prop="name" />
                <el-table-column label="Фамилия" prop="surname" />
                <el-table-column label="Отчество" prop="secondName" />
                <el-table-column label="Тип документа" prop="typeDocument" />
                <el-table-column label="Дата документ" prop="dateDocument">
                    <template #default="scope">
                        <div>
                            {{ new Date(scope.row.dateDocument).toDateString() }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Счет-фактурa" prop="typeInvoices" />
                <el-table-column label="Документ №" prop="numberDocument" />
                <el-table-column label="Описание" prop="description" />
                <el-table-column align="right">
                    <template #header>
                        <el-input style="width: 100%;" v-model="search" size="large" placeholder="Type to search" />
                    </template>
                    <template #default="scope" width="100%">
                        <el-button size="small" @click="editDocument(scope.row.id)">Edit</el-button>
                        <el-popconfirm title="Вы уверены?" confirm-button-text="Да" cancel-button-text="Нет"
                            @confirm="removeDocument(scope.row.id)">
                            <template #reference>

                                <el-button size="small" type="danger"><el-icon style="margin-right: 10px;">
                                        <Delete />
                                    </el-icon>Delete</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { documentsStore } from '@/stores/documents'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
const emit = ​defineEmits(['edit']);

const editCategory = (id:number)=>{ 
    emit('edit', id)
}




const store = documentsStore()
const { remove_document } = store
const { documents } = storeToRefs(store)

const search = ref<string>('')

const removeDocument = (id: number): void => {
    remove_document(id)
}



const filterTableData = computed(() =>
    documents.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.surname.toLowerCase().includes(search.value.toLowerCase()) ||
            data.secondName.toLowerCase().includes(search.value.toLowerCase())
            
    )
)


</script>

<style lang="scss" scoped>
.table {
    margin-top: 50px;

    h4 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 20px;
    }
}
</style>