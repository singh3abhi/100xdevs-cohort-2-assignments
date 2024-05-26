/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

// Optimized Solution
function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }

  let arr = Array(26).fill(0);

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length; i++) {
    let asciiValue1 = str1.charCodeAt(i) - 'a'.charCodeAt(0);
    let asciiValue2 = str2.charCodeAt(i) - 'a'.charCodeAt(0);

    arr[asciiValue1]++;
    arr[asciiValue2]--;
  }


  for (let i = 0; i < 26; i++) {
    if (arr[i] != 0) {
      return false;
    }
  }

  return true;

}

function isAnagramNaive(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }

  let arr1 = Array(128).fill(0);
  let arr2 = Array(128).fill(0);

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length; i++) {
    let a = str1.charCodeAt(i);
    let b = str2.charCodeAt(i);

    arr1[a]++;
    arr2[b]++;
  }

  for (let i = 0; i < 128; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }

  return true;
}

isAnagram('hello', 'world');

module.exports = isAnagram;
