/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let resObj = {};

  transactions.forEach((element, index) => {
    let category = element.category;
    let price = element.price;

    let categoryExists = resObj.hasOwnProperty(category);

    if (categoryExists) {
      resObj[category] += price;
    } else {
      resObj[category] = price;
    }

  });



  let enteries = Object.entries(resObj);


  let res = [];

  for (const val of enteries) {
    let obj = {
      "category": val[0],
      "totalSpent": val[1],
    }
    res.push(obj);
  }
  return res;


}

module.exports = calculateTotalSpentByCategory;
