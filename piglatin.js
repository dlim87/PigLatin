//FUNCTIONS//

//TEST//
//SAVED FOR LATER
//indexVowel = word.indexOf('a' || 'e' || 'i' || 'o' || 'u')

function pigLatin(longstring) {
  // get input
  //use split to make an array of individual words
  var wordarray = longstring.split(" ");
  //for loop over the array
  for (let word in wordarray) {
    //use function to piggify each word
    //test if the first letter is a vowel (not y)
    if (testVowelNoY(wordarray[word][0])) {
      //use the vowel function (append way)
      wordarray[word] = vowel(wordarray[word])
    } else { //it's consonant (or y), use the consonant function
      wordarray[word] = consonant(wordarray[word])
    }
  }
  //join back together
  wordarray = wordarray.join(" ")
  //output
  return wordarray
}


//piggify FUNCTIONS
//takes in a single word
// split the word into an array using "word.split("")"
//nested ifs to figure out what kind of word it is

//first: check to see if it starts with a vowel (no y)
//TESTED OK//
function vowel(word) {
  var temp =[...word]
  var lastChar=""
  //test to  see if there's punctuation, and if there is pop it to the end
  if(testPunctation(temp[temp.length-1])) {
    console.log(temp);
    lastChar= temp.pop()
    console.log(temp)
  }

  //add "way" to end of word either using concat or spread
  temp = [...temp,"-way",lastChar]
  temp = temp.join("")
  return temp
}

//test console.log(vowel('elephant'))

//second: call the consonant
function consonant(word) { //tested OKAY
  // declare empty arrays to store values
  //array of first syllable
  var syllable = []
  //array of word to add -way to
  var remainder = []
  // within original array find INDEX OF the first instance of a vowel (indexOf wasn't working)
  var vowelIndex = findVowel(word, testVowel)
  var lastChar=""
  //special case hadling
  //3. check to see if it's a 'u'
  if (word[vowelIndex].toLowerCase() === ('u')) {
    // if "u", check to see if the consonant before is a 'q'
    if (word[vowelIndex - 1].toLowerCase() === ('q')) {
      //if 'qu', grab the u and treat it like normal
      vowelIndex = Number(vowelIndex) + 1
    }
  }
  //4. special case for y
  if (word[0].toLowerCase() === 'y') {
    vowelIndex = findVowel(word, testVowelNoY)
  }
  //if it's not a special case, the vowel index remains unchanged
  //run the procedure

  remainder = word.split('') //the left over right-hand part of the word
  //we use split so that we can use splice LATER

  // pop stuff to the left of the index into another array
  syllable = remainder.splice(0, vowelIndex) //the left hand part of the word that we're appending to the end

  // add 'ay' to the end of the new array
  syllable = ['-', ...syllable, 'ay']
  //test punctuation and move it to the end of the word
  if(testPunctation(remainder[(remainder.length-1)])){
    lastChar=remainder.pop()
  }
  //combine the full array into one array
  var fullArray = [...remainder, ...syllable,...lastChar]
  //convert the array back to a string
  var fullWord = fullArray.join('');
  return fullWord
}


//iterates a for loop over a string, and returns an index value for the first vowel
//arguments are the string to test and a function to use to test it
function findVowel(string, func) { //tested OKAY
  for (let i in string) //loop over the whole string
    if (func(string[i].toLowerCase())) { //tests each character in the string to see if it's a vowel
      return i //if it is a vowel, return the index
    }
  return -1
}

//test a single character to see if it's a vowel
function testVowel(char) { //tested OKAY
  return (/^[aeiouy]$/i).test(char) //regEx to test if the char is in aeiouy
}

//test a single character to see if it's a non-y vowel
function testVowelNoY(char) {
  return (/^[aeiou]$/i).test(char) //regEx to test if the char is in aeiou NOT Y
}
function testPunctation(char){
  return (/^[.,?!]$/i).test(char)
}

console.log(pigLatin("orange xylophone. zebra urchin? yarn quad squallor! cool run that"));
