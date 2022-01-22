import {TypedEmitter} from "tiny-typed-emitter";

export interface ApplicationEvents {
    "onWindowResize": (width: number, height: number) => void;
}

export class ApplicationPublisher extends TypedEmitter<ApplicationEvents> {
    private static _instance: ApplicationPublisher | undefined = undefined;

    static getInstance(): ApplicationPublisher {
        if (ApplicationPublisher._instance === undefined) {
            ApplicationPublisher._instance = new ApplicationPublisher();
        }
        return ApplicationPublisher._instance;
    }
}