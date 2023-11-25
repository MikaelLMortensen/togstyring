pins.digitalWritePin(DigitalPin.P0, 1)
pins.digitalWritePin(DigitalPin.P1, 1)
pins.digitalWritePin(DigitalPin.P2, 1)
images.iconImage(IconNames.Square).showImage(0)
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        images.iconImage(IconNames.Square).showImage(0)
    }
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        control.waitMicros(1000)
        images.arrowImage(ArrowNames.East).showImage(0)
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
    if (input.buttonIsPressed(Button.B)) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        control.waitMicros(1000)
        images.arrowImage(ArrowNames.West).showImage(0)
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
})
