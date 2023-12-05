import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/models/types.ts'
import axios from 'axios'
import { url } from '@/stores/vars'
import { ElMessage } from 'element-plus'


export const categoryStore = defineStore('categories', () => {

  const categories = ref<Category[]>([])
  const slug = ref<string>('workers')

  const all_category = async (): Promise<void> => {
    try {
      const result = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
      if (result.status == 200) {
        categories.value = [...result.data]
      }
    }
    catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  const add_category = async (payload: Category): Promise<void> => {
    try {
      const result = await axios.post(`${url}/${slug.value}`, payload);
      if (result.status === 201) {
        categories.value.unshift(result.data);
        ElMessage({
          type: 'success',
          message: 'Новая информация добавлена'
        });
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
        ElMessage({
          type:'warning',
          message: "Информация удалена"
        })
      }

    } catch (error) {
      console.error('Error removing category:', error);
    }
  };

  return {
    categories,

    all_category,
    add_category,
    remove_category
  }
})
