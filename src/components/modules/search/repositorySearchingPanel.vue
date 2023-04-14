<template>
    <div class="panel">
        <form id="app" ref="form" @submit="checkForm">
            <div class="panel__text-field">
                <input v-model="searchedRepositoryName" placeholder="Repository name" />
                <div class="panel__text-field__button">
                    <button @click="submitForm()">SEARCH
                        <SvgIcon type="mdi" :path="mdiMagnify"></SvgIcon>
                    </button>
                </div>
                <div class="panel__errors" v-show="formErrors.length">
                    {{ formErrors[0] }}
                </div>
            </div>
            <div class="panel__selects">
                <div>
                    <label
                        v-if="props.repositoryListLength !== undefined && props.repositoryListLength > selectedPerPageOption"
                        class="panel__label--page">
                        Page
                        <div class="panel__label__buttons">
                            <div :style="{ backgroundColor: selectedPageOption > 1 ? '' : 'rgb(64,64,64)' }"
                                @click="decrementPageValue()">
                                <SvgIcon type="mdi" :path="mdiArrowLeft"></SvgIcon>
                            </div>
                            <div>{{ selectedPageOption }}</div>
                            <div @click="incrementPageValue()">
                                <SvgIcon type="mdi" :path="mdiArrowRight"></SvgIcon>
                            </div>
                        </div>
                    </label>
                    <label class="panel__label">
                        <PanelSelect :title="'Per Page'" v-model="selectedPerPageOption" :options="perPageOptions"
                            @onSearchRequest="submitForm()" />
                    </label>
                </div>
                <div>
                    <label class="panel__label">
                        <PanelSelect :title="'Order'" v-model="selectedOrderOption" :options="orderOptions"
                            @onSearchRequest="submitForm()" />
                    </label>
                    <label class="panel__label">
                        <PanelSelect :title="'Sorting'" v-model="selectedSortOption" :options="sortOptions"
                            @onSearchRequest="submitForm()" />
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { mdiMagnify, mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon'
import { storeToRefs } from 'pinia';
import { useGithubDataStore } from '@/store/githubData'
import PanelSelect from '@/components/ui/PanelSelect.vue';
import { validateFormFields } from '@/helpers/helper';
import { TPerPageOption } from '@/helpers/types';

const searchedRepositoryName = ref<string>('')
const selectedPerPageOption = ref<number>(0)
const selectedPageOption = ref<number>(0)
const selectedSortOption = ref<string>('')
const selectedOrderOption = ref<string>('')
const formErrors = ref([])
const { name, page, sort, perPage, order } = storeToRefs(useGithubDataStore())
const perPageOptions = ref<TPerPageOption[]>([
    { text: '5', value: '5' },
    { text: '10', value: '10' },
    { text: '25', value: '25' },
    { text: '30', value: '30' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
])
const orderOptions = ref([{ text: 'Descending', value: 'desc' }, { text: 'Ascending', value: 'asc' }])
const sortOptions = ref([{ text: 'stars', value: 'stars' }, { text: 'fork', value: 'fork' }, { text: 'updated', value: 'updated' }])
const emit = defineEmits(['passPanelData'])
const form = ref()
const props = defineProps({
    repositoryListLength: Number,
    isDataTableLoading: Boolean,
    repositoryItems: Array
})

function checkForm(e: Event) {
    formErrors.value = [];
    const isFormValid = validateFormFields(formErrors.value,
        [
            { title: "Name", value: searchedRepositoryName.value },
            { title: "Page", value: selectedPageOption.value },
            { title: "Per Page", value: selectedPerPageOption.value },
            { title: "Order", value: selectedOrderOption.value },
            { title: "Sorting", value: selectedSortOption.value }
        ])
    if (isFormValid) {
        emit('passPanelData', {
            name: searchedRepositoryName.value,
            perPage: selectedPerPageOption.value,
            page: selectedPageOption.value,
            sort: selectedSortOption.value,
            order: selectedOrderOption.value
        })
    }
    e.preventDefault();
}
function submitForm() {
    if (selectedPageOption.value >= 1) {
        form.value.requestSubmit()
    }
}
function decrementPageValue() {
    if (selectedPageOption.value > 1) {
        selectedPageOption.value--
        form.value.requestSubmit()
    }
}
function incrementPageValue() {
    if (props.repositoryItems?.length !== 0) {
        selectedPageOption.value++
        form.value.requestSubmit()
    }
}

onMounted(() => {
    searchedRepositoryName.value = name.value.toString()
    selectedPageOption.value = page.value.valueOf()
    selectedPerPageOption.value = perPage.value.valueOf()
    selectedOrderOption.value = order.value.toString()
    selectedSortOption.value = sort.value.toString()
    form.value.requestSubmit()
})
</script>

<style scoped lang="scss">
.panel {
    display: flex;
    flex-direction: column;

    &__selects {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            display: flex;
        }
    }

    &__errors {
        color: red;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
    }

    &__label {
        font-size: 14px;
        color: white;
        padding-right: 15px;
        padding-left: 15px;
        display: flex;
        flex-direction: column;

        &__buttons {
            font-size: 20px;
        }

        &--page {
            font-size: 14px;
            color: white;
            flex-direction: column;
            color: white;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 150px;
            display: flex;
            align-items: flex-start;
            margin-top: 5px;
            margin-right: 15px;

            div {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: #1f1f1f;
                height: 45px;
                border: 1px solid white;
                cursor: pointer;
            }
        }
    }

    &__text-field {
        display: flex;
        margin-top: 20px;

        input {
            width: 30%;
        }

        &__button {
            max-width: 200px;
            margin-left: 20px;
        }
    }

}

@media(max-width: 600px) {
    .panel {
        display: flex;
        flex-direction: column;

        &__label {
            width: 40%;
            height: 70px;
            margin-bottom: 35px;

            &--page {
                width: 40%;
                margin-left: 10px;
            }
        }

        &__selects {
            display: flex;
            flex-direction: column;

            div {
                display: flex;
                justify-content: space-evenly;
                width: 100%;
            }

        }
    }
}
</style>
