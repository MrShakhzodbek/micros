import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Documents } from '@/models/types';
import axios from 'axios';
import { url } from '@/stores/vars';
import { ElMessage } from 'element-plus';

export const documentsStore = defineStore('documents', () => {
  const documents = ref<Documents[]>([]);
  const slug = ref<string>('documents');
  const documentsCount = ref<number>(0)

  const all_document = async (page: number): Promise<void> => {
    try {
      const result = await axios.get(`${url}/${slug.value}?_page=${page}?_sort=id&_order=desc`);
      if (result.status === 200) {
        documents.value = [...result.data];
        documentsCount.value = parseInt(result.headers['x-total-count'] || '0');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      ElMessage.error('Error fetching documents');
    }
  };

  const add_document = async (payload: Documents): Promise<void> => {
    try {
      const result = await axios.post(`${url}/${slug.value}`, payload);
      if (result.status === 201) {
        documents.value.unshift(result.data);
        ElMessage.success('Новая информация добавлена');
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const remove_document = async (id: number): Promise<void> => {
    try {
      const result = await axios.delete(`${url}/${slug.value}/${id}`);
      if (result.status === 200) {
        documents.value = documents.value.filter(doc => doc.id !== id);
        ElMessage.warning('Информация удалена');
      }
    } catch (error) {
      console.error('Error removing document:', error);
    }
  };

  const toggle_document = async (document: Documents): Promise<void> => {
    try {
      await save_document(document);
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  }

  const save_document = async (document: Documents): Promise<void> => {
    try {
      const { data, status } = await axios.put(`${url}/${slug.value}/${document.id}`, document);
      if (status === 200) {
        const index = documents.value.findIndex(doc => doc.id === document.id);
        if (index !== -1) {
          documents.value[index] = data;
        }
        ElMessage.success('Обновить информацию');
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const get_document = async (id: number): Promise<Documents | null> => {
    try {
      const response = await axios.get(`${url}/${slug.value}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching document:', error);
      
      return null;
    }
  };

  return {
    documents,
    documentsCount,
    
    all_document,
    add_document,
    remove_document,
    get_document,
    save_document,
    toggle_document
  };
});