<template>
  <div>
    <RepositoryList @openModal="isModalVisible = true" />
    <Modal :showModal="isModalVisible" :modalText="'Repository List error'" @closeModal="isModalVisible = false" />
  </div>
</template>

<script lang="ts" setup>
import RepositoryList from '@/components/modules/search/repositoryList.vue'
import Modal from '@/components/partials/Modal.vue';
import { ref } from 'vue';

const isModalVisible = ref<boolean>(false)
</script>
