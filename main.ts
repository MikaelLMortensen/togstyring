/*
    P8:  Digital IO => Direction Left / right
    P12: Digital IO => Start / Stop
    P16: Digital IO => Skiftespor
    P1: endstopRight
    P2: endstopLeft
*/

let direction = 0; // STOP  // 1 = West  // -1 = East
let endstopLeft = false;
let endstopRight = false;
let autorun = 1;
let secondCount = 5;
let trackChange = 0;

function stop() {

    pins.digitalWritePin(DigitalPin.P12, 0)

    if (autorun == 1 && wait() == 1) {
        GoReverse();
    } else {
        images.iconImage(IconNames.Square).showImage(0)
        direction = 0;
    }
}

function wait() {
    let count = secondCount;
    while (count-- > 0) {
        if (input.buttonIsPressed(Button.B) ||
            input.buttonIsPressed(Button.A) ||
            input.buttonIsPressed(Button.AB)) {
            return 0;
        }
        basic.showNumber(count)
    }
    return 1;
}

function ChangeTrack() {
/*    
    if (trackChange == 0) {
        pins.digitalWritePin(DigitalPin.P16, 0)
        trackChange = 1
    } else {
        pins.digitalWritePin(DigitalPin.P16, 1)
        trackChange = 0
    }
    */
}

function GoReverse() {
    ChangeTrack()
    switch(direction)
    {
        case 1 : 
            GoWest;
        break;
        case -1 : 
            GoEast;
        break;
    }
}

function GoWest() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P16, 0)
    control.waitMicros(300)
    images.arrowImage(ArrowNames.West).showImage(0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    direction = -1;
}

function GoEast() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    control.waitMicros(300)
    images.arrowImage(ArrowNames.East).showImage(0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    direction = 1;
}

function HandleEvent() {
    let val = pins.analogReadPin(AnalogPin.P2);
    endstopLeft = (val > 500);
    val = pins.analogReadPin(AnalogPin.P1);
    endstopRight = (val > 500);

    if (endstopRight && direction == 1) {
        stop();
        GoWest();
        return;
    }

    if (endstopLeft && direction == -1) {
        stop();
        GoEast();
        return;
    }

    if (input.buttonIsPressed(Button.A)) {
        autorun = 0;

        if (endstopLeft) {
            return;
        }

        if (direction == -1) {
            stop();
            return;
        }

        ChangeTrack()
        GoWest()
        return;
    }

    if (input.buttonIsPressed(Button.B)) {
        autorun = 0;
        if (endstopRight) {
            return;
        }

        if (direction == 1) {
            stop();
            return;
        }

        ChangeTrack()
        GoEast()

        return;
    }


    if (input.buttonIsPressed(Button.AB)) {
        autorun = 1;
        basic.showString("A")
        if (endstopRight) {
            GoWest();
            return;
        }

        if (endstopLeft) {
            GoEast();
            return;
        }

        GoEast()
        return;
    }
}

stop();

GoEast()

basic.forever(function () {
    HandleEvent();
})
