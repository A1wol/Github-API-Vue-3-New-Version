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
            <Transition>
                <div v-if="item.visible" class="data-table__rows__description">
                    <div v-if="item.description !== null">
                        <div class="data-table__rows__description__title">Description</div>
                        <div>{{ item.description }}</div>
                    </div>
                    <div v-else class="data-table__rows__description__title">
                        Item description is empty
                    </div>
                </div>
            </Transition>
        </div>
        <div v-else>
            <Spinner />
        </div>
    </div>
</template>
<script setup lang="ts">
import { mdiArrowRight, mdiArrowUp } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import Spinner from '@/components/partials/Spinner.vue'
defineProps({ repositoryItems: Array, isTableDataLoading: Boolean })

</script>

<style scoped lang="scss">
.data-table {
    color: white;
    justify-content: center;

    div {
        display: flex;
        width: 100%;
        background-color: #1a1a1a;
        font-size: 20px;
    }

    &__rows {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &__content {
            border: 1px solid #535353;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                word-break: break-all;
                max-width: 200px;
                min-height: 60px;
            }

        }

        &__description {
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 12px;
                background-color: #1f1f1f;
            }

            &__title {
                display: flex;
                justify-content: center;
                font-size: 30px;
                font-weight: bold;
            }
        }
    }

    &__headers {
        height: 50px;
        font-weight: bold;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

@media (max-width: 600px) {
    .data-table {
        margin-top: 20px;

        div {
            flex-direction: column;
        }

        &__arrow {
            display: flex;
            justify-content: flex-end !important
        }

        &__rows {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 15px;

            &__content {
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