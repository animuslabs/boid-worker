export class Timer {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }
    start() {
        this.startTime = Date.now();
        return this;
    }
    stop() {
        this.endTime = Date.now();
        return this;
    }
    get elapsed() {
        return this.endTime - this.startTime;
    }
}
//# sourceMappingURL=timer.js.map