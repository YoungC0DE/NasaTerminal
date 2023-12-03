<template>
    <div class="content">
        <div class="computer">
            <div class="monitor">
                <HeaderComponent />
                <div class="screen" @click="focusOnInput" @keypress.enter="run" ref="autoScroll">
                    <IntroHeader />
                    <div class="history" v-for="(data, index) in history" :key="index">
                        <div class="input">
                            <p>{{ agent }}</p>
                            <div>{{ data }}</div>
                        </div>
                        <div v-if="resolveData(data, helpCommand)" class="command-output">
                            <HelpCommand />
                        </div>
                        <div v-if="resolveData(data, aboutCommand)" class="command-output">
                            <AboutCommand :command="data.trim()" />
                        </div>
                        <div v-if="resolveData(data, whoamiCommand)" class="command-output">
                            <WhoamiCommand />
                        </div>
                        <div v-if="getUnknowInput(data)" class="command-output">
                            <UnknowCommandReport :textInput="data.trim()" />
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
import HelpCommand from '@/assets/components/HelpCommand.vue';
import { HELP_COMMAND, CLEAR_COMMAND, ABOUT_COMMAND, WHOAMI_COMMAND } from '@/core/helpers/constants.js';
import HeaderComponent from '@/assets/components/HeaderComponent.vue';
import UnknowCommandReport from '@/assets/components/UnknowCommandReport.vue';
import AboutCommand from '@/assets/components/AboutCommand.vue';
import WhoamiCommand from '@/assets/components/WhoamiCommand.vue';
import IntroHeader from '@/assets/components/IntroHeader.vue';

export default {
    components: { HelpCommand, HeaderComponent, UnknowCommandReport, AboutCommand, IntroHeader, WhoamiCommand },
    data() {
        return {
            input: '',
            agent: 'nasa@root:~#',
            history: [],
            maxlengthInput: 15,
            helpCommand: HELP_COMMAND,
            aboutCommand: ABOUT_COMMAND,
            whoamiCommand: WHOAMI_COMMAND,
        };
    },
    mounted() {
        this.focusOnInput()
    },
    methods: {
        focusOnInput() {
            this.$refs.inputText.focus();
        },
        autoScroll() {
            const container = this.$refs.autoScroll;
            container.scrollTop = container.scrollHeight;
        },
        run() {
            this.$nextTick(this.autoScroll())
            let input = this.input;

            if (input.toLowerCase() == CLEAR_COMMAND) {
                this.input = '';
                this.history = [];
                return
            }

            this.history.push(input);
            this.input = '';
        },
        resolveData(data, expected) {
            let newData = data.trim().split(' ')
            newData = newData.shift();
            newData = newData.toLowerCase();

            if (newData === expected) {
                return true
            }

            return false
        },
        getUnknowInput(data) {
            let commands = [
                HELP_COMMAND,
                ABOUT_COMMAND,
                CLEAR_COMMAND,
                WHOAMI_COMMAND
            ]

            if (
                commands.includes(data.trim()) ||
                !data.trim()
            ) {
                return false
            }

            return true
        }
    },
    watch: {
        'input': {
            handler(newVal, oldval) {
                if (newVal.length >= this.maxlengthInput) {
                    this.input = oldval;
                    return
                }
            }
        }
    },
}
</script>

<style scoped>
@import url('@/assets/css/HomeView.css');
</style>