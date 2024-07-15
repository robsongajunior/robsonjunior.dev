<template>
    <button
        @click="toggle"
        aria-label="Menu"
        aria-expanded="false"
        class="btn-menu-burguer"
        :class="{ active: isActive }">

        <span></span>
        <span></span>
        <span></span>
    </button>
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from '@nanostores/vue';
    import { isMenuActive } from '../../nanostores/BurguerButton.js';

    let isActive = ref(false);
    let $isMenuActive = useStore(isMenuActive);

    function toggle() {
        isActive.value = !isActive.value;
        setStatus(isActive.value);
    }

    function setStatus(stats) {
        isMenuActive.set(stats);
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/breakpoints';

    .btn-menu-burguer {
        border: none;
        display: inline-block;
        padding: .5rem 0 .5rem 1rem;
        background-color: transparent;

        &:hover {
            cursor: pointer;
        }

        @include media-breakpoint-up('sm') {
            display: inline-block;
        }

        @include media-breakpoint-up('sd') {
            display: none;
        }

        span {
            display: block;
            width: 1.25rem;
            height: 0.125rem;
            margin: 0.375rem auto;
            background: var(--light);
            transition: var(--transition-all-ease-in-out);
        }

        &.active {
            span {
                margin: 4px auto;

                &:nth-child(1) {
                    opacity: 0;
                }

                &:nth-child(2) {
                    transform: rotate(45deg);
                }

                &:nth-child(3) {
                    transform: rotate(-45deg) translate(3px, -4px);
                }
            }
        }
    }
</style>
