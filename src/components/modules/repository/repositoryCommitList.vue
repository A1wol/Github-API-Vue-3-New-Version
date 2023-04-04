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
import Axios from 'axios';
import { onMounted, ref } from 'vue';

const repositoryCommits = ref()
const props = defineProps(['currentRepository'])
const emit = defineEmits(['errorEmit'])
interface RepositoryCommit {
    author: {
        full_name: String,
        login: String,
        avatar_url: String
    },
    commit: {
        message: String,
        commiter: {
            date: Date,
        }
    },
}
type TRepositoryCommitList = RepositoryCommit[]
async function getRepositoryCommits() {
    try {
        repositoryCommits.value = await (await Axios.get<TRepositoryCommitList>(`https://api.github.com/repos/${props.currentRepository.full_name}/commits`)).data
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
    border-radius: 10px;
    background-color: #1a1a1a;
    border: 1px solid #535353;
    margin-bottom: 50px;
    overflow-x: hidden;

    &__commit {
        display: flex;
    }

    &__title {
        display: flex;
        justify-content: flex-end;
        font-size: 24px;
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