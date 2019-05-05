var tailwindcss = require('tailwindcss');
var cssnano = require('cssnano');

module.exports = {
  plugins: [
  	tailwindcss('./tailwind.js'),
  	cssnano({ preset: 'default' })
	]
}
