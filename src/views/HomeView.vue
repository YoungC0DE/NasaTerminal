<template>
    <div class="content">
        <div class="computer" @click="focusOnInput" @keypress.enter="run">
            <div class="monitor">
                <div class="screen">
                    <p v-html="headerText"></p>
                    <div class="history input" v-for="(data, index) in history" :key="index">
                        <p>{{ agent }}</p>
                        <div>{{ data }}</div>
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
export default {
    data() {
        return {
            headerText: '',
            input: '',
            agent: 'home@root:~#',
            history: [],
            maxlengthInput: 15
        }
    },
    mounted() {
        this.loadHeaderText();
    },
    methods: {
        loadHeaderText() {
            let refs = {
                Owner: 'https://github.com/YoungC0DE',
                chatGPT: 'https://chat.openai.com',
                Repository: 'https://github.com/YoungC0DE/NasaTerminal'
            }

            let headerText = 'Welcome to Nasa Terminal'
            headerText += '<br><br>'
            headerText += `Created by: <a href="${refs.Owner}" style="color: #00ff00" target="_blank">${refs.Owner}</a>`
            headerText += `<br>Template by: <a href="${refs.chatGPT}" style="color: #00ff00" target="_blank">${refs.chatGPT}</a>`
            headerText += `<br>Repository: <a href="${refs.Repository}" style="color: #00ff00" target="_blank">${refs.Repository}</a>`
            headerText += '<br><br>'
            headerText += 'Commands:'
            headerText += '<br> - Show'
            headerText += '<br> - Clear'
            headerText += '<br> - Open'
            headerText += '<br><br>'

            this.headerText = headerText
        },
        focusOnInput() {
            this.$refs.inputText.focus()
        },
        run() {
            this.history.push(this.input)
            this.input = ''
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
    }
}
</script>

<style scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #1a1a1a;
}

.computer {
    width: 75%;
    height: 75%;
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}

.monitor {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.screen {
    width: 100%;
    height: 100%;
    background-color: #000;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    line-height: 1.2;
}

p {
    margin: 0;
}

.input {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.input input {
    border: none;
    background: none;
    outline: none;
    cursor: default
}

input,
.screen {
    color: #00ff00;
    font-size: 14pt;
    font-family: consolas, 'Courier New', monospace;
}

/* Estilizar a barra de rolagem do terminal */
.screen::-webkit-scrollbar {
    width: 12px;
}

.screen::-webkit-scrollbar-thumb {
    background-color: #00ff00;
    border-radius: 10px;
}

.screen::-webkit-scrollbar-track {
    background-color: #333;
}

@media (max-width: 600px) {
    .computer {
        width: 95%;
        height: 50%;
    }

    input,
    .screen {
        font-size: 1rem;
    }
}
</style>