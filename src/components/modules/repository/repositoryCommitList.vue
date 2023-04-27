<template>
    <div class="commit-list">
        <div v-if="repositoryCommits">
            <li v-for="item in repositoryCommits" :key="item.sha">
                <div v-if="item.author !== null" class="commit-list__commit">
                    <div>
                        <img class="commit-list__avatar" :src="item.author.avatar_url" />
                    </div>
                    <div class="commit-list__content">
                        <div>{{ item.commit.message }} </div>
                        <div>
                            <div>{{ item.author.login }}, </div>
                            <div>{{ new Date(item.commit.committer.date).toLocaleDateString() }}</div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    {{ item.commit.message }}
                </div>
            </li>
        </div>
        <div v-else class="commit-list__info">
            Repository Commit list is empty
        </div>
    </div>
</template>
<script setup lang="ts">
import { getRepositoryCommitsResponse } from '@/helpers/requests';
import { TRepositoryCommitList } from '@/helpers/types';
import { onMounted, ref } from 'vue';

const repositoryCommits = ref<TRepositoryCommitList>()
const props = defineProps(['currentRepository'])
const emit = defineEmits(['errorEmit'])

async function getRepositoryCommits() {
    try {
        const response = await getRepositoryCommitsResponse(props.currentRepository.full_name)
        repositoryCommits.value = response.data
    } catch (error) {
        console.error(error)
        emit('errorEmit')
    }
}
onMounted(() => {
    getRepositoryCommits()
})
</script>

<style scoped lang="scss">
.commit-list {
    max-height: 400px;
    overflow-y: auto;
    border-radius: $base-radius;
    background-color: #1a1a1a;
    border: 1px solid #535353;
    margin-bottom: 50px;
    overflow-x: hidden;

    &__commit {
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
        width: 1000px;

        div {
            display: flex;
        }
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