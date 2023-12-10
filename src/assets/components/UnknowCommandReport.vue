<template>
    <div>
        <div v-if="textInput == ''" v-text="wrongRequest"></div>
        <div v-else>
            The command <b>{{ textInput }}</b> not exist.<br>
            if it appears in the command list, it will be a future feature
        </div>
    </div>
</template>

<script>
import { WRONG_MGS_TEXT } from '@/core/helpers/constants.js'

export default {
    name: 'UnknowCommandReport',
    props: {
        textInput: { type: String, default: '' },
    },
    data() {
        return {
            wrongRequest: WRONG_MGS_TEXT
        }
    }
}
</script>