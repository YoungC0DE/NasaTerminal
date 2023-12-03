<template>
    <div class="header">
        <div class="actions">
            <div v-for="(item) in number_buttons" :key="item" @click="changeTheme(item)">
            </div>
        </div>
    </div>
</template>

<script>
import { THEMES } from '@/core/helpers/constants';
export default {
    name: 'HeaderComponent',
    data() {
        return {
            number_buttons: 3
        }
    },
    methods: {
        changeTheme(id) {
            let theme = THEMES.find(value => value.id == id);

            let html = document.querySelector('html');
            html.setAttribute('data-theme', theme.name);
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 2.3rem;
    background: #1d1d1d;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 0px 1.2rem;
}

.header .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.header .actions div {
    cursor: pointer;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: #ffbd2e;
}

.header .actions div:first-child {
    background-color: #27c93f;
}

.header .actions div:last-child {
    background-color: #ff5f56;
}

.header .actions div:hover {
    box-shadow: 0px 0px 8px 0px #ffbd2e;
}

.header .actions div:first-child:hover {
    box-shadow: 0px 0px 8px 0px #27c93f;
}

.header .actions div:last-child:hover {
    box-shadow: 0px 0px 8px 0px #ff5f56;
}
</style>