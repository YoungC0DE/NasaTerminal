<template>
    <div v-if="requestError">
        tudo errado
    </div>
    <div class="api-commands" v-else>
        <span v-for="(data, index) in apiResult" :key="index">
            <b>{{ data.value }}:</b> {{ data.text }}
        </span>
    </div>
</template>

<script>
import {
    APOD_COMMAND,
    ASTEROIDS_FEED_COMMAND,
    ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js';
import ApiService from '@/core/services/api.service.js'

export default {
    name: 'ApiCommands',
    props: {
        command: { type: String, required: true },
        params: { type: String, default: '' },
    },
    data() {
        return {
            apiResult: [],
            requestError: false
        }
    },
    mounted() {
        this.getApiData()
    },
    methods: {
        getApiData() {
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

            ApiService[endpoint](params)
                .then(({ data }) => {
                    if (!data) {
                        return;
                    }

                    for (let index in data) {
                        let objectData = {
                            value: index,
                            text: data[index]
                        }

                        this.apiResult.push(objectData)
                    }
                })
                .catch(error => {
                    this.requestError = true
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