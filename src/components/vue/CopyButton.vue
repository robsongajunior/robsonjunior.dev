<template>
    <button class="btn-copy" @click="copy()">
        <i class="icon-copy" v-if="!status">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" fill="#292D32"/>
                <path opacity="0.4" d="M17.0998 2H12.8998C9.44976 2 8.04977 3.37 8.00977 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V15.99C20.6298 15.95 21.9998 14.55 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="#292D32"/>
            </svg>
        </i>
        <i class="icon-copy-success"  v-if="status">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M17.0998 2H12.8998C9.44976 2 8.04977 3.37 8.00977 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V15.99C20.6298 15.95 21.9998 14.55 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="#292D32"/>
                <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="#292D32"/>
            </svg>
        </i>
    </button>
</template>

<script setup>
    import { ref } from 'vue';

    let status = ref(false);
    const props = defineProps({
        content: {
            type: String,
            required: true
        }
    });

    function copy() {
        const type = "text/plain";
        const blob = new Blob([props.content], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(() => {
            status.value = true;
            setTimeout(function() {
                status.value = false;
            }, 2000)
        }, (error) => {
            console.error(error);
        });
    };
</script>

<style lang="scss" scoped>
    .btn-copy {
        background-color: transparent;
        border: none;

        &:hover {
            cursor: pointer;
        }

        svg {
            width: 48px;
            height: 48px;
        }
    }
</style>
