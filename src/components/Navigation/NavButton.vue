<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['toggleNavbar'])
const props = defineProps(['isActive'])
// const isNavOpen = ref()
const toggleMobileNav = () => {
    emit('toggleNavbar', props.isActive)
}
const changeState = computed(() => {
    return props.isActive ? 'active' : 'not-active'
})
</script>
<template>
    <div class="">
        <div class="box">
            <div @click="toggleMobileNav" class="btn " :class="changeState">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>


    </div>
</template>

<style scoped>
.btn {
    width: 30px;
    cursor: pointer;
}

span {
    display: block;

    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    height: 3px;
    background: #fff;
    transition: all .3s;
    position: relative;
}

span+span {
    margin-top: 8px;
}

.active span:nth-child(1) {
    animation: ease .5s top forwards;
}

.not-active span:nth-child(1) {
    animation: ease .5s top-2 forwards;
}

.active span:nth-child(2) {
    animation: ease .5s scaled forwards;
}

.not-active span:nth-child(2) {
    animation: ease .5s scaled-2 forwards;
}

.active span:nth-child(3) {
    animation: ease .5s bottom forwards;
}

.not-active span:nth-child(3) {
    animation: ease .5s bottom-2 forwards;
}

@keyframes top {
    0% {
        top: 0;
        transform: rotate(0);
    }

    50% {
        top: 22px;
        transform: rotate(0);
    }

    100% {
        top: 10px;
        transform: rotate(45deg);
    }
}

@keyframes top-2 {
    0% {
        top: 22px;
        transform: rotate(45deg);
    }

    50% {
        top: 22px;
        transform: rotate(0deg);
    }

    100% {
        top: 0;
        transform: rotate(0deg);
    }
}

@keyframes bottom {
    0% {
        bottom: 0;
        transform: rotate(0);
    }

    50% {
        bottom: 22px;
        transform: rotate(0);
    }

    100% {
        bottom: 12px;
        transform: rotate(135deg);
    }
}

@keyframes bottom-2 {
    0% {
        bottom: 22px;
        transform: rotate(135deg);
    }

    50% {
        bottom: 0px;
        transform: rotate(0);
    }

    100% {
        bottom: 0;
        transform: rotate(0);
    }
}

@keyframes scaled {
    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes scaled-2 {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>