<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
        <title v-if="!!title">{{ title }}</title>
    </svg>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

const props = defineProps({
    iconClass: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
})

const iconName = computed(() => {
    return `#icon-${props.iconClass}`
})

const svgClass = computed(() => {
    if (props.className) {
        return 'svg-icon' + props.className
    } else {
        return 'svg-icon'
    }
})
</script>

<style lang='scss' scoped>
.svg-icon {
    width: 1.1em;
    height: 1.1em;
    margin-left: 0.35em;
    margin-right: 0.35em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>