export class Time {
    private static _time?: number;
    private static _deltaTime: number = 0.0;

    private static _getCurrentTime(): number {
        return Date.now() / 1000.0;
    }

    static update() {
        const seconds = Time._getCurrentTime();
        Time._deltaTime = Time._time ? seconds - Time._time : 0.0;
        Time._time = seconds;
    }

    /**
     * Time in seconds since the first call on Time.update().
     */
    static get time(): number {
        if (!Time._time) Time._time = Time._getCurrentTime();
        return Time._time;
    }

    /**
     * Time in seconds between two last Time.update() calls.
     */
    static get deltaTime() {
        return Time._deltaTime;
    }
}