/*
P8: Digital IO => Direction Left / right
P12 : Digital IO => Start / Stop
P1: endstopRight
P2: endstopLeft
*/

let direction = 0; // STOP  // 1 = West  // -1 = East
let endstopLeft = false;
let endstopRight = false;
let autorun = 1;
let secondCount = 10;

function stop() {

    pins.digitalWritePin(DigitalPin.P12, 0)

    if (autorun == 1 && wait()) {
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
            return false;
        }
        basic.showNumber(count)
    }
    return true;
}

function GoReverse() {
    switch(direction)
    {
        case -1 : GoWest;
        case 1 : GoEast;
    }
}

function GoWest() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    control.waitMicros(1000)
    images.arrowImage(ArrowNames.West).showImage(0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    direction = -1;
}

function GoEast() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    control.waitMicros(1000)
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
        return;
    }

    if (endstopLeft && direction == -1) {
        stop();
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

//stop();

GoWest()

basic.forever(function () {
    HandleEvent();

})
