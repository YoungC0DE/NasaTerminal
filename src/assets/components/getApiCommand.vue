<template>
    <div v-if="currentCommand == apodCommand">
        <Apod :params="params"/>
    </div>
    <div v-if="currentCommand == asteroidsFeed">
        <AsteroidsFeed :params="params"/>
    </div>
    <div v-if="currentCommand == asteroidsLookup">
        <AsteroidsLookup :params="params"/>
    </div>
</template>

<script>
import Apod from '@/assets/components/ApiCommands/Apod.vue';
import AsteroidsFeed from '@/assets/components/ApiCommands/AsteroidsFeed.vue';
import AsteroidsLookup from '@/assets/components/ApiCommands/AsteroidsLookup.vue';
import {
    APOD_COMMAND, 
    ASTEROIDS_FEED_COMMAND, 
    ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js';

export default {
    name: 'getApiCommand',
    components: {Apod, AsteroidsFeed, AsteroidsLookup},
    props: {
        command: {type: String, required: true}
    },
    data() {
        return {
            params: {},
            currentCommand: '',
            apodCommand: APOD_COMMAND,
            asteroidsFeed: ASTEROIDS_FEED_COMMAND,
            asteroidsLookup: ASTEROIDS_LOOKUP_COMMAND
        }
    },
    mounted() {
        this.getCommand();
    },
    methods: {
        getCommand() {
            var parsedCommand = this.command.split('--');
            var command = parsedCommand.shift().trim().toUpperCase();
            var that = this;

            parsedCommand.forEach(item => {
                let param = item.split('=')[0].trim()
                let value = item.split('=')[1].trim()

                that.params[param] = value.replaceAll("'", '')
            })

            this.currentCommand = command;
        }
    }
}
</script>