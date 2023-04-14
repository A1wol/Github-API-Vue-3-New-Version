<template>
    <div class="searching">
        <div class="searching__title">
            Vue 3 Github Repository & User Search
        </div>
        <RepositorySearchingPanel :repositoryListLength="repositoryListLength" :isDataTableLoading="isTableDataLoading"
            :repositoryItems="repositoryItems" @passPanelData="searchingPanelItems = $event, getGithubRepositories()" />
        <Transition>
            <div v-if="isDataTableVisible">
                <div class="searching__result-counter">Results: {{ repositoryListLength }}</div>
                <RepositoryDataTable :repositoryItems="repositoryItems" :isTableDataLoading="isTableDataLoading" />
            </div>
        </Transition>
        <Modal :showModal="isModalVisible" :modalText="'Repository List error'" @closeModal="isModalVisible = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGithubDataStore } from '@/store/githubData'
import RepositorySearchingPanel from './repositorySearchingPanel.vue'
import RepositoryDataTable from './repositoryDataTable.vue'
import Modal from '@/components/partials/Modal.vue'
import { getGithubRepositoriesResponse } from '@/helpers/requests'

const isDataTableVisible = ref<boolean>(false)
const repositoryListLength = ref<number>(0)
const repositoryItems = ref([])
const githubStore = useGithubDataStore()
const searchingPanelItems = ref()
const isTableDataLoading = ref<boolean>(true)
const isModalVisible = ref<boolean>(false)

async function getGithubRepositories() {
    try {
        repositoryItems.value = []
        const paramsObj = {
            q: searchingPanelItems.value.name,
            page: searchingPanelItems.value.page,
            per_page: searchingPanelItems.value.perPage,
            order: searchingPanelItems.value.order,
            sort: searchingPanelItems.value.sort
        }
        const searchParams = new URLSearchParams(paramsObj);
        const response = await getGithubRepositoriesResponse(searchParams.toString())
        repositoryListLength.value = response.data.total_count;
        githubStore.setSearchingData(
            searchingPanelItems.value.name,
            searchingPanelItems.value.page,
            searchingPanelItems.value.perPage,
            searchingPanelItems.value.order,
            searchingPanelItems.value.sort
        )
        isDataTableVisible.value = true
        setTimeout(() => {
            isTableDataLoading.value = false
        }, 1000)
        response.data.items.forEach((element: object) => repositoryItems.value.push({ ...element, visible: false }));
    } catch (error) {
        console.error(error)
        isModalVisible.value = true
    }
}
</script>

<style scoped lang="scss">
.searching {
    &__title {
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: white;
    }

    &__result-counter {
        font-size: 16px;
        color: white;
    }
}
</style>
