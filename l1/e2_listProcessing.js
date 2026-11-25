// EXERCISE 2

function alphabeticNumberSort(arr) {
  const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  const arrWords = arr.map(num => NUMBER_WORDS[num]);

  return arrWords
    .sort()
    .map(item => NUMBER_WORDS.indexOf(item));
}

// shorter alternative with localeCompare
function alphabeticNumberSort(arr) {
  const NUMBER_WORDS = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen',
    'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];

  return arr
    .slice()
    .sort((num1, num2) => NUMBER_WORDS[num1].localeCompare(NUMBER_WORDS[num2]));
}

// LS SOLUTION

function wordSort(num1, num2) {
  const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five',
                        'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
                        'twelve', 'thirteen', 'fourteen', 'fifteen',
                        'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  if (NUMBER_WORDS[num1] > NUMBER_WORDS[num2]) {
    return 1;
  } else if (NUMBER_WORDS[num1] < NUMBER_WORDS[num2]) {
    return -1;
  } else {
    return 0;
  }
}

function alphabeticNumberSort(array) {
  return [...array].sort(wordSort);
}

// EXERCISE 3

function multiplyAllPairs(arr1, arr2) {
  let newArr = [];

  for (let num1 of arr1) {
    for (let num2 of arr2) {
      newArr.push(num1 * num2);
    }
  }

  return newArr.sort((a,b) => a - b);
}

// LS SOLUTION

function multiplyAllPairs(array1, array2) {
  const result = [];

  array1.forEach(number1 => {
    array2.forEach(number2 => {
      result.push(number1 * number2);
    });
  });

  return result.sort((a, b) => a - b);
}

// EXERCISE 4

function sumOfSums(arr) {
  const newArr = [];
  for (let idx = 0; idx < arr.length; idx++) {
    newArr.push(arr.slice(0, idx + 1));
  }

  return newArr
    .flat()
    .reduce((sum, num) => sum + num);
}

// LS SOLUTION

function sumOfSums(numbers) {
  return numbers.map((number, idx) => numbers.slice(0, idx + 1)
                                             .reduce((sum, value) => sum + value))
                                             .reduce((sum, value) => sum + value);
}

// EXERCISE 5

function leadingSubstrings(str) {
  let arr = str.split('')

    return arr.map((char, idx) => arr
      .slice(0, idx + 1)
      .reduce((sum, char) => sum + char));
}

// SIMPLER SOLUTION
function leadingSubstrings(str) {
  return str.split('').map((_, idx) => str.slice(0, idx + 1));
}

// LS SOLUTION
function leadingSubstrings(string) {
  let substrings = [];
  for (let length = 1; length <= string.length; length += 1) {
    substrings.push(string.slice(0, length));
  }

  return substrings;
}

// EXERCISE 6

function substrings(str) {
  const finalArr = [];

  for (let startidx = 0; startidx < str.length; startidx++) {
    for (let endIdx = startidx; endIdx < str.length; endIdx++) {
      finalArr.push(str.slice(startidx, endIdx + 1));
    }
  }

  return finalArr;
}

// LS solution
function substrings(string) {
  let substrings = [];
  for (let startIndex = 0; startIndex < string.length; startIndex += 1) {
    let substring = string.substring(startIndex);
    substrings = substrings.concat(leadingSubstrings(substring));
  }

  return substrings;
}

function leadingSubstrings(string) {
  let substrings = [];
  for (let length = 1; length <= string.length; length += 1) {
    substrings.push(string.slice(0, length));
  }

  return substrings;
}

// EXERCISE 7
function isPalindrome(word) {
  return word.length > 1 && word === word.split('').reverse().join('');
}

function palindromes(string) {
  return substrings(string).filter(isPalindrome);
}

// EXERCISE 9

const transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                       { id: 105, movement: 'in',  quantity: 10 },
                       { id: 102, movement: 'out', quantity: 17 },
                       { id: 101, movement: 'in',  quantity: 12 },
                       { id: 103, movement: 'out', quantity: 15 },
                       { id: 102, movement: 'out', quantity: 15 },
                       { id: 105, movement: 'in',  quantity: 25 },
                       { id: 101, movement: 'out', quantity: 18 },
                       { id: 102, movement: 'in',  quantity: 22 },
                       { id: 103, movement: 'out', quantity: 15 }, ];

function transactionsFor(idNum, transactions) {
  return transactions.filter(transaction => transaction['id'] === idNum);
}

console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]

// EXERCISE 10

function isItemAvailable(idNum, transactions) {
  let available = 0;
  transactionsFor(idNum, transactions)
    .forEach(transaction => transaction['movement'] === 'in' ? available += transaction['quantity']: available -= transaction['quantity']);

  return available > 0;
}

// using reduce

function transactionsFor(idNum, transactions) {
  return transactions.filter(transaction => transaction['id'] === idNum);
}

function isItemAvailable(idNum, transactions) {
  const quantity = transactionsFor(idNum, transactions)
    .reduce((sum, transaction) => {
      return transaction['movement'] === 'in'
        ? sum + transaction['quantity']
        : sum - transaction['quantity'];}, 0);

  return quantity > 0;
}

// sames as below but without {} in the reduce function

function isItemAvailable(idNum, transactions) {
  const quantity = transactionsFor(idNum, transactions)
    .reduce((sum, transaction) =>
      transaction['movement'] === 'in'
        ? sum + transaction['quantity']
        : sum - transaction['quantity'], 0);

  return quantity > 0;
}
