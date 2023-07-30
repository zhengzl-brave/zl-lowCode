<template>
    <div class="container-wrapper" >
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>

const props = defineProps({
    widget: {
        type: Object,
        default:() => {}
    }
})


</script>

<style lang='scss' scoped></style>