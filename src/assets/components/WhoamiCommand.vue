<template>
    <div class="whoami-container">
        <div v-for="(link, index) in links" :key="index">
            {{ link.title }}
            <li>
                <a :href="link.url" class="link" target="_blank">{{ link.url }}</a>
            </li>
        </div>
    </div>
</template>

<script>
import { REFERENCES } from "@/core/helpers/constants.js"

export default {
    name: 'WhoamiCommand',
    data() {
        return {
            links: [
                { title: 'CREATED BY', url: REFERENCES.Owner },
                { title: 'TEMPLATE BY', url: REFERENCES.chatGPT },
                { title: 'REPOSITORY', url: REFERENCES.Repository },
                { title: 'NASA API', url: REFERENCES.NasaAPI },
            ],
        };
    },
}
</script>

<style scoped>
.whoami-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: square;
}

.link {
    color: var(--text-color);
    font-style: italic;
    text-decoration: none;
}
</style>