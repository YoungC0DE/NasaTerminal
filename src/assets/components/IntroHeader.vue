<template>
    <div class="into-header">
        <p style="margin-bottom: 1rem;">
            <DecoratorLine :number="title.length" :mode="'side'">
                {{ title }}
            </DecoratorLine>
        </p>
        <p class="intro">
        <div>
            <IcNasa />
        </div>
        <div class="intro-text">
            {{ tmpIntroText }}
        </div>
        </p>
        <div style="margin-top: 1rem;">
            <p> Type <b> {{ helpCommand }} </b> to get the list of commands</p>
            <p> Type <b> {{ clearCommand }} </b> to clear the terminal </p>
            <p> Type <b> {{ whoamiCommand }} </b> to see information about this project </p>
        </div>
    </div>
</template>

<script>
import { HELP_COMMAND, CLEAR_COMMAND, WHOAMI_COMMAND, INTRO_TEXT, INTRO_TITLE } from "@/core/helpers/constants.js"
import DecoratorLine from "@/assets/components/DecoratorLine.vue";
import IcNasa from "@/assets/icons/ic-nasa.vue";
import { sleep } from "@/core/helpers/utils.js"

export default {
    name: 'IntroHeader',
    components: { DecoratorLine, IcNasa },
    data() {
        return {
            tmpIntroText: '',
            title: INTRO_TITLE,
            helpCommand: HELP_COMMAND,
            clearCommand: CLEAR_COMMAND,
            whoamiCommand: WHOAMI_COMMAND,
            caractersToBreak: ['.', ','],
        };
    },
    mounted() {
        this.animationText();
    },
    methods: {
        async animationText() {
            for (let text of INTRO_TEXT) {
                let second = text == ' ' ? 100 : 50
                await sleep(second)
                this.tmpIntroText += text
            }
        }
    }
}
</script>

<style scoped>
.into-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: square;
    margin-bottom: 2rem;
}

.intro {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.intro-text {
    max-width: 35rem;
}
</style>