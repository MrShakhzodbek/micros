<template>
    <div>
        <el-form ref="categoryForm" @submit.prevent="submitForm" :model="document" :rules="rules" label-position="top">
            <el-row :gutter="30">
                <!-- Name -->
                <el-col :span="8">
                    <el-form-item label="Имя" prop="name">
                        <el-input v-model="document.name" />
                    </el-form-item>
                </el-col>

                <!-- Surname -->
                <el-col :span="8">
                    <el-form-item label="Фамилия" prop="surname">
                        <el-input v-model="document.surname" />
                    </el-form-item>
                </el-col>
                <!-- Second Name -->
                <el-col :span="8">
                    <el-form-item label="Отчество" prop="surname">
                        <el-input v-model="document.secondName" />
                    </el-form-item>
                </el-col>
                <!-- Type of Documents -->
                <el-col :span="6">
                    <el-form-item label="Тип документа">
                        <el-select v-model="document.typeDocument">
                            <el-option label="Счёт-фактура" value="Счёт-фактура" />
                            <el-option label="Доверенность" value="Доверенность" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- Date of Documents -->
                <el-col :span="6">
                    <el-form-item prop="dateDocument" label="Дата документа" required>
                        <el-date-picker v-model="document.dateDocument" type="date"/>
                    </el-form-item>
                </el-col>

                <!-- Type of Invoices -->
                <el-col :span="6">
                    <el-form-item label="Тип счет-фактуры">
                        <el-select v-model="document.typeInvoices">
                            <el-option label="Cтандартная " value="Cтандартная " />
                            <el-option label="Дополнительная " value="Дополнительная " />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- Number of Documents -->
                <el-col :span="6">
                    <el-form-item label="Номер документа" required>
                        <el-input v-model="document.numberDocument" />
                    </el-form-item>
                </el-col>
                <!-- Description -->
                <el-col :span="16">
                    <el-form-item label="Описание">
                        <el-input v-model="document.description" type="textarea" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="24" text-end align="right">
                    <el-button type="primary" @click="submitForm">Create</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { Documents } from '@/models/types';
import { documentsStore } from '@/stores/documents';


interface Props{
    id:number
}

const props = defineProps<Props>();
const emit = defineEmits(['edit']);
const store = documentsStore();
const { add_document, get_document, save_document } = store;
const documentForm = ref<FormInstance>();
const document = ref<Documents>({
    id: 0,
    typeDocument: '',
    numberDocument: '',
    dateDocument: '',
    description: '',
    typeInvoices: '',
    name: '',
    surname: '',
    secondName: ''
});

const toggle = ref<boolean>(false)


const rules = ref<FormRules>({
    name: [{ required: true, message: 'Please input the name', trigger: 'blur' }],
    surname: [{ required: true, message: 'Please input the surname', trigger: 'blur' }],
    secondName: [{ required: true, message: 'Please input the Second Name', trigger: 'blur' }],
    dateDocument: [{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }],
    typeDocument: [{required: true,message: 'Please select type',trigger: 'change',}],
    description: [{ required: true, message: 'Please input description', trigger: 'blur' }],
    typeInvoices: [{required: true,message: 'Please select type',trigger: 'change',}],
    numberDocument: [{ required: true, message: 'Please input number', trigger: 'blur' }],
});

const submitForm = async () => {
    const form = documentForm.value;
    if (!form) return;

    form.validate(async (valid) => {
        if (valid) {
            if (toggle.value) {
                await save_document(document.value);
                emit('edit', document.value.id)
            } else {
                await add_document(document.value);
            }
            form.resetFields();
            toggle.value = false;
        } else {
            console.error('Error submitting form');
        }
    });
};

watch(() => props.id, async (val: number) => {
    if (val === 0) return;
    console.log('FormDocuments', val);
    let result = await get_document(val);
    if (result.status === 200) {
        document.value = { ...result.data };
        toggle.value = true;
    }
});



</script>


<style scoped></style>