<template>
    <div>
        <div v-if="requestError.show">
            Resquest error: {{ requestError.msg }}
        </div>
        <span v-html="loadRequestText"></span>
        <div v-if="apiResult.length > 0">
            <div v-if="hasMultipleResults">
                <div v-for="(data, index) in apiResult" :key="index" class="api-commands" style="margin-bottom: 2rem;">
                    <DecoratorLine :caracter="'-'" :expand="true" />
                    <span v-for="(data2, index2) in data" :key="index2">
                        <b>{{ index2 }}:</b> {{ data2 }}
                    </span>
                </div>
            </div>
            <span v-for="(data, index) in apiResult" :key="index + 99" v-else class="api-commands">
                <b>{{ data.value }}:</b> {{ data.text }}
            </span>
        </div>
    </div>
</template>

<script>
import {
    APOD_COMMAND,
    ASTEROIDS_FEED_COMMAND,
    ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js';
import ApiService from '@/core/services/api.service.js'
import { sleep, randomNumber } from "@/core/helpers/utils.js"
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
            let requestText = [
                'Start request for Nasa API...<br>',
                '...<br>',
                'Trying to Authenticate ....<br>',
                '...<br>',
                'Autenticate sucessful ...<br>',
                '...<br>',
                'Fetching data ...<br>',
                '...<br>',
                '..<br>',
                '<br><br>'
            ]

            for (let lineText of requestText) {
                let randomTime = randomNumber(500, 1000)
                await sleep(randomTime)
                for (let text of lineText) {
                    await sleep(10)
                    this.loadRequestText += text
                }
            }
        },
        async getApiData() {
            var parsedCommand = this.command.split('--')
            var command = parsedCommand.shift().trim().toUpperCase()
            var endpoint = ''
            var params = {}

            parsedCommand.forEach(item => {
                let param = item.split('=')[0].trim()
                let value = item.split('=')[1].trim()

                params[param] = value.replaceAll("'", '')
            })

            if (command == APOD_COMMAND) {
                endpoint = 'Apod'
            }

            if (command == ASTEROIDS_FEED_COMMAND) {
                endpoint = 'AsteroidsFeed'
            }

            if (command == ASTEROIDS_LOOKUP_COMMAND) {
                endpoint = 'AsteroidsLookup'
            }

            this.startRequest = true
            await this.animationText()

            ApiService[endpoint](params)
                .then(({ data }) => {
                    if (!data) {
                        return;
                    }

                    if (Array.isArray(data)) {
                        this.apiResult = data
                        this.hasMultipleResults = true;
                        return;
                    }

                    this.hasMultipleResults = false;
                    this.handlerData(data)
                })
                .catch(error => {
                    this.requestError = {
                        show: true,
                        msg: error
                    }
                })
        },
        handlerData(object) {
            for (let index in object) {
                let objectData = {
                    value: index,
                    text: object[index]
                }

                this.apiResult.push(objectData)
            }

            console.log(this.apiResult, this.hasMultipleResults)
        }
    }
}
</script>

<style scoped>
.api-commands {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>