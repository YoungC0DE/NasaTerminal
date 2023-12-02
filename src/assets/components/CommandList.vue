<template>
    <table class="commands_list">
        <thead>
            <tr>
                <th>Commands</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(command, index) in commands" :key="index">
                <td class="command_name"> - {{ command.name }}</td>
                <td class="command_details">{{ command.details }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { COMMANDS } from '@/core/helpers/constants.js';
export default {
    name: "CommandList",
    data() {
        return {
            commands: COMMANDS
        }
    }
}
</script>

<style>
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