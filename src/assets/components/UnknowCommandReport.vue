<template>
    <div>
        <div v-if="textInput == ''">
            Incorrect argument. Type <b>/about</b> + <i>command</i>
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
        textInput: { type: String, required: true }
    }
}
</script>