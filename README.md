# pxt_neopixel_rgb_led

MakeCode rozšíření pro BBC micro:bit, které zjednodušuje ovládání:

- jedné adresovatelné RGB LED NeoPixel / WS2812,
- kruhového NeoPixel modulu s 8 LED,
- NeoPixel pásku s uživatelsky nastaveným počtem LED.

Jas lze nastavit v rozsahu `0` až `255`. Pro 8LED kruh je připravený samostatný
blok **nastavit jas NeoPixel kruhu 8 LED na ...**; hodnota `0` LED zhasne.

Rozšíření používá oficiální ovladač `microsoft/pxt-neopixel` a přidává hotové
české bloky pro běžné světelné efekty.

## Zapojení

| NeoPixel | micro:bit |
|---|---|
| `DIN`, `DATA` nebo `IN` | zvolený digitální pin, například `P0` |
| `GND` | `GND` |
| `5V` | externí stabilní zdroj 5 V |

Zem externího zdroje musí být spojena se zemí micro:bitu. NeoPixel kruh ani
delší pásek nenapájej z 3V pinu micro:bitu. Výchozí jas je z bezpečnostních
důvodů nastaven na `80` z `255`.

## Inicializace

- `nastavit jednu NeoPixel RGB LED DATA ...`
- `nastavit NeoPixel kruh 8 LED DATA ...`
- `nastavit NeoPixel pásek DATA ... počet LED ...`

Počet LED pásku si uživatel zadá podle svého konkrétního výrobku. Pozice LED
jsou v ovládacích blocích číslované přehledně od `1`.

## Základní ovládání

- jas `0–255`,
- rozsvícení všech LED jednou barvou,
- nastavení nebo zhasnutí jedné LED bez změny ostatních,
- zhasnutí celého zařízení,
- vlastní barva vytvořená z hodnot červené, zelené a modré `0–255`.

## Efekty

- statický vzor dvou střídajících se barev,
- statický vzor tří barev,
- blikání jednou barvou,
- prohazování dvou barev,
- běžící světlo,
- kometa s postupně slábnoucím ocasem,
- postupné naplnění pásku nebo kruhu,
- pohybující se duha.

U efektů lze nastavit rychlost a u opakovaných efektů také počet kol.

## Import do MakeCode

Po zveřejnění repozitáře vlož do MakeCode v nabídce **Rozšíření** adresu:

`https://github.com/Skyvendik/pxt_neopixel_rgb_led`

## Licence

MIT
