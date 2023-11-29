/*
P8: Digital IO => Direction Left / right
P12 : Digital IO => Start / Stop
*/

let direction = 0; // STOP  // 1 = West  // -1 = East
let endstopLeft = false;
let endstopRight = false;


function stop() {
    pins.digitalWritePin(DigitalPin.P12, 1)
    images.iconImage(IconNames.Square).showImage(0)
    direction = 0;
}

function HandleEvent() {
//    endstopLeft = (pins.analogReadPin(AnalogPin.P1) > 500);
    let val = pins.analogReadPin(AnalogPin.P2);
    //basic.showNumber(val);
    endstopRight = (val > 500);

    if (endstopRight && direction != -1) {
        //basic.showString('A')
        stop;
        return;
    }

    if (endstopLeft && direction != 1) {
        basic.showString('B')
        stop;
        return;
    }

    if (input.buttonIsPressed(Button.AB)) {
        stop;
        return;
    }

    if (input.buttonIsPressed(Button.A)) {
        if (direction == -1) {
            stop;
            return;
        }

        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P8, 1)
        control.waitMicros(1000)
        images.arrowImage(ArrowNames.West).showImage(0)
        pins.digitalWritePin(DigitalPin.P12, 1)
        direction = -1;
        return;
    }

    if (input.buttonIsPressed(Button.B)) {
        if (direction == 1) {
            stop;
            return;
        }
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P8, 0)
        control.waitMicros(1000)
        images.arrowImage(ArrowNames.East).showImage(0)
        pins.digitalWritePin(DigitalPin.P12, 1)
        direction = 1;
        return;
    }
}

stop();

basic.forever(function () {
    HandleEvent();

})
