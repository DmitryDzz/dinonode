import {Time} from "./time";

export abstract class State {
    protected _frameDuration: number = -1;
    protected _framesCount: number = 1;

    private _frameTime?: number;
    private _frameIndex: number = 0;

    protected abstract setFrameDuration(): void;
    protected abstract setFramesCount(): void;

    private readonly _frames: string[];

    protected constructor(frames: string[]) {
        this._frames = frames;
        this.setFrameDuration();
        this.setFramesCount();
        this.clear();
    }

    clear() {
        this._frameTime = undefined;
        this._frameIndex = 0;
    }

    private setNextFrame(): void {
        if (this._framesCount <= 1) return;
        this._frameIndex = (++this._frameIndex) % this._framesCount;
    }

    isFrameReady(): boolean {
        if (this._frameTime === undefined) {
            this._frameTime = Time.time;
            return true;
        }

        if (this._framesCount <= 1) {
            return false;
        }

        const time = Time.time;
        if (time - this._frameTime > this._frameDuration) {
            this._frameTime = time;
            this.setNextFrame();
            return true;
        }

        return false;
    }

    get frame(): string { return this._frames[this._frameIndex]; }

    abstract isLeftDirection(): boolean;
}