# 7-segment (FND)

Kaluma library for multi-digit 7-segment display (aka. FND - flexible numeric display). This support flexible number of digits, so it can be used for 1-digit, 2-digit, 3-digit, 4-digit and more.

Each segment is labeled as below:

```
    a
   ---
f |   | b
   -g-
e |   | c
   --- . dp
    d
```

# Wiring

Here is a wiring example with a 4-digit 7-segment display (common-cathode type).

| Raspberry Pi Pico | Resistor | FND (4-digit)   |
| ----------------- | -------- | --------------- |
| GP0               | 220(Ohm) | a               |
| GP1               | 220(Ohm) | b               |
| GP2               | 220(Ohm) | c               |
| GP3               | 220(Ohm) | d               |
| GP4               | 220(Ohm) | e               |
| GP5               | 220(Ohm) | f               |
| GP6               | 220(Ohm) | g               |
| GP7               | 220(Ohm) | dp              |
| GP21              |          | COM1            |
| GP20              |          | COM2            |
| GP19              |          | COM3            |
| GP18              |          | COM4            |

![wiring](https://github.com/niklauslee/7-segment/blob/main/images/wiring.jpg?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/7-segment
```

# Usage

Here is an example for a 4-digit FND:

```js
const FND = require('7-segment').FND;
const segments = [0, 1, 2, 3, 4, 5, 6, 7]; // 'a' to 'dp'
const digits = [21, 20, 19, 18]; // digit-0 to digit-3
const fnd = new FND(segments, digits);

fnd.display(25.4, 1);
fnd.on();
```

If you are using a common-anode type, create an instance with an option as below:

```js
const fnd = new FND(segments, digits, {type: FND.ANODE});
```

If you are using 1-digit display and connect the common pin to GND (cathode) or 3V3 (anode), you can omit the digits parameter as below:

```js
// common cathode
const fnd = new FND(segments);

// common anode
const fnd = new FND(segments, [], {type: FND.ANODE});
```

If you want to display non-numeric characters, you can use `setDigit()` with segment data.

```js
// display 'E' on digit-0.
var seg = FND_SEG_A | FND.SEG_F | FND.SEG_E | FND.SEG_D | FND.SEG_G;
fnd.setDigit(seg, 0);

// or,
var seg = 0b01111001;
fnd.setDigit(seg, 0);
```

# API

## Class: FND

### new FND(segments, digits[, options])

- **`segments`** `<number[]>` An array of pin numbers for segments (in the order of `a`, `b`, `c`, `d`, `e`, `f`, `g`, and `dp`).
- **`digits`** `<number[]>` An array of pin numbers for common-cathode(or anode) of each digits. The pin number should be in the order of digit-0 (left-most), digit-1, ..., digit-n (right-most).
- **`options`** `<object>` Options.
  - `type` `<number>` The type of FND. `FND.CATHODE`(=`0`) for common-cathode type or `FND.ANODE`(=`1`) for common-anode type. Default: `0`. 
  - `fps` `<number>` Number of frames per a second. It means how many shows all digits in a second. Greater value is more faster. Default: `60`.

Create an instance of FND class.

### setDigit(data, digit)

- **`data`** `<number>`
- **`digit`** `<number>`

Set the segment data at the digit in the internal buffer.

```js
const FND = require('7-segment').FND;
// ...
// turn on 'b' and 'c' on digit-0.
var seg = FND.SEG_B | FND.SEG_C; 
fnd.setDigit(seg, 0);
```

### display(value, fixed)

- **`value`** `<number>`
- **`fixed`** `<number>` Default: `0`.

Display the number on the display with the size of fixed point. The number will not be displayed until you call `on()`.

```js
fnd.display(25.687, 0); // show `26`.
fnd.display(25.647, 1); // show `25.6`.
fnd.display(25.647, 2); // show `25.65`.
```

### clear()

Clear the display. This means that clear the internal buffer.

### on()

Turn on the display.

### off()

Turn off the display.

### FND.CATHODE

- `<number>` = `0`

### FND.ANODE

- `<number>` = `1`

### FND.SEG_A

- `<number>` = `0b00000001`

### FND.SEG_B

- `<number>` = `0b00000010`

### FND.SEG_C

- `<number>` = `0b00000100`

### FND.SEG_D

- `<number>` = `0b00001000`

### FND.SEG_E

- `<number>` = `0b00010000`

### FND.SEG_F

- `<number>` = `0b00100000`

### FND.SEG_G

- `<number>` = `0b01000000`

### FND.SEG_DP

- `<number>` = `0b10000000`

### FND.NUM

- `<number[]>`

An array of segment data for numbers from 0 to 9.
