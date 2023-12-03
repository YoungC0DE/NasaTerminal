<template>
    <div>
        <br>
        The command <b>{{ textInput }}</b> not exist.
        <br>if it appears in the helper list, it will be a future feature
        <br><br>
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