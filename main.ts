/**
 * Easy control of a single NeoPixel RGB LED, an 8 LED NeoPixel ring,
 * and a NeoPixel strip with a user-defined number of LEDs.
 */
//% color="#C2185B" icon="\uf0eb" block="NeoPixel RGB LED" weight=95
namespace neopixelRgbLed {
    const DEFAULT_BRIGHTNESS = 80

    export enum Target {
        //% block="jedna RGB LED"
        SingleLed = 0,
        //% block="kruh 8 LED"
        Ring8 = 1,
        //% block="pásek"
        Strip = 2
    }

    let singleLed: neopixel.Strip = null
    let ring8: neopixel.Strip = null
    let ledStrip: neopixel.Strip = null

    function clampInt(value: number, low: number, high: number): number {
        value = Math.round(value)
        if (value < low) return low
        if (value > high) return high
        return value
    }

    function delayMs(value: number): number {
        return clampInt(value, 20, 5000)
    }

    function getTarget(target: Target): neopixel.Strip {
        if (target == Target.SingleLed) return singleLed
        if (target == Target.Ring8) return ring8
        return ledStrip
    }

    function prepare(strip: neopixel.Strip): void {
        strip.setBrightness(DEFAULT_BRIGHTNESS)
        strip.clear()
        strip.show()
    }

    function showAlternatingFrame(strip: neopixel.Strip, color1: number, color2: number, swap: boolean): void {
        for (let i = 0; i < strip.length(); i++) {
            let first = (i % 2 == 0)
            if (swap) first = !first
            strip.setPixelColor(i, first ? color1 : color2)
        }
        strip.show()
    }

    function scaledColor(color: number, level: number): number {
        level = clampInt(level, 0, 255)
        let red = (color >> 16) & 0xff
        let green = (color >> 8) & 0xff
        let blue = color & 0xff
        return neopixel.rgb(
            Math.idiv(red * level, 255),
            Math.idiv(green * level, 255),
            Math.idiv(blue * level, 255)
        )
    }

    /** Initialize one addressable NeoPixel RGB LED. */
    //% blockId=neopixel_rgb_led_init_single
    //% block="nastavit jednu NeoPixel RGB LED DATA %pin"
    //% pin.defl=DigitalPin.P0
    //% group="Nastavení"
    //% weight=100
    export function initSingle(pin: DigitalPin): void {
        singleLed = neopixel.create(pin, 1, NeoPixelMode.RGB)
        prepare(singleLed)
    }

    /** Initialize a circular NeoPixel ring with exactly 8 LEDs. */
    //% blockId=neopixel_rgb_led_init_ring8
    //% block="nastavit NeoPixel kruh 8 LED DATA %pin"
    //% pin.defl=DigitalPin.P1
    //% group="Nastavení"
    //% weight=95
    export function initRing8(pin: DigitalPin): void {
        ring8 = neopixel.create(pin, 8, NeoPixelMode.RGB)
        prepare(ring8)
    }

    /** Initialize a NeoPixel strip with a user-defined number of LEDs. */
    //% blockId=neopixel_rgb_led_init_strip
    //% block="nastavit NeoPixel pásek DATA %pin počet LED %count"
    //% pin.defl=DigitalPin.P2
    //% count.min=1 count.max=300 count.defl=30
    //% group="Nastavení"
    //% weight=90
    export function initStrip(pin: DigitalPin, count: number): void {
        count = clampInt(count, 1, 300)
        ledStrip = neopixel.create(pin, count, NeoPixelMode.RGB)
        prepare(ledStrip)
    }

    /** Set brightness for the selected device. Use 0 to 255. */
    //% blockId=neopixel_rgb_led_brightness
    //% block="NeoPixel %target jas %brightness"
    //% brightness.min=0 brightness.max=255 brightness.defl=80
    //% group="Nastavení"
    //% weight=80
    export function setBrightness(target: Target, brightness: number): void {
        let strip = getTarget(target)
        if (!strip) return
        strip.setBrightness(clampInt(brightness, 0, 255))
    }

    /** Return the number of LEDs configured for the selected device. */
    //% blockId=neopixel_rgb_led_count
    //% block="počet LED zařízení %target"
    //% group="Nastavení"
    //% weight=70
    export function count(target: Target): number {
        let strip = getTarget(target)
        return strip ? strip.length() : 0
    }

