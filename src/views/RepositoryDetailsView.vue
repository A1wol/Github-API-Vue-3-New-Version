<template>
    <div>
        <RepositoryDetails @openModal="isModalVisible = true" />
        <Modal :showModal="isModalVisible" :modalText="'Repository Details list error'"
            @closeModal="isModalVisible = false" />
    </div>
</template>

<script setup lang="ts">
import RepositoryDetails from '@/components/modules/repository/repositoryDetails.vue'
import Modal from '@/components/partials/Modal.vue';
import { ref } from 'vue';

const isModalVisible = ref<boolean>(false)
</script>
