<template>
    <div class="table">
        <h4>Список работников</h4>
        <el-row :gutter="30">
            <el-table :data="filterTableData" style="width: 100%" :span="24">
                <el-table-column label="#" type="index" />
                <el-table-column label="Имя" prop="name" />
                <el-table-column label="Фамилия" prop="surname" />
                <el-table-column label="Дата рождения" prop="dateBirthday" />
                <el-table-column label="Паспорт" prop="passportSeria" />
                <el-table-column label="Активность" prop="checkbox" />
                <el-table-column label="Пол" prop="gender">
                    <template #default="scope">
                        <div>
                            {{ scope.row.gender ? 'мужчина' : 'женщина' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search" size="large" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="warning" @click="">Edit</el-button>
                        <el-popconfirm 
                            title="Вы уверены, что хотите удалить этого сотрудника?"
                            confirm-button-text="Да"
                            cancel-button-text="Нет"
                            @confirm="removeCategory(scope.row.id)"
                        >
                            <template #reference>
                                <el-button size="small" type="danger">Delete</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { categoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'

const store = categoryStore()
const { remove_category } = store
const { categories } = storeToRefs(store)

const search = ref<string>('')

const removeCategory = (id: number): void => {
    remove_category(id)
}



const filterTableData = computed(() =>
    categories.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.surname.toLowerCase().includes(search.value.toLowerCase()) ||
            data.passportSeria.toLowerCase().includes(search.value.toLowerCase())
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