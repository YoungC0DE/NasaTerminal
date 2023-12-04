<template>
    <div :class="'decorator-' + mode" ref="decorator">
        <span> {{ caracteres }} </span>
        <div v-if="mode == 'multiple'" class="bySide">
            <span>{{ sideCaracters() }}</span>
            <slot></slot>
            <span>{{ sideCaracters() }}</span>
        </div>
        <div v-else>
            <slot></slot>
        </div>
        <span v-if="mode !== 'single'"> {{ caracteres }} </span>
    </div>
</template>
<script>
export default {
    name: "DecoratorLine",
    props: {
        caracter: { type: String, default: '=' },
        // SIZE: [true/false, width]
        expand: { type: Boolean, default: false },
        number: { type: Number, default: 10 },
        // MODES: single, multiple, side
        mode: { type: String, default: 'single' }
    },
    data() {
        return {
            caracteres: ''
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            var limit = this.number;

            if (this.expand) {
                limit *= 100;
            }

            if (this.mode == 'multiple') {
                limit += (this.sideCaracters().length * 2)
                limit += 2
            }

            for (let i = 1; i <= limit; i++) {
                this.caracteres += this.caracter
            }
        },
        sideCaracters() {
            var chars = Math.round(this.number / 2)
            var caracters = ''

            for (let i = 1; i <= chars; i++) {
                caracters += this.caracter
            }

            return caracters;
        }
    }
}
</script>

<style scoped>
.decorator-single,
.decorator-side,
.decorator-multiple,
.bySide {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
}

.decorator-single {
    flex-direction: column;
}

.decorator-side {
    flex-direction: row;
    gap: 10px;
}

.decorator-multiple {
    flex-direction: column;
}

.decorator-multiple .bySide {
    flex-direction: row;
    gap: 10px;
}
</style>