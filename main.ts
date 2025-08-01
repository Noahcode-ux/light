let pedestrianRequested = false
let raceMode = false

input.onButtonPressed(Button.A, function () {
    pedestrianRequested = true
})

input.onButtonPressed(Button.B, function () {
    if (!raceMode) {
        raceMode = true
        basic.showString("RACE")
    }
})

// Beep helper
function beep() {
    music.playTone(880, music.beat(BeatFraction.Eighth))
}

// Countdown helper
function countdown() {
    for (let i = 3; i > 0; i--) {
        basic.showNumber(i)
        beep()
        basic.pause(400)
    }
    basic.clearScreen()
}

// Pedestrian crossing sequence
function handlePedestrianCrossing() {
    pins.digitalWritePin(DigitalPin.P2, 0) // Green OFF
    pins.digitalWritePin(DigitalPin.P1, 1) // Yellow ON
    beep()
    basic.pause(1000)

    pins.digitalWritePin(DigitalPin.P1, 0) // Yellow OFF
    pins.digitalWritePin(DigitalPin.P0, 1) // Red ON
    beep()
    basic.pause(500)

    countdown()
    basic.showIcon(IconNames.Yes)
    music.playTone(659, music.beat(BeatFraction.Whole))
    basic.pause(3000)
    basic.clearScreen()

    pedestrianRequested = false

    pins.digitalWritePin(DigitalPin.P0, 1) // Red ON
    basic.pause(2000)
}

// Race light sequence — fast blinking red, yellow, green repeatedly
function raceLight() {
    for (let i = 0; i < 10; i++) {
        // Red ON
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        basic.pause(150)

        // Yellow ON
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        music.playTone(1319, music.beat(BeatFraction.Sixteenth))
        basic.pause(150)

        // Green ON
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        music.playTone(1760, music.beat(BeatFraction.Sixteenth))
        basic.pause(150)
    }

    // Turn all OFF at end
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
}

basic.forever(function () {
    if (raceMode) {
        raceLight()
        raceMode = false  // STOP race mode right after sequence
        basic.showString("NORM")
    } else if (pedestrianRequested) {
        handlePedestrianCrossing()
    } else {
        // Normal traffic light cycle

        // Red ON
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(3000)

        // Green ON
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(3000)

        // Yellow ON
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        beep()
        basic.pause(1000)

        // Back to Red ON explicitly
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(1000)
    }
})
