<template>
    <button @click="$router.go(-1)">
        <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        <div>BACK</div>
    </button>
</template>
<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'

</script>
