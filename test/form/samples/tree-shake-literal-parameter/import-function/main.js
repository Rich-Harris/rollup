import { add1, add2, add3 } from './lib.js'

function foo(bar) {
	bar();
}

console.log(add1(1, 2, true));
console.log(add2(1, 2)); // unused should be treated as undefined
console.log(foo(add3))
