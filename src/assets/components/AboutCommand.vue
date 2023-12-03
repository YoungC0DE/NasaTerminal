<template>
    <div>
        <div v-if="unknowCommand">
            <UnknowCommandReport :textInput="invalidComand" />
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
            arrayCommand: []
        };
    },
    mounted() {
        this.arrayCommand = this.command.split(' ');

        this.validateData()

        if (this.unknowCommand) {
            return;
        }

        this.getParam();
    },
    methods: {
        resolveCommand() {
            this.arrayCommand.shift()
            let command = this.arrayCommand.shift();

            return command;
        },
        getParam() {
            let command = this.resolveCommand().toUpperCase()
            let paramsByCommand = COMMANDS.find(value => value.name === command);

            if (paramsByCommand == undefined) {
                this.invalidComand = command
                return this.unknowCommand = true
            }

            this.params = paramsByCommand.params;
        },
        validateData() {
            let arrayCommand = this.arrayCommand;
            arrayCommand = arrayCommand.shift()

            if (
                this.arrayCommand.length === 0 ||
                arrayCommand.length === 0
            ) {
                return this.unknowCommand = true
            }
        }
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