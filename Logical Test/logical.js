//     QUESTION NO. 1
// Define an array of numbers (use any random numbers).
// Write a program to print only the even numbers of the array.
// Do not use any library functions, need to do via for loops only


function evenNumber(array){
    let res = []
    for(let i=0; i<array.length; i++){
        if (array[i] % 2===0){
            res.push(array[i]);
        }
    }
    return res;
}


console.log(evenNumber([ 5, 20, 11, 42, 2, 19 ]))








//                  Question 2
// Find the maximum consecutive 1's in an array of 0's and 1's.
// Example:
// a) 00110001001110 - Output :3 [Max num of consecutive 1's is 3]
// b) 1000010001 - Output :1 [Max num of consecutive 1's is 1]

function maxConsecutive(arr){
    let result = 0;
    let count = 0;
    for (let i=0; i<arr.length; i++){           // using for loop to iterate all array element
        if(arr[i] === 0){
            count = 0;
        }
        else{
            count += 1;
            result  = count > result ? count : result;
        }
    }
    return result;
}

console.log(maxConsecutive([1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1,] ))






//                     QUESTION 3 
// Suppose you have an array of 101 integers. 
// This array is already sorted and all numbers in this array are consecutive. 
// Each number only occurs once in the array except one number which occurs twice. 
// Write a js code to find the repeated number.
// e.g $arr = array(0,1,2,3,4,5,6,7,7,8,9,10...................);


function repetedElement(a, n){
   
    console.log("Repeted Elements.......")
    for (let i =0; i< n; i++){
        for (let j =i+1; j<n; j++){
            if(a[i] === a[j]){
                console.log(a[i] + ' ')
            }
        }
    }
}

let arr = [0,1,2,3,4,5,6,7,7,8,9,10];
let arr_size = arr.length;
repetedElement(arr, arr_size);
 







//                      QUESTION NO. : 5
// Assume there is a object of this format 
// var obj = {
//  “id” : 4, “name” : “abc”,
//  “id” : 10, “name” : “ab2”,
//  “id” : 5, “name” : “abc3”,
//  “id” : 6, “name” : “abc5”
// }
// It can be a dictionary or java object, as per your language of choice. But its key/value pair dictionary simply.

// Write a code to sort the object by id 
// I.e final output should have objected sort by id’s



var obj = [
    { 'id' : 4, 'name' : 'abc',},
    { 'id' : 10, 'name' : 'abc2',},
    { 'id' : 5, 'name' : 'abc3',},
    { 'id' : 6, 'name' : 'abc5'}
    ]



function compare_id(a, b){
// a should come before b in the sorted order
if(a.id < b.id){
        return -1;
// a should come after b in the sorted order
}else if(a.id > b.id){
        return 1;
// a and b are the same
}else{
        return 0;
}
}


console.log(obj.sort(compare_id));