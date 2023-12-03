<template>
    <div class="decorator">
        <div v-for="i in number" :key="i">{{ caracter }}</div>
    </div>
</template>
<script>
export default {
    name: "DecoratorLine",
    props: {
        caracter: { type: String, default: '=' },
        number: { type: Number, default: 10 }
    }
}
</script>

<style scoped>
.decorator {
    display: flex;
    flex-direction: row;
}
</style>