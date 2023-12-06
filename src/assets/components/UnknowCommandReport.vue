<template>
    <div>
        <div v-if="textInput == ''">
            Incorrect argument.
        </div>
        <div v-else>
            The command <b>{{ textInput }}</b> not exist.<br>
            if it appears in the helper list, it will be a future feature
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnknowCommandReport',
    props: {
        textInput: { type: String, default: '' },
    }
}
</script>