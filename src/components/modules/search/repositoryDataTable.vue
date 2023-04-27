<template>
    <div class="data-table">
        <div class="data-table__headers">
            <div>Name</div>
            <div>Owner</div>
            <div>Created</div>
            <div>Navigation</div>
            <div>Action</div>
        </div>
        <div v-if="!isTableDataLoading && repositoryItems?.length !== 0" v-for="item in repositoryItems" :key="item.id"
            class="data-table__rows">
            <div class="data-table__rows__content">
                <div data-label="Name">{{ item.name }}</div>
                <div data-label="Owner">{{ item.owner.login }}</div>
                <div data-label="Created">{{ new Date(item.created_at).toLocaleDateString() }}</div>
                <div data-label="Navigation">
                    <button @click="$router.push(`repository-details/${item.id}`)">Details
                        <SvgIcon type="mdi" :path="mdiArrowRight"></SvgIcon>
                    </button>
                </div>
                <div :style="{ transform: !item.visible ? 'rotate(180deg)' : '' }" @click="item.visible = !item.visible">
                    <SvgIcon type="mdi" :path="mdiArrowUp"></SvgIcon>
                </div>
            </div>
            <Transition name="description">
                <div v-if="item.visible">
                    <div v-if="item.description !== null" class="data-table__rows__description">
                        <div class="data-table__rows__description__title">Description</div>
                        <div class="data-table__rows__description__content">{{ item.description }}</div>
                    </div>
                    <div v-else class="data-table__rows__description">
                        <div class="data-table__rows__description__title">
                            Item description is empty
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div v-else class="data-table__spinner">
            <Spinner />
        </div>
    </div>
</template>
<script setup lang="ts">
import { mdiArrowRight, mdiArrowUp } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import Spinner from '@/components/partials/Spinner.vue'
import { TRepository } from '@/helpers/types';

defineProps({ repositoryItems: Array<TRepository>, isTableDataLoading: Boolean })

</script>

<style scoped lang="scss">
.data-table {
    color: white;
    justify-content: center;
    border-radius: 15px;
    background-color: #212121;
    border: 1px solid black;

    div {
        display: flex;
        width: 100%;
        font-size: 20px;
    }

    &__rows {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &__content {
            border: 1px solid #535353;
            background-color: #171717;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                word-break: break-all;
                max-width: 200px;
                min-height: 60px;
                padding: 8px;
            }

        }

        &__description {
            min-height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 12px;
            background-color: rgb(36, 36, 36);
            -webkit-box-shadow: inset 8px 8px 24px -23px rgba(255, 255, 255, 1);
            -moz-box-shadow: inset 8px 8px 24px -23px rgba(255, 255, 255, 1);
            box-shadow: inset 8px 8px 24px -23px rgba(255, 255, 255, 1);

            &__title {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
                font-weight: bold;
            }

            &__content {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    &__headers {
        height: 50px;
        font-weight: bold;
        background-color: black;
        border-radius: 15px 15px 0 0;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &__spinner {
        background-color: #171717;
        border-radius: 15px;
    }
}

@media (max-width: 600px) {
    .data-table {
        background-color: transparent;
        border: none;

        div {
            flex-direction: column;
            width: -moz-available;
        }

        &__rows {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 15px;

            &__content {
                border-radius: 15px 15px 0 0;

                div {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #535353;
                    flex-direction: row;
                    max-width: 94%;
                    padding: 12px;
                }

                div::before {
                    font-weight: bold;
                    content: attr(data-label);
                }
            }

            &__description {
                border-radius: 0 0 15px 15px;

                div {
                    padding: 0;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
            }
        }

        &__headers {
            height: 0px;

            div {
                display: none;
            }
        }
    }
}
</style>