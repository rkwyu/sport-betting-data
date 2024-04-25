class Timer {
    constructor() {
        if (!Timer.instance) {
            Timer.instance = this
        }
        return Timer.instance
    }

    /**
     * Pause execution 
     * @param {int} ms 
     * @returns 
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const timer = new Timer()