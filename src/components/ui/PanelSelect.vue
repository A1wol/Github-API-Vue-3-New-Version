<template>
    <div class="select">
        {{ title }}
        <select class="select__input" :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value), $emit('onSearchRequest')">
            <option disabled>{{ title }}</option>
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>
<script setup lang="ts">
import { TPerPageOption } from '@/helpers/types';

defineProps({
    title: String,
    modelValue: [Number, String],
    options: Array<TPerPageOption>
})
defineEmits(['update:modelValue', 'onSearchRequest'])
</script>
<style scoped lang="scss">
.select {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 50px;

    input {
        height: 25px;
        width: 85%
    }

    div {
        display: flex;
        width: 400px;
    }

    &__input {
        font-size: 16px;
        width: 100%;
        cursor: pointer;
        padding: 12px;
        height: 50px;
        border: 0px solid #1a1a1a;
        border-radius: $base-radius;
        background: #1a1a1a;
        color: #ffffff;
        border: 1px solid white;
    }
}

@media (max-width:600px) {
    .select {
        margin-top: 0px;
        margin-bottom: 0px;
    }
}
</style>
