<template>
    <div>
        <span v-html="loadRequestText"></span>
        <b v-if="requestError.show">
            {{ requestError.msg }}
        </b>
        <div v-for="(data, index) in apiResult" :key="index" class="api-commands" style="margin-bottom: 2rem;">
            <div class="title">
                <h2>{{ data.title }}</h2>
                <small>{{ data.date }}</small>
            </div>
            <span>{{ data.explanation }}</span>
            <div class="images">
                <div>
                    <img :src="data.hdurl" alt="Image Full HD">
                    <span>Link: <a :href="data.hdurl" target="_blank">Image Full HD</a></span>
                </div>
                <div>
                    <img :src="data.url" alt="Image HD">
                    <span>Link: <a :href="data.url" target="_blank">Image HD</a></span>
                </div>
            </div>
            <div>
                <p v-if="data.service_version">version: {{ data.service_version }}</p>
                <p v-if="data.copyright">copyright © {{ data.copyright }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {
    APOD_COMMAND,
    REQUEST_TEXT_ANIME,
    WRONG_MGS_TEXT
} from '@/core/helpers/constants.js';
import endpoints from '@/core/config/endpoints.js'
import ApiService from '@/core/services/api.service.js'
import { sleep, randomNumber, toggleInput, date } from "@/core/helpers/utils.js"
import DecoratorLine from "@/assets/components/DecoratorLine.vue";
import IcDocImage from "@/assets/icons/ic-doc-image.vue";

export default {
    name: 'ApiCommands',
    components: { DecoratorLine, IcDocImage },
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
            var parsedCommand = this.command.split('--')
            var command = parsedCommand.shift().trim().toUpperCase()
            var params = {}

            parsedCommand.forEach(item => {
                let param = item.split('=')[0].trim()
                let value = item.split('=')[1].trim()

                params[param] = value.replaceAll("'", '')
            })

            if (command == '') {
                this.requestError = {
                    show: true,
                    msg: WRONG_MGS_TEXT
                }
                return;
            }

            toggleInput();
            this.startRequest = true
            await this.animationText()

            ApiService.get(endpoints[APOD_COMMAND], { params: params })
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
                });

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
    gap: 2rem;
    background-color: var(--bg-api-result);
    padding: 1rem;
    border-radius: 8px;
}
.api-commands .images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}
.api-commands .images div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.api-commands .images span a {
    color: var(--text-color);
}
.api-commands .images img {
    width: 100%;
    height: 20rem;
    border-radius: 8px;
}
</style>