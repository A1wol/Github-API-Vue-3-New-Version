<template>
    <div>
        <BackButton />
        <div v-if="currentRepository !== undefined" class="repository-details">
            <div class="repository-details__commit-list-title">
                Repository Commitss
            </div>
            <RepositoryCommitList :current-repository="currentRepository" @errorEmit="isModalVisible = true" />
            <div class="repository-details__team-members-title">
                Repository Contributors
            </div>
            <RepositoryTeamMembers :current-repository="currentRepository" @errorEmit="isModalVisible = true" />
        </div>
        <div v-else class="repository-details__info">
            Repository is empty
            <SvgIcon type="mdi" :path="mdiEmoticonSadOutline"></SvgIcon>
        </div>
        <Modal :showModal="isModalVisible" :modalText="'Repository Details list error'"
            @closeModal="isModalVisible = false" />

    </div>
</template>

<script setup lang="ts">
import Axios from 'axios'
import { ref, onMounted } from 'vue'
import BackButton from '@/components/ui/BackButton.vue'
import { mdiEmoticonSadOutline } from '@mdi/js'
import { useRoute } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon'
import RepositoryCommitList from './RepositoryCommitList.vue';
import RepositoryTeamMembers from './RepositoryTeamMembers.vue'
import { TRepositoryArray } from '@/helpers/types';
import Modal from '@/components/partials/Modal.vue'

const route = useRoute()
const currentRepository = ref()
const isModalVisible = ref<boolean>(false)

async function getCurrentRepositoryDetails() {
    try {
        currentRepository.value = await (await Axios.get<TRepositoryArray>(`https://api.github.com/repositories/${route.params.id}`)).data
    } catch (error) {
        console.error(error)
        isModalVisible.value = true
    }
}
onMounted(() => {
    getCurrentRepositoryDetails()
})
</script>

<style scoped lang="scss">
.repository-details {
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &__commit-list-title {
        margin-top: 20px;
    }

    &__info {
        color: white;
        font-size: 24px;
        padding: 12px;
        display: flex;
        align-items: center;
    }
}

@media(max-width: 960px) {
    .repository-details {
        &__commit-list {
            &__commit {
                width: 600px;
            }
        }
    }
}
</style>
