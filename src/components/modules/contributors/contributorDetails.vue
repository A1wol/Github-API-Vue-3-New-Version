<template>
    <div>
        <BackButton />
        <div class="contributor-details">
            <div class="contributor-details__avatar">
                <img :src="currentUser.avatar_url" />
                <div class="contributor-details__avatar__login">{{ currentUser.login }}</div>
            </div>
            <div class="contributor-details__info">
                <div class="contributor-details__title">INFORMATION</div>
                <div class="contributor-details__data-row">
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.type }}</div>
                        <div class="contributor-details__info__data__caption">
                            <SvgIcon type="mdi" :path="mdiAccount"></SvgIcon>Type
                        </div>
                    </div>
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.name !== '' ? currentUser.login
                            : currentUser.name }}</div>
                        <div class="contributor-details__info__data__caption">
                            <SvgIcon type="mdi" :path="mdiTextBox"></SvgIcon>Name
                        </div>
                    </div>
                </div>
                <div class="contributor-details__data-row">
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.followers }}</div>
                        <div class="contributor-details__info__data__caption">
                            <SvgIcon type="mdi" :path="mdiAccountGroup"></SvgIcon>Followers
                        </div>
                    </div>
                    <div v-if="currentUser.location !== null" class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.location }}</div>
                        <div class="contributor-details__info__data__caption">
                            <SvgIcon type="mdi" :path="mdiMapMarker"></SvgIcon>Location
                        </div>
                    </div>
                </div>
                <div>
                    <div class="contributor-details__info__data">Created at: {{ new
                        Date(currentUser.created_at).toLocaleString() }}
                    </div>
                    <div class="contributor-details__info__data">Updated at: {{ new
                        Date(currentUser.updated_at).toLocaleString() }}</div>
                </div>
                <div v-if="currentUser.bio !== null">
                    <div class="contributor-details__title">BIOGRAPHY</div>
                    <div class="contributor-details__info__data">{{ currentUser.bio }}</div>
                </div>
            </div>
        </div>
        <Modal :showModal="isModalVisible" :modalText="'Contributor Detail list error'"
            @closeModal="isModalVisible = false" />
    </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/ui/BackButton.vue'
import Axios from 'axios'
import { ref, onMounted } from 'vue'
import { mdiAccount, mdiMapMarker, mdiAccountGroup, mdiTextBox } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { useRoute } from 'vue-router'
import Modal from '@/components/partials/Modal.vue'

const route = useRoute()
const currentUser = ref({
    avatar_url: '',
    login: '',
    type: '',
    name: '',
    followers: 0,
    location: '',
    created_at: '',
    updated_at: '',
    bio: ''
})
const isModalVisible = ref<boolean>(false)

type Contributor = {
    avatar_url: String,
    login: String,
    type: String,
    name: String,
    followers: Number,
    location: String,
    created_at: Date,
    updated_at: Date,
    bio: String
}
type TContributorList = Contributor[]

async function getCurrentUser() {
    try {
        const response = await Axios.get<TContributorList>(`https://api.github.com/user/${route.params.id}`)
        currentUser.value = response.data
    } catch (error) {
        console.error(error)
        isModalVisible.value = true
    }
}
onMounted(() => {
    getCurrentUser()
})
</script>

<style scoped lang="scss">
.contributor-details {
    display: flex;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    background-image: radial-gradient(circle farthest-corner at 29.4% 48%, rgba(77, 77, 77, 1) 0%, rgba(0, 0, 0, 1) 90%);
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 20px;
    color: white;
    font-size: 20px;

    &__data-row {
        display: flex;
        justify-content: space-around;
    }

    &__title {
        font-size: 30px;
        display: flex;
        justify-content: center;
    }

    &__avatar {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 40px;

        img {
            width: 100%;
            max-width: 350px;
            border-radius: 10px;
        }

        &__login {
            display: flex;
            justify-content: center;
            font-size: 24px;
        }
    }

    &__info {
        max-width: 400px;
        padding: 15px;
        text-align: center;

        &__data {
            padding: 10px;

            div {
                max-width: 150px;
            }

            &__content {
                display: flex;
                justify-content: center;
                font-size: 20px;
            }

            &__caption {
                display: flex;
                justify-content: center;
            }
        }
    }
}

@media(max-width: 860px) {
    .contributor-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            word-wrap: break-word;
        }
    }
}
</style>