    /** Create a color from red, green and blue values. */
    //% blockId=neopixel_rgb_led_rgb
    //% block="RGB červená %red zelená %green modrá %blue"
    //% red.min=0 red.max=255 red.defl=255
    //% green.min=0 green.max=255 green.defl=0
    //% blue.min=0 blue.max=255 blue.defl=0
    //% group="Barvy"
    //% weight=100
    export function rgb(red: number, green: number, blue: number): number {
        return neopixel.rgb(
            clampInt(red, 0, 255),
            clampInt(green, 0, 255),
            clampInt(blue, 0, 255)
        )
    }

    /** Light every LED with one color. */
    //% blockId=neopixel_rgb_led_show_color
    //% block="NeoPixel %target rozsviť všechny LED %color=neopixel_colors"
    //% group="Ovládání LED"
    //% weight=100
    export function showColor(target: Target, color: number): void {
        let strip = getTarget(target)
        if (!strip) return
        strip.showColor(color)
    }

    /** Set one LED. Positions are numbered from 1. Other LEDs keep their colors. */
    //% blockId=neopixel_rgb_led_set_pixel
    //% block="NeoPixel %target nastav LED číslo %position na %color=neopixel_colors"
    //% position.min=1 position.max=300 position.defl=1
    //% group="Ovládání LED"
    //% weight=95
    export function setPixel(target: Target, position: number, color: number): void {
        let strip = getTarget(target)
        if (!strip) return
        position = Math.round(position) - 1
        if (position < 0 || position >= strip.length()) return
        strip.setPixelColor(position, color)
        strip.show()
    }

    /** Turn off one LED. Positions are numbered from 1. */
    //% blockId=neopixel_rgb_led_clear_pixel
    //% block="NeoPixel %target zhasni LED číslo %position"
    //% position.min=1 position.max=300 position.defl=1
    //% group="Ovládání LED"
    //% weight=90
    export function clearPixel(target: Target, position: number): void {
        setPixel(target, position, 0)
    }

    /** Turn off all LEDs on the selected device. */
    //% blockId=neopixel_rgb_led_clear
    //% block="NeoPixel %target zhasni všechny LED"
    //% group="Ovládání LED"
    //% weight=85
    export function clear(target: Target): void {
        let strip = getTarget(target)
        if (!strip) return
        strip.clear()
        strip.show()
    }

    /** Display two colors alternately across the LEDs. */
    //% blockId=neopixel_rgb_led_pattern2
    //% block="NeoPixel %target vzor barvy %color1=neopixel_colors a %color2=neopixel_colors střídavě"
    //% group="Efekty"
    //% weight=100
    export function alternatingTwoColors(target: Target, color1: number, color2: number): void {
        let strip = getTarget(target)
        if (!strip) return
        showAlternatingFrame(strip, color1, color2, false)
    }

    /** Display a repeating three-color pattern. */
    //% blockId=neopixel_rgb_led_pattern3
    //% block="NeoPixel %target vzor 3 barev %color1=neopixel_colors %color2=neopixel_colors %color3=neopixel_colors"
    //% group="Efekty"
    //% weight=95
    export function alternatingThreeColors(target: Target, color1: number, color2: number, color3: number): void {
        let strip = getTarget(target)
        if (!strip) return
        for (let i = 0; i < strip.length(); i++) {
            let color = color1
            if (i % 3 == 1) color = color2
            else if (i % 3 == 2) color = color3
            strip.setPixelColor(i, color)
        }
        strip.show()
    }

    /** Blink one color on and off. */
    //% blockId=neopixel_rgb_led_blink
    //% block="NeoPixel %target blikej %color=neopixel_colors interval %intervalMs ms opakuj %repetitions krát"
    //% intervalMs.min=20 intervalMs.max=5000 intervalMs.defl=300
    //% repetitions.min=1 repetitions.max=100 repetitions.defl=5
    //% group="Efekty"
    //% weight=90
    export function blink(target: Target, color: number, intervalMs: number, repetitions: number): void {
        let strip = getTarget(target)
        if (!strip) return
        intervalMs = delayMs(intervalMs)
        repetitions = clampInt(repetitions, 1, 100)
        for (let cycle = 0; cycle < repetitions; cycle++) {
            strip.showColor(color)
            basic.pause(intervalMs)
            strip.clear()
            strip.show()
            basic.pause(intervalMs)
        }
    }

