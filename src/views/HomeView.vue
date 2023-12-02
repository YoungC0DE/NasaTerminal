<template>
    <div class="external-screen">
        <div class="terminal-screen">
            <img src="@/assets/frame.png" class="frame">
            <img src="@/assets/scanlines.png" class="scanlines">
            <div class="terminal-info">
                <p>Nasa terminal created in 2023 by YoungC0DE</p>
                <p>In this terminal you can get some infos about nasa by the Nasa-Api</p>
                <p>Comands:</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.external-screen {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.terminal-screen {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    color: lime;
    font-family: monospace;
    font-size: 200%;
    padding: 4% 8%;
}

.frame,
.scanlines {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
}

.frame {
    z-index: 2;
}

.scanlines {
    z-index: 1;
    opacity: 0.6;
    filter: contrast(.3);
}
</style>