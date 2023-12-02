<template>
    <div class="content">
        <div class="computer" @click="focusOnInput" @keypress.enter="run">
            <div class="monitor">
                <div class="screen">
                    <p v-html="headerText"></p>
                    <table class="commands_list">
                        <thead>
                            <tr>
                                <th>Commands</th>
                                <th>Params</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(command, index1) in commands" :key="index1">
                                <td>{{ command.name }}</td>
                                <td>-t -r</td>
                                <td>{{ command.details }}</td>
                            </tr>
                        </tbody>
                    </table>

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
            agent: 'nasa@root:~#',
            history: [],
            maxlengthInput: 15,
            commands: [
                { name: 'APOD', details: 'list someting' }
            ]
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
                Repository: 'https://github.com/YoungC0DE/NasaTerminal',
                NasaAPI: 'https://api.nasa.gov/'
            }

            let headerText = 'Welcome to Nasa Terminal'
            headerText += '<br><br>'
            headerText += `Created by: <a href="${refs.Owner}" style="color: #00ff00" target="_blank">${refs.Owner}</a>`
            headerText += `<br>Template by: <a href="${refs.chatGPT}" style="color: #00ff00" target="_blank">${refs.chatGPT}</a>`
            headerText += `<br>Repository: <a href="${refs.Repository}" style="color: #00ff00" target="_blank">${refs.Repository}</a>`
            headerText += `<br>Nasa API: <a href="${refs.NasaAPI}" style="color: #00ff00" target="_blank">${refs.NasaAPI}</a>`
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
@import url('@/assets/css/HomeView.css');
</style>