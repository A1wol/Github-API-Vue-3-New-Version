<template>
    <div class="searching">
        <RepositorySearchingPanel :repositoryListLength="repositoryListLength" :isDataTableLoading="isTableDataLoading"
            :repositoryItems="dataTableRepositories"
            @passPanelData="searchingPanelItems = $event, getGithubRepositories()" />
        <Transition>
            <div v-if="isDataTableVisible">
                <div class="searching__result-counter">Results: {{ repositoryListLength }}</div>
                <RepositoryDataTable :repositoryItems="dataTableRepositories" :isTableDataLoading="isTableDataLoading" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGithubDataStore } from '@/store/githubData'
import RepositorySearchingPanel from './repositorySearchingPanel.vue'
import RepositoryDataTable from './repositoryDataTable.vue'
import { getGithubRepositoriesResponse } from '@/helpers/requests'
import { GithubData } from '@/helpers/interfaces'
import { Repository } from '@/helpers/classes'

const isDataTableVisible = ref<boolean>(false)
const repositoryListLength = ref<number>(0)
const dataTableRepositories = ref<Repository[]>()
const githubStore = useGithubDataStore()
const searchingPanelItems = ref<GithubData>()
const isTableDataLoading = ref<boolean>(true)

const emit = defineEmits(['openModal'])

async function getGithubRepositories() {
    try {
        if (searchingPanelItems.value) {
            dataTableRepositories.value = []
            const paramsObj: Record<string, string> = {
                q: searchingPanelItems.value.name,
                page: searchingPanelItems.value.page.toString(),
                per_page: searchingPanelItems.value.perPage.toString(),
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
            if (dataTableRepositories.value !== undefined) {
                response.data.items.forEach((element: Repository) => dataTableRepositories.value?.push({ ...element, visible: false }));
            }
        }
    } catch (error) {
        console.error(error)
        emit('openModal')
    }
}
</script>

<style scoped lang="scss">
.searching {
    &__result-counter {
        font-size: 16px;
    }
}
</style>
