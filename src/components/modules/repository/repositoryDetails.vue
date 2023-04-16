<template>
    <div>
        <BackButton />
        <div v-if="currentRepository !== undefined" class="repository-details">
            <div class="repository-details__commit-list-title">
                Repository Commits
            </div>
            <RepositoryCommitList :current-repository="currentRepository" @errorEmit="emit('openModal')" />
            <div class="repository-details__team-members-title">
                Repository Contributors
            </div>
            <RepositoryTeamMembers :current-repository="currentRepository" @errorEmit="emit('openModal')" />
        </div>
        <div v-else class="repository-details__info">
            Repository is empty
            <SvgIcon type="mdi" :path="mdiEmoticonSadOutline"></SvgIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BackButton from '@/components/ui/backButton.vue'
import { mdiEmoticonSadOutline } from '@mdi/js'
import { useRoute } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon'
import RepositoryCommitList from './repositoryCommitList.vue';
import RepositoryTeamMembers from './repositoryTeamMembers.vue'
import { getCurrentRepositoryDetailsResponse } from '@/helpers/requests';
import { TRepository } from '@/helpers/types';

const route = useRoute()
const currentRepository = ref<TRepository>()

const emit = defineEmits(['openModal'])

async function getCurrentRepositoryDetails() {
    try {
        const response = await getCurrentRepositoryDetailsResponse(route.params.id.toString())
        currentRepository.value = response.data
    } catch (error) {
        console.error(error)
        emit('openModal')
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
        color: black;
    }

    &__team-members-title {
        color: black;
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
