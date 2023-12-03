<template>
    <div class="content">
        <div class="computer">
            <div class="monitor">
                <HeaderComponent />
                <div class="screen" @click="focusOnInput" @keypress.enter="run" ref="autoScroll">
                    <p v-html="headerText"></p>
                    <div class="history" v-for="(data, index) in history" :key="index">
                        <div class="input">
                            <p>{{ agent }}</p>
                            <div>{{ data }}</div>
                        </div>
                        <div v-if="data == helpCommand">
                            <CommandList />
                        </div>
                        <div v-else-if="data">
                            <br>
                            The command <b>{{ data }}</b> not exist.
                            <br>if it appears in the helper list, it will be a future feature
                            <br><br>
                        </div>
                    </div>
                    <div class="input">
                        <p>{{ agent }}</p>
                        <input type="text" ref="inputText" v-model="input" :maxlength="maxlengthInput" :max="maxlengthInput">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommandList from '@/assets/components/CommandList.vue';
import { HELP_COMMAND, CLEAR_COMMAND, ABOUT_COMMAND, REFERENCES } from '@/core/helpers/constants.js';
import HeaderComponent from '../assets/components/HeaderComponent.vue';

export default {
    data() {
        return {
            headerText: '',
            input: '',
            agent: 'nasa@root:~#',
            history: [],
            maxlengthInput: 15,
            helpCommand: HELP_COMMAND
        };
    },
    mounted() {
        this.loadHeaderText();
    },
    methods: {
        loadHeaderText() {
            let linkSetup = 'style="color: #00ff00" target="_blank"';

            this.headerText = 'Welcome to Nasa Terminal'
                + '<br><br>'
                + `Created by: <a href="${REFERENCES.Owner}" ${linkSetup}>${REFERENCES.Owner}</a>`
                + `<br>Template by: <a href="${REFERENCES.chatGPT}" ${linkSetup}>${REFERENCES.chatGPT}</a>`
                + `<br>Repository: <a href="${REFERENCES.Repository}" ${linkSetup}>${REFERENCES.Repository}</a>`
                + `<br>Nasa API: <a href="${REFERENCES.NasaAPI}" ${linkSetup}>${REFERENCES.NasaAPI}</a>`
                + '<br><br>'
                + 'Type <b>/help</b> to get the list of commands'
                + '<br>Type <b>/clear</b> to clear the terminal'
                + '<br><br>';
        },
        focusOnInput() {
            this.$refs.inputText.focus();
        },
        autoScroll() {
            const container = this.$refs.autoScroll;
            container.scrollTop = container.scrollHeight;
        },
        run() {
            this.$nextTick(this.autoScroll())
            let input = this.input.toLowerCase();

            if (input == CLEAR_COMMAND) {
                this.input = '';
                return this.history = [];
            }

            this.history.push(input);
            this.input = '';
        },
    },
    watch: {
        'input': {
            handler(newVal, oldval) {
                if (newVal.length >= this.maxlengthInput) {
                    return this.input = oldval;
                }
            }
        }
    },
    components: { CommandList, HeaderComponent }
}
</script>

<style scoped>
@import url('@/assets/css/HomeView.css');
</style>