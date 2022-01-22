import {screen, Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Scene} from "./scene";
import {Time} from "./time";
import {ApplicationPublisher} from "./application_publisher";

export class Application {
    private _screenWidth?: number;
    private _screenHeight?: number;

    private _interval?: NodeJS.Timer;

    private _screen?: Screen;
    private _scene?: Scene;

    start() {
        this._screen = screen({
            title: "Dinonode",
            smartCSR: true,
        });

        Time.update();
        this._scene = new Scene(this._screen);

        this._screen.key(['escape', 'q', 'C-c'], (_ch, _key) => {
            this._closeHandler();
        });

        if (this._interval !== undefined) return;
        this._interval = setInterval(() => {
            this._updateHandler();
        }, 20);
    }

    private readonly _updateHandler = (): void => {
        Time.update();

        if (this._screen && this._scene) {
            this._scene.update();
            this._screen.render();

            const w: number = this._screen.width as number;
            const h: number = this._screen.height as number;
            if (w !== this._screenWidth || h !== this._screenHeight) {
                this._screenWidth = w;
                this._screenHeight = h;
                ApplicationPublisher.getInstance().emit("onWindowResize", w, h);
            }
        }
    }

    private readonly _closeHandler = (): void => {
        if (this._interval !== undefined) {
            clearInterval(this._interval);
        }
        this._scene?.destroy();
        this._screen?.destroy();
        // return process.exit(0);
    }
}