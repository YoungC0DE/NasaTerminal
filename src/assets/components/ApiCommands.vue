<template>
    <div>
        <div v-if="requestError.show">
            Resquest error: {{ requestError.msg }}
        </div>
        <span v-html="loadRequestText"></span>
        <div class="api-commands" v-if="apiResult.length > 0">
            <span v-for="(data, index) in apiResult" :key="index">
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

export default {
    name: 'ApiCommands',
    props: {
        command: { type: String, required: true },
        params: { type: String, default: '' },
    },
    data() {
        return {
            apiResult: [],
            startRequest: false,
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
                let randomTime = randomNumber(500, 2000)
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

                    for (let index in data) {
                        
                        if (Array.isArray(index)) {
                            for (let index2 in index) {
                                let objectData = {
                                    value: index2,
                                    text: index[index2]
                                }
                                this.apiResult.push(objectData)
                            }
                            return;
                        }

                        let objectData = {
                            value: index,
                            text: data[index]
                        }

                        this.apiResult.push(objectData)
                    }
                })
                .catch(error => {
                    this.requestError = {
                        show: true,
                        msg: error
                    }
                })
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