    /** Swap two alternating colors repeatedly. On one LED, the two colors alternate. */
    //% blockId=neopixel_rgb_led_alternating_blink
    //% block="NeoPixel %target střídej blikání %color1=neopixel_colors a %color2=neopixel_colors interval %intervalMs ms opakuj %repetitions krát"
    //% intervalMs.min=20 intervalMs.max=5000 intervalMs.defl=300
    //% repetitions.min=1 repetitions.max=100 repetitions.defl=5
    //% group="Efekty"
    //% weight=85
    export function alternatingBlink(target: Target, color1: number, color2: number, intervalMs: number, repetitions: number): void {
        let strip = getTarget(target)
        if (!strip) return
        intervalMs = delayMs(intervalMs)
        repetitions = clampInt(repetitions, 1, 100)
        for (let cycle = 0; cycle < repetitions; cycle++) {
            showAlternatingFrame(strip, color1, color2, false)
            basic.pause(intervalMs)
            showAlternatingFrame(strip, color1, color2, true)
            basic.pause(intervalMs)
        }
    }

    /** Run one light around the ring or along the strip. */
    //% blockId=neopixel_rgb_led_chase
    //% block="NeoPixel %target běžící světlo %color=neopixel_colors rychlost %speedMs ms kola %rounds"
    //% speedMs.min=20 speedMs.max=2000 speedMs.defl=100
    //% rounds.min=1 rounds.max=100 rounds.defl=3
    //% group="Efekty"
    //% weight=80
    export function chase(target: Target, color: number, speedMs: number, rounds: number): void {
        let strip = getTarget(target)
        if (!strip) return
        speedMs = delayMs(speedMs)
        rounds = clampInt(rounds, 1, 100)
        for (let round = 0; round < rounds; round++) {
            for (let position = 0; position < strip.length(); position++) {
                strip.clear()
                strip.setPixelColor(position, color)
                strip.show()
                basic.pause(speedMs)
            }
        }
        strip.clear()
        strip.show()
    }

    /** Run a light with a fading tail. */
    //% blockId=neopixel_rgb_led_comet
    //% block="NeoPixel %target kometa %color=neopixel_colors délka ocasu %tail rychlost %speedMs ms kola %rounds"
    //% tail.min=1 tail.max=20 tail.defl=3
    //% speedMs.min=20 speedMs.max=2000 speedMs.defl=100
    //% rounds.min=1 rounds.max=100 rounds.defl=3
    //% group="Efekty"
    //% weight=75
    export function comet(target: Target, color: number, tail: number, speedMs: number, rounds: number): void {
        let strip = getTarget(target)
        if (!strip) return
        let length = strip.length()
        tail = clampInt(tail, 1, length)
        speedMs = delayMs(speedMs)
        rounds = clampInt(rounds, 1, 100)
        for (let round = 0; round < rounds; round++) {
            for (let head = 0; head < length; head++) {
                strip.clear()
                for (let part = 0; part < tail; part++) {
                    let position = head - part
                    while (position < 0) position += length
                    let level = 255 - Math.idiv(part * 220, tail)
                    strip.setPixelColor(position, scaledColor(color, level))
                }
                strip.show()
                basic.pause(speedMs)
            }
        }
        strip.clear()
        strip.show()
    }

    /** Fill LEDs one after another. */
    //% blockId=neopixel_rgb_led_fill
    //% block="NeoPixel %target postupně naplň %color=neopixel_colors rychlost %speedMs ms"
    //% speedMs.min=20 speedMs.max=2000 speedMs.defl=100
    //% group="Efekty"
    //% weight=70
    export function progressiveFill(target: Target, color: number, speedMs: number): void {
        let strip = getTarget(target)
        if (!strip) return
        speedMs = delayMs(speedMs)
        strip.clear()
        strip.show()
        for (let position = 0; position < strip.length(); position++) {
            strip.setPixelColor(position, color)
            strip.show()
            basic.pause(speedMs)
        }
    }

    /** Move a rainbow around the ring or along the strip. */
    //% blockId=neopixel_rgb_led_rainbow
    //% block="NeoPixel %target pohybující duha rychlost %speedMs ms kola %rounds"
    //% speedMs.min=20 speedMs.max=2000 speedMs.defl=100
    //% rounds.min=1 rounds.max=100 rounds.defl=3
    //% group="Efekty"
    //% weight=65
    export function movingRainbow(target: Target, speedMs: number, rounds: number): void {
        let strip = getTarget(target)
        if (!strip) return
        speedMs = delayMs(speedMs)
        rounds = clampInt(rounds, 1, 100)
        strip.showRainbow(1, 360)
        for (let step = 0; step < strip.length() * rounds; step++) {
            strip.rotate(1)
            strip.show()
            basic.pause(speedMs)
        }
    }
}
