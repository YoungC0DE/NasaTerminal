<template>
    <div class="content">
        <div class="computer" @click="focusOnInput" @keypress.enter="run">
            <div class="monitor">
                <div class="screen">
                    <p v-html="headerText"></p>
                    <div class="history" v-for="(data, index) in history" :key="index">
                        <div class="input">
                            <p>{{ agent }}</p>
                            <div>{{ data }}</div>
                        </div>
                        <div v-if="data.toLowerCase() == helpCommand">
                            <CommandList />
                        </div>
                        <div v-else>
                            The command <b>{{ data }}</b> not exist.
                            <br>if it appears in the list, it will be a future feature
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
        run() {
            if (this.input == CLEAR_COMMAND) {
                this.input = '';
                return this.history = [];
            }
            this.history.push(this.input);
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
    components: { CommandList }
}
</script>

<style scoped>
@import url('@/assets/css/HomeView.css');
</style>