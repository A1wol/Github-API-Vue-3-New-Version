<template>
    <div>
        <BackButton />
        <div class="contributor-details" v-if="currentUser">
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
                <div v-if="currentUser.created_at && currentUser.updated_at">
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
    </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/ui/backButton.vue'
import { ref, onMounted } from 'vue'
import { mdiAccount, mdiMapMarker, mdiAccountGroup, mdiTextBox } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { useRoute } from 'vue-router'
import { getCurrentUserResponse } from '@/helpers/requests'
import { TContributor } from '@/helpers/types'

const route = useRoute()
const currentUser = ref<Partial<TContributor>>()
const emit = defineEmits(['openModal'])

async function getCurrentUser() {
    try {
        const response = await getCurrentUserResponse(route.params.id.toString())
        currentUser.value = response.data
    } catch (error) {
        console.error(error)
        emit('openModal')
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
    border-radius: $base-radius;
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
            border-radius: $base-radius;
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
