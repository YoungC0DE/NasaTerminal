<template>
    <div>
        <span v-html="loadRequestText"></span>
        <b v-if="requestError.show">
            {{ requestError.msg }}
        </b>
        <div v-if="apiResult.length > 0" :class="hasMultipleResults ? '' : 'api-commands'">
            <div v-if="hasMultipleResults">
                <div v-for="(data, index) in apiResult" :key="index" class="api-commands" style="margin-bottom: 2rem;">
                    <DecoratorLine :caracter="'-'" />
                    <span v-for="(data2, index2) in data" :key="index2">
                        <b>{{ index2 }}:</b> {{ data2 }}
                    </span>
                </div>
            </div>
            <span v-for="(data, index) in apiResult" :key="index + 99" v-else>
                <b>{{ data.value }}:</b> {{ data.text }}
            </span>
        </div>
    </div>
</template>

<script>
import {
    APOD_COMMAND,
    ASTEROIDS_FEED_COMMAND,
    ASTEROIDS_LOOKUP_COMMAND,
    REQUEST_TEXT_ANIME,
    WRONG_MGS_TEXT
} from '@/core/helpers/constants.js';
import ApiService from '@/core/services/api.service.js'
import { sleep, randomNumber, toggleInput } from "@/core/helpers/utils.js"
import DecoratorLine from "@/assets/components/DecoratorLine.vue";

export default {
    name: 'ApiCommands',
    components: { DecoratorLine },
    props: {
        command: { type: String, required: true },
        params: { type: String, default: '' },
    },
    data() {
        return {
            apiResult: [],
            startRequest: false,
            hasMultipleResults: false,
            loadRequestText: '',
            requestError: {
                show: false,
                msg: ''
            }
        }
    },
    mounted() {
        this.getApiData()
    },
    methods: {
        async animationText() {
            for (let lineText of REQUEST_TEXT_ANIME) {
                let randomTime = randomNumber(500, 1000)
                await sleep(randomTime)
                for (let text of lineText) {
                    await sleep(10)
                    this.loadRequestText += text
                }
            }
        },
        getEndpoint(command) {
            var endpoint = ''
            if (command == APOD_COMMAND) {
                endpoint = 'Apod'
            }

            if (command == ASTEROIDS_FEED_COMMAND) {
                endpoint = 'AsteroidsFeed'
            }

            if (command == ASTEROIDS_LOOKUP_COMMAND) {
                endpoint = 'AsteroidsLookup'
            }

            return endpoint
        },
        async getApiData() {
            var parsedCommand = this.command.split('--')
            var command = parsedCommand.shift().trim().toUpperCase()
            var params = {}

            parsedCommand.forEach(item => {
                let param = item.split('=')[0].trim()
                let value = item.split('=')[1].trim()

                params[param] = value.replaceAll("'", '')
            })

            var endpoint = this.getEndpoint(command)

            if (endpoint == '') {
                this.requestError = {
                    show: true,
                    msg: WRONG_MGS_TEXT
                }
                return;
            }

            toggleInput();
            this.startRequest = true
            await this.animationText()

            ApiService[endpoint](params)
                .then(({ data }) => {
                    if (!data) {
                        return;
                    }

                    this.handlerData(data)
                })
                .catch(error => {
                    this.requestError = {
                        show: true,
                        msg: this.getErrorAxios(error)
                    }
                })
            toggleInput();
        },
        getErrorAxios(error) {
            var msgError = error

            try {
                msgError = error.response.data.msg
            } catch (e) { }

            try {
                msgError = error.message
            } catch (e) { }

            return msgError
        },
        handlerData(data) {
            if (Array.isArray(data)) {
                this.apiResult = data
                this.hasMultipleResults = true;
                return;
            }

            this.hasMultipleResults = false;
            for (let index in data) {
                let objectData = {
                    value: index,
                    text: data[index]
                }

                this.apiResult.push(objectData)
            }
        }
    }
}
</script>

<style scoped>
.api-commands {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #649a6421;
    padding: 1rem;
    border-radius: 8px;
}
</style>