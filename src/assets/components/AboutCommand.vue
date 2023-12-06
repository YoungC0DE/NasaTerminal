<template>
    <div>
        <div v-if="unknowCommand">
            <UnknowCommandReport :textInput="invalidComand"/>
        </div>
        <table class="params_list" v-else>
            <thead>
                <tr>
                    <th>Params</th>
                    <th>Format</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(param, index) in params" :key="index">
                    <td class="param_name">-{{ param.name }}</td>
                    <td>{{ param.format }}</td>
                    <td class="param_description">{{ param.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { COMMANDS } from '@/core/helpers/constants.js';
import UnknowCommandReport from '@/assets/components/UnknowCommandReport.vue';
export default {
    name: "CommandList",
    props: {
        command: { type: String, required: true },
    },
    data() {
        return {
            params: [],
            unknowCommand: false,
            invalidComand: '',
        };
    },
    mounted() {
        this.getParam();
    },
    methods: {
        getParam() {
            let parsedCommand = this.command.split(' ')

            const { command, argument } = {
                command: parsedCommand[0] || '',
                argument: parsedCommand[1] || ''
            }

            this.invalidComand = argument

            if (command == '' || argument == '') {
                this.unknowCommand = true
                return;
            }

            const { params } = COMMANDS.find(value => value.name === argument.toUpperCase());

            if (params == undefined) {
                this.unknowCommand = true
                return
            }

            this.params = params;
        },
    },
    components: { UnknowCommandReport }
}
</script>

<style scoped>
.params_list {
    width: 100%;
    text-align: left;
    margin: 2rem 0px;
}

.param_name {
    vertical-align: top;
}

.param_description {
    width: 55em;
    padding-bottom: 1rem;
}

@media (max-width: 600px) {
    .params_list {
        width: 100%;
    }
}
</style>