import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Documents } from '@/models/types.ts'
import axios from 'axios'
import { url } from '@/stores/vars'
import { ElMessage } from 'element-plus'


export const documentsStore = defineStore('documents', () => {

  const documents = ref<Documents[]>([])
  const slug = ref<string>('documents')

  const all_document = async (): Promise<void> => {
    try {
      const result = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
      if (result.status == 200) {
        documents.value = [...result.data]
      }
    }
    catch (error) {
      console.error('Error fetching documents:', error);
    }
  }


  const add_document = async (payload: Documents): Promise<void> => {
    try {
      const result = await axios.post(`${url}/${slug.value}`, payload);
      if (result.status === 201) {
        documents.value.unshift(result.data);
        ElMessage({
          type: 'success',
          message: 'Новая информация добавлена'
        });
      }
    } catch (error) {
      console.error('Error adding Documents:', error);
    }
  };

  const remove_document = async (id: number): Promise<void> => {
    try {
      const result = await axios.delete(`${url}/${slug.value}/${id}`);
      if (result.status === 200) {
        documents.value = documents.value.filter((document: Documents) => document.id !== id);
        ElMessage({
          type: 'warning',
          message: "Информация удалена"
        })
      }

    } catch (error) {
      console.error('Error removing Documents:', error);
    }
  };

  const toggle_document = async (document: Documents): Promise<void> => {
    try {
      await save_document(document);
    } catch (error) {
      console.error('Error toggling Documents:', error);
    }
  }

  const save_document = async (document: Documents): Promise<void> => {
    try {
      const { data, status } = await axios.put(`${url}/${slug.value}/${document.id}`, document);
      if (status === 200) {
        documents.value = documents.value.map(cat => cat.id === document.id ? data : cat);
        ElMessage({ type: 'success', message: 'Обновить информацию' });
      }
    } catch (error) {
      console.error('Error saving Documents:', error);
    }
  }

  const get_document = async (id: number) => {
    try {
      const response = await axios.get(`${url}/${slug.value}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching Documents:', error);
    }
  }

  return {
    documents,

    all_document,
    add_document,
    remove_document,
    get_document,
    toggle_document,
    save_document
  }
})
