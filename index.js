const NUM = [
  0b00111111, // 0
  0b00000110, // 1
  0b01011011, // 2
  0b01001111, // 3
  0b01100110, // 4
  0b01101101, // 5
  0b01111101, // 6
  0b00100111, // 7
  0b01111111, // 8
  0b01101111, // 9
];

class FND {
  constructor(segments, digits = [], options = {}) {
    this.seg = segments.reverse();
    this.dig = digits.reverse();
    this.buf = new Array(this.dig.length || 1);
    this.buf.fill(0);
    options = Object.assign(
      {
        type: FND.CATHODE,
        fps: 60,
      },
      options
    );
    this.type = options.type;
    this.fps = options.fps;
    this.timer = null;
    pinMode(this.seg, OUTPUT);
    pinMode(this.dig, OUTPUT);
    digitalWrite(this.seg, 0x0000);
    digitalWrite(this.dig, 0x0000);
  }

  _set(data, digit) {
    digitalWrite(this.dig, this.type ? 0x0000 : 0xffff);
    digitalWrite(this.seg, this.type ? ~data : data);
    if (this.dig.length > digit) {
      digitalWrite(this.dig[digit], this.type ? HIGH : LOW);
    }
  }

  setDigit(data, digit) {
    this.buf[this.buf.length - digit - 1] = data;
  }

  display(value, fixed = 0) {
    var s = value.toFixed(fixed).replace(".", "");
    for (let i = 0; i < this.buf.length; i++) {
      let c = s.charCodeAt(s.length - i - 1) - 48;
      this.buf[i] = i < s.length ? NUM[c] : 0;
      if (fixed > 0 && i === fixed) {
        this.buf[i] = this.buf[i] | FND.SEG_DP;
      }
    }
  }

  clear() {
    this.buf.fill(0);
  }

  on() {
    if (!this.timer) {
      let t = Math.round(1000 / this.fps / this.buf.length);
      let i = 0;
      this.timer = setInterval(() => {
        this._set(this.buf[i], i);
        i++;
        if (i >= this.buf.length) i = 0;
      }, t);
    }
  }

  off() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      digitalWrite(this.seg, 0x0000);
      digitalWrite(this.dig, 0x0000);
    }
  }
}

FND.CATHODE = 0;
FND.ANODE = 1;

FND.SEG_A = 0b00000001;
FND.SEG_B = 0b00000010;
FND.SEG_C = 0b00000100;
FND.SEG_D = 0b00001000;
FND.SEG_E = 0b00010000;
FND.SEG_F = 0b00100000;
FND.SEG_G = 0b01000000;
FND.SEG_DP = 0b10000000;
FND.NUM = NUM;

exports.FND = FND;
