<template>
    <div class="team-members">
        <div v-if="repositoryContributors">
            <li v-for="contributor in repositoryContributors" :key="contributor.id">
                <div @click="$router.push(`/contributor-details/${contributor.id}`)">
                    <div class="team-members__member">
                        <div>
                            <img class="team-members__avatar" :src="contributor.avatar_url" />
                        </div>
                        <div class="team-members__content">
                            <div>{{ contributor.login }}</div>
                            <div>{{ contributor.type }}</div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
        <div v-else class="team-members__info">
            Repository Contributors list is empty
        </div>
    </div>
</template>
<script setup lang="ts">
import Axios from 'axios';
import { onMounted, ref } from 'vue';

const repositoryContributors = ref()
const props = defineProps(['currentRepository'])
const emit = defineEmits(['errorEmit'])

interface Contributor {
    avatar_url: String,
    id: Number,
    login: String,
    type: String
}
type TContributorList = Contributor[]

async function getRepositoryContributors() {
    try {
        repositoryContributors.value = await (await Axios.get<TContributorList>(`https://api.github.com/repos/${props.currentRepository.full_name}/contributors`)).data
    } catch (error) {
        console.error(error)
        emit('errorEmit')
    }
}
onMounted(() => {
    getRepositoryContributors()
})
</script>

<style scoped lang="scss">
.team-members {
    max-height: 400px;
    border-radius: 10px;
    overflow-y: auto;
    background-color: #1a1a1a;
    border: 1px solid #535353;
    cursor: pointer;

    &__member {
        display: flex;
    }

    &__avatar {
        border-radius: 50%;
        margin-right: 15px;
        margin-left: 10px;
        width: 50px;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__title {
        display: flex;
        justify-content: flex-end;
        font-size: 24px;
    }

    li {
        padding: 12px;
    }

    li:hover {
        background-color: #2c2c2c;
    }

    &__info {
        padding: 12px;
    }
}
</style>