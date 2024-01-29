<template>
    <div class="content">
        <div class="computer">
            <div class="monitor">
                <HeaderComponent />
                <div class="screen" @click="focusOnInput" @keypress.enter="run" ref="autoScroll">
                    <IntroHeader />
                    <div class="history" v-for="(data, index) in history" :key="index">
                        <div class="input-historic">
                            <p>{{ agent }}</p>
                            <div>{{ data }}</div>
                        </div>
                        <div v-if="isApiCommand(data)" class="command-output">
                            <ApiCommands :command="data.trim()" />
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
                        <input type="text" ref="inputText" v-model="input">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HelpCommand from '@/assets/components/nativeCommands/HelpCommand.vue';
import {
    HELP_COMMAND,
    CLEAR_COMMAND,
    ABOUT_COMMAND,
    WHOAMI_COMMAND,
    APOD_COMMAND,
    ASTEROIDS_FEED_COMMAND,
    ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js';
import HeaderComponent from '@/assets/components/HeaderComponent.vue';
import UnknowCommandReport from '@/assets/components/UnknowCommandReport.vue';
import AboutCommand from '@/assets/components/nativeCommands/AboutCommand.vue';
import WhoamiCommand from '@/assets/components/nativeCommands/WhoamiCommand.vue';
import IntroHeader from '@/assets/components/IntroHeader.vue';
import ApiCommands from '@/assets/components/getApiCommand.vue';

export default {
    components: { HelpCommand, HeaderComponent, UnknowCommandReport, AboutCommand, IntroHeader, WhoamiCommand, ApiCommands },
    data() {
        return {
            input: '',
            agent: 'nasa@root:~#',
            history: [],
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
            newData = newData[0] ?? ''

            if (newData.toLowerCase() === expected) {
                return true
            }

            return false
        },
        getUnknowInput(data = '') {
            if (data == '') {
                return false
            }

            let newData = data.trim().split(' ')

            let commands = [
                HELP_COMMAND,
                ABOUT_COMMAND,
                CLEAR_COMMAND,
                WHOAMI_COMMAND,
                APOD_COMMAND,
                ASTEROIDS_FEED_COMMAND,
                ASTEROIDS_LOOKUP_COMMAND
            ]

            if (
                commands.includes(newData[0]) ||
                commands.includes(newData[0].toUpperCase())
            ) {
                return false
            }

            return true
        },
        isApiCommand(data = '') {
            if (data == '') {
                return false
            }

            let commands = [
                APOD_COMMAND,
                ASTEROIDS_FEED_COMMAND,
                ASTEROIDS_LOOKUP_COMMAND
            ]

            let newData = data.trim().split(' ')
            newData = newData[0] ?? ''

            if (commands.includes(newData.toUpperCase())) {
                return true
            }

            return false
        }
    }
}
</script>

<style scoped>
@import url('@/assets/css/HomeView.css');
</style>