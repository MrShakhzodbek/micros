<template>
    <div>
        <el-form ref="categoryForm" @submit.prevent="submitForm" :model="category" :rules="rules" label-position="top">
            <el-row :gutter="30">
                <!-- Name -->
                <el-col :span="12">
                    <el-form-item label="Имя" prop="name">
                        <el-input v-model="category.name" />
                    </el-form-item>
                </el-col>
                
                <!-- Surname -->
                <el-col :span="12">
                    <el-form-item label="Фамилия" prop="surname">
                        <el-input v-model="category.surname" />
                    </el-form-item>
                </el-col>

                <!-- Date of Birth -->
                <el-col :span="16">
                    <el-form-item prop="dateBirthday" label="Дата рождения" required>
                        <el-date-picker v-model="category.dateBirthday" type="date" style="width: 100%" />
                    </el-form-item>
                </el-col>

                <!-- Passport Details -->
                <el-col :span="8">
                    <el-row :gutter="30">
                        <el-form-item label="Серия и номер паспорта" required>
                            <el-col :span="10">
                                <el-input v-model="category.passportSeria" placeholder="Серия паспорта" />
                            </el-col>
                            <el-col class="text-center" :span="2">
                                <span class="text-gray-500">-</span>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="category.passportNumber" placeholder="Номер паспорта" />
                            </el-col>
                        </el-form-item>
                    </el-row>
                </el-col>

                <!-- Activity Status -->
                <el-col :span="8">
                    <el-form-item label="Активность" prop="checkbox">
                        <el-checkbox-group v-model="category.checkbox">
                            <el-checkbox label="Active" name="type" />
                            <el-checkbox label="Passive" name="type" />
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <!-- Gender -->
                <el-col :span="8">
                    <el-form-item label="Пол" prop="gender">
                        <el-radio-group v-model="category.gender">
                            <el-radio :label="true">Mужчина</el-radio>
                            <el-radio :label="false">Женщина</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="24" text-end>
                    <el-button type="primary" @click="submitForm">Create</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { Category } from '@/models/types';
import { categoryStore } from '@/stores/category';

const store = categoryStore();
const { add_category } = store;
const categoryForm = ref<FormInstance>();
const category = ref<Category>({
    name: '',
    surname: '',
    dateBirthday: '',
    passportSeria: '',
    passportNumber: null,
    gender: false,
    checkbox: {}
});

const rules = ref<FormRules>({
    name: [{ required: true, message: 'Please input the name', trigger: 'blur' }],
    surname: [{ required: true, message: 'Please input the surname', trigger: 'blur' }],
    dateBirthday: [{ required: true, type: 'date', message: 'Please select the date of birth', trigger: 'change' }],
    passportSeria: [{ required: true, message: 'Please input the passport series', trigger: 'blur' }],
    passportNumber: [{ required: true, message: 'Please input the passport number', trigger: 'blur' }],
    gender: [{ required: true, message: 'Please select a gender', trigger: 'change' }],
    checkbox: [{ required: true, type: 'array', message: 'Please select at least one activity status', trigger: 'change' }]
});

const submitForm = async () => {
    const form = categoryForm.value;
    if (!form) return;

    form.validate((valid) => {
        if (valid) {
            add_category(category.value);
            form.resetFields();
        } else {
            console.error('Error submitting form');
        }
    });
};
</script>


<style scoped></style>