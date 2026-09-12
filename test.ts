neopixelRgbLed.initSingle(DigitalPin.P0)
neopixelRgbLed.showColor(neopixelRgbLed.Target.SingleLed, NeoPixelColors.Red)

neopixelRgbLed.initRing8(DigitalPin.P1)
neopixelRgbLed.alternatingTwoColors(
    neopixelRgbLed.Target.Ring8,
    NeoPixelColors.Blue,
    NeoPixelColors.Yellow
)

neopixelRgbLed.initStrip(DigitalPin.P2, 30)
neopixelRgbLed.setBrightness(neopixelRgbLed.Target.Strip, 80)
neopixelRgbLed.setPixel(neopixelRgbLed.Target.Strip, 1, NeoPixelColors.Green)
