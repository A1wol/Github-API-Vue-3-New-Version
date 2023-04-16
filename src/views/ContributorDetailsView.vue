<template>
    <div>
        <ContributorDetails @openModal="isModalVisible = true" />
        <Modal :showModal="isModalVisible" :modalText="'Contributor Details list error'"
            @closeModal="isModalVisible = false" />
    </div>
</template>

<script setup lang="ts">
import ContributorDetails from '@/components/modules/contributors/contributorDetails.vue'
import Modal from '@/components/partials/Modal.vue';
import { ref } from 'vue';

const isModalVisible = ref<boolean>(false)

</script>
