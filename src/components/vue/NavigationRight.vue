<template>
    <aside id="navigationRight" :class="{ active: isActive }">
        <ul>
            <li>
                <a
                    href="https://medium.com/@robsongajunior"
                    title="medium profile"
                    target="_blank">

                    blog
                </a>
            </li>
            <li>
                <a
                    href="https://github.com/robsongajunior/"
                    title="github profile"
                    target="_blank">

                    github
                </a>
            </li>
            <li>
                <a
                    href="/sobre/"
                    title="sobre | robsonjunior.dev">

                    sobre
                </a>
            </li>
        </ul>
    </aside>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useStore } from '@nanostores/vue';
    import { isMenuActive } from '../../nanostores/BurguerButton.js';

    let isActive = useStore(isMenuActive);

    onMounted(() => {
        (function () {
            let lastScrollTop = 0;
            let showHeader = true;
            let f = {};
            let navigationRight = document.querySelector("#navigationRight");

            f.up = function () {
                if (showHeader === true) return;
                navigationRight.style.top = '80px';
                navigationRight.style.height = 'calc(100vh - 80px)';
                showHeader = true;
            };

            f.down = function () {
                if (showHeader === false) return;
                navigationRight.style.top = '0';
                navigationRight.style.height = '100vh';
                showHeader = false;
            };

            window.addEventListener("scroll", function (e) {
                if (e.scrollY === lastScrollTop) return;

                let direction = this.scrollY < lastScrollTop ? "up" : "down";
                lastScrollTop = this.scrollY;

                if (typeof f[direction] !== "function") return;

                f[direction]();
            }, true);
        })();
    });
</script>

<style lang="scss" scoped>
    aside {
        position: fixed;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        width: 0;
        max-width: calc(100% - 1rem);
        height: calc(100vh - 80px);
        z-index: 10;
        transition: var(--transition-all-ease-in-out);

        &.active {
            width: 360px;
            padding: 1rem;

            ul {
                li {
                    a {
                        opacity: 1;
                    }
                }
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                border-bottom: solid 1px rgba( 255, 255, 255, 0.075);

                a {
                    display: block;
                    opacity: 0;
                    transition: var(--transition-all-ease-in-out);
                    padding: .5rem 0.5rem;
                    color: var(--median);
                    border-bottom: 1px solid transparent;
                    text-decoration: none;
                    font-size: 0.8rem;

                    &.active {
                        text-decoration: none;
                        color: var(--dark);
                    }
                }
            }
        }
    }
</style>
