import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/models/types.ts'
import axios from 'axios'
import { url } from '@/stores/vars'
import { ElMessage } from 'element-plus'

export const categoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const slug = ref<string>('workers')
  const caregoryCount = ref<number>(0)

  const all_category = async (page: number): Promise<void> => {
    try {
      const result = await axios.get(`${url}/${slug.value}?_page=${page}?_sort=id&_order=desc`)
     
      if (result.status === 200) {
        categories.value = [...result.data]
        caregoryCount.value = parseInt(result.headers['x-total-count'] || '0');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      ElMessage.error('Error fetching categories');
    }
  };

  const add_category = async (payload: Category): Promise<void> => {
    try {
      const result = await axios.post(`${url}/${slug.value}`, payload);
      if (result.status === 201) {
        categories.value.unshift(result.data);
        ElMessage.success('Новая информация добавлена');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const remove_category = async (id: number): Promise<void> => {
    try {
      const result = await axios.delete(`${url}/${slug.value}/${id}`);
      if (result.status === 200) {
        categories.value = categories.value.filter((category: Category) => category.id !== id);
        ElMessage.warning('Информация удалена');
      }

    } catch (error) {
      console.error('Error removing category:', error);
    }
  };

  const toggle_category = async (category: Category): Promise<void> => {
    try {
      await save_category(category);
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  }

  const save_category = async (category: Category): Promise<void> => {
    try {
      const { data, status } = await axios.put(`${url}/${slug.value}/${category.id}`, category);
      if (status === 200) {
        const index = categories.value.findIndex(cat => cat.id === document.id);
        if (index !== -1) {
          categories.value[index] = data;
        }
        ElMessage.success('Обновить информацию');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }

  const get_category = async (id: number): Promise <Category | null> => {
    try {
      const response = await axios.get(`${url}/${slug.value}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  return {
    categories,
    caregoryCount,
    
    all_category,
    add_category,
    remove_category,
    get_category,
    toggle_category,
    save_category
  }
})
