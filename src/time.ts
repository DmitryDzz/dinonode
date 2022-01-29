export class Time {
    private static _realTime?: number;
    private static _deltaRealTime: number = 0.0;
    private static _time?: number;
    private static _deltaTime: number = 0.0;
    private static _factor: number = 1.0;

    private static _getCurrentTime(): number {
        return Date.now() / 1000.0;
    }

    static setFactor(timeFactor: number) {
        Time._factor = timeFactor;
    }

    static update() {
        const seconds = Time._getCurrentTime();

        Time._deltaRealTime = Time._realTime === undefined ? 0.0 : seconds - Time._realTime;
        Time._realTime = seconds;

        Time._deltaTime = Time._deltaRealTime * Time._factor;
        Time._time = (Time._time ?? Time._realTime) + this._deltaTime;
    }

    // noinspection JSUnusedGlobalSymbols
    static get realTime(): number {
        if (Time._realTime === undefined) Time._realTime = Time._getCurrentTime();
        return Time._realTime;
    }

    // noinspection JSUnusedGlobalSymbols
    static get deltaRealTime() {
        return Time._deltaRealTime;
    }

    /**
     * Game time in seconds since the first call on Time.update().
     */
    static get time(): number {
        if (Time._time === undefined) Time._time = Time._getCurrentTime();
        return Time._time;
    }

    /**
     * Game time in seconds between two last Time.update() calls.
     */
    static get deltaTime() {
        return Time._deltaTime;
    }
}