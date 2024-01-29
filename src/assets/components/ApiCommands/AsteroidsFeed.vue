<template>
    <div>
        <span v-html="loadRequestText"></span>
        <b v-if="requestError.show">
            {{ requestError.msg }}
        </b>
        <div v-for="(data, index) in apiResult" :key="index" class="api-commands" style="margin-bottom: 2rem;">
            <span v-for="(data2, index2) in data" :key="index2">
                <b>{{ index2 }}:</b> {{ data2 }}
            </span>
        </div>
    </div>
</template>

<script>
import {
    ASTEROIDS_FEED_COMMAND,
    REQUEST_TEXT_ANIME
} from '@/core/helpers/constants.js';
import endpoints from '@/core/config/endpoints.js'
import ApiService from '@/core/services/api.service.js'
import { sleep, randomNumber, toggleInput, date } from "@/core/helpers/utils.js"

export default {
    name: 'ApiCommands',
    props: {
        params: { type: Object },
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
            for (let lineText of REQUEST_TEXT_ANIME) {
                let randomTime = randomNumber(500, 1000)
                await sleep(randomTime)
                for (let text of lineText) {
                    await sleep(10)
                    this.loadRequestText += text
                }
            }
        },
        async getApiData() {
            toggleInput();
            this.startRequest = true
            await this.animationText()

            if (!this.params.start_date) {
                this.params.start_date = date().currentDate;
            }

            ApiService.get(endpoints[ASTEROIDS_FEED_COMMAND], {params: this.params})
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
                return;
            }

            this.apiResult.push(data)
        }
    }
}
</script>

<style>
.api-commands {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--bg-api-result);
    padding: 1rem;
    border-radius: 8px;
}
</style>