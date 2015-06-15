// Before a credit card is submitted to a financial institution, it generally makes sense to run some simple reality checks on the number. The numbers are a good length and it's common to make minor transcription errors when the card is not scanned directly.

// The first check people often do is to validate that the card matches a known pattern from one of the accepted card providers. 

// Here's how to validate if a card is valid or not:

// - Starting with the first digit and continuing with every other digit, multiply by 2
// - Sum all doubled and untouched digits in the number
// - If that sum is a multiple of 10, the number is valid


// For example, given the card number 4408 0412 3456 7893:

// Step 0: 4 4 0 8 0 4 1 2 3 4 5  6 7  8 9  3
// Step 1: 8 4 0 8 0 4 2 2 6 4 10 6 14 8 18 3
// Step 2: 8+4+0+8+0+4+2+2+6+4+1+0+6+1+4+8+1+8+3 = 70
// Step 3: 70 % 10 == 0

// That card is valid.

// One more example, 4417 1234 5678 9112:

// Step 0: 4 4 1 7 1 2 3 4 5  6 7  8 9  1 1 2
// Step 1: 8 4 2 7 2 2 6 4 10 6 14 8 18 1 2 2
// Step 2: 8+4+2+7+2+2+6+4+1+0+6+1+4+8+1+8+1+2+2 = 69
// Step 3: 69 % 10 != 0

// Write a function `isValidCC(ccnum)` that takes a string and returns `true` if the credit card entered is valid, `false` otherwise.

var sum = (...numbers) => numbers.reduce((a, v) => a+v, 0)

function isValid(ccnum){
	var parsed_ccnum = ccnum.replace(/[^0-9]/g, '')
	if(typeof ccnum !== "string" || parsed_ccnum.length !== 16) {
		throw new Error('Expected input is a string with 16 digits')
	}
	var digits = parsed_ccnum.split('')
	var step0 = digits.map((v, i) => (i%2===0) ? v*2 : v*1)
	//context is null if 'this' is not used in original function (we don't care about it)
	var sum_of_digits = sum.apply(null, step0)
	return sum_of_digits%10 === 0
}


// tests
// ---
console.assert(isValid("4408 0412 3456 7893") === false)
console.assert(isValid("5000000000000000") === true)




// Write a function sum_matrix() that sums all 
// numbers in the input matrix and returns 
// that sum.
// 
// sum_matrix() should use Array.reduce()

// function sum_matrix(matrix){
// 	return matrix.reduce(function(a, v, i){
// 		return a+v.reduce(function(a, v, i) {
// 			return a+v
// 		}, 0)
// 	}, 0)
// }

// function sum_matrix(matrix){
// 	_.flattenDeep(matrix).reduce(function(a, v, i) {
// 		return a+v
// 	}, 0)
// }

function sum_matrix(matrix){
	return matrix.reduce(function(a, v, i){
		if (typeof v === 'number'){
			return a+v
		} else{
			return sum_matrix(v) + a
		}
	}, 0)
}


// tests
// ---
var test1 = [ [1,2,3] ]
console.assert( sum_matrix(test1) === 6 )
var test2 = [ [1,2,3], [4,5,6] ]
console.assert(sum_matrix(test2) === 21)

var test3 = [
    [5,11,87,49,52,99],
    [20,5,67,34,12],
    [92,57,91,77,45,29,56,38,18,68,92,26,42,55,46],
    [56,18,10,92,54,14,84,79],
    [32,34,27,1.1,87,24,97],
    [93,2,78,45,96,94,16,74,99,14,33],
    [72,41,56,89,12,45,68,29,83,78,58,17,11,69],
    [29,26,38,96,99,2,54],
    [41,48,24,25,63,11,39],
    [4,27,40,88,10,59,90]
]

console.assert(sum_matrix(test3) === 4267.1)

