import {Time} from "./time";

export type AfterAnimationCallback = (() => void) | null;

export abstract class State {
    protected _frameDuration: number = -1;
    protected _framesCount: number = 1;

    private _frameTime?: number;
    private _frameIndex: number = 0;

    protected abstract setFrameDuration(): void;

    protected readonly _frames: string[];
    protected readonly _isLooped: boolean;

    private _animationCompleted: boolean = false;
    private readonly _afterAnimationCallback: AfterAnimationCallback;

    protected constructor(frames: string[], isLooped: boolean, afterAnimationCallback: AfterAnimationCallback = null) {
        this._frames = frames;
        this._isLooped = isLooped;
        this._afterAnimationCallback = afterAnimationCallback;
        this._framesCount = frames.length;
        this.setFrameDuration();
        this.clear();
    }

    clear() {
        this._frameTime = undefined;
        this._frameIndex = 0;
        this._animationCompleted = false;
    }

    private setNextFrame(): void {
        if (this._framesCount <= 1) return;
        if (this._isLooped) {
            this._frameIndex = (++this._frameIndex) % this._framesCount;
        } else {
            this._frameIndex++;
            if (this._frameIndex / this._framesCount < 1) return;
            this._frameIndex = this._framesCount - 1;
            if (!this._animationCompleted) {
                this._animationCompleted = true;
                if (this._afterAnimationCallback !== null) this._afterAnimationCallback();
            }
        }
    }

    update(): boolean {
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
}