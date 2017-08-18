import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ShuttleService {
    public shuttleTimeEvent: EventEmitter<number> = new EventEmitter();
    public readonly shuttleDate: number = new Date("2017-08-20T18:00:00.000Z").getTime();
    constructor() {
        setInterval(() => {
            this.shuttleTimeEvent.emit(this.calcShuttleMinute());
        }, 1000 * 60);
    }
    public calcShuttleMinute(): number {
        let diff : number = Math.floor((Date.now() - this.shuttleDate) / (1000 * 60)) + 60;
        if (diff < 0) {
            return 0;
        } else if (diff <= 60) {
            return diff;
        } else if (diff <= 120) {
            return diff - 60;
        }
        return 60; // over...
    }
}
