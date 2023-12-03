<template>
    <div>
        <p>Type <b> {{ aboutCommand }} </b> to see the details about a command</p>
        <table class="commands_list">
            <thead>
                <tr>
                    <th>Commands</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(command, index) in commands" :key="index">
                    <td class="command_name">{{ command.name }}</td>
                    <td class="command_details">{{ command.details }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { COMMANDS, ABOUT_COMMAND } from '@/core/helpers/constants.js';
export default {
    name: "HelpCommand",
    data() {
        return {
            commands: COMMANDS,
            aboutCommand: ABOUT_COMMAND
        }
    }
}
</script>

<style scoped>
.commands_list {
    width: 100%;
    text-align: left;
    margin: 2rem 0px;
}

.command_name {
    vertical-align: top;
}

.command_details {
    width: 60em;
    padding-bottom: 1rem;
}

@media (max-width: 600px) {
    .commands_list {
        width: 100%;
    }
}
</style>