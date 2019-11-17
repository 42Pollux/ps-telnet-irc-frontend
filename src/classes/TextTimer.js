export default {
    delay: 0,
    print(toHistoryWithArgs, promptText, text, delay) {
        setTimeout(function () {
            toHistoryWithArgs(promptText, text);
        }, delay);
    },
    additiveDelay(delay, reset = false) {
        if (reset) {
            this.delay = delay;
        }
        this.delay = delay + this.delay;
        return this.delay;
    }
}