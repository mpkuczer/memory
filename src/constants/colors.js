export default {
  blueBg: function (lvl) {
    if (lvl <= 14) {
      return `hsl(193, 100%, ${24-lvl + 1}%)`
    } else {
      return `hsl(${193 + 2*lvl - 30}, 100%, 11%)`
    }
  },
  blueBtn: function (lvl) {
    if (lvl <= 14) {
      return `hsl(193, 100%, ${24-lvl-4 + 1}%)`
    } else {
      return `hsl(${193 + 2*lvl - 30}, 100%, 7%)`
    }
  },

  red: '#6a040f',
  green: '#679436',
  white: '#eaeaea',
  gray: '#333333',
};

