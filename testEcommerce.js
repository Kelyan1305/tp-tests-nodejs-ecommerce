const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket
} = require("./appEcommerce");


function testAdd() {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  const ok = basket.items.length === 1 && basket.totalPrice === 100;
  console.log("testAdd:", ok ? "OK" : "ERREUR");
  return ok;
}

function testRemove() {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  const ok = basket.items.length === 0 && basket.totalPrice === 0;
  console.log("testRemove:", ok ? "OK" : "ERREUR");
  return ok;
}

function testAddRemove() {
  const basket = new Basket();
  const item = { name: "Carte graphique", price: 300 };
  addToBasket(basket, item);
  const ok1 = basket.items.length === 1 && basket.totalPrice === 300;
  removeFromBasket(basket, item);
  const ok2 = basket.items.length === 0 && basket.totalPrice === 0;
  const ok = ok1 && ok2;
  console.log("testAddRemove:", ok ? "OK" : "ERREUR");
  return ok;
}

function testTransactionAllowed() {
  const user = { name: "Perceval", balance: 500 };
  const ok1 = transactionAllowed(user, 400) === true;
  const ok2 = transactionAllowed(user, 600) === false;
  const ok = ok1 && ok2;
  console.log("testTransactionAllowed:", ok ? "OK" : "ERREUR");
  return ok;
}

function testPayBasket() {
  const user = { name: "Perceval", balance: 500 };
  const basket = new Basket();
  const item = { name: "Processeur", price: 300 };
  addToBasket(basket, item);
  payBasket(user, basket);
  const ok1 = user.balance === 200;
  payBasket(user, basket);
  const ok2 = user.balance === 200;
  const ok = ok1 && ok2;
  console.log("testPayBasket:", ok ? "OK" : "ERREUR");
  return ok;
}

function testAppEcommerce() {
  let success = testAdd();
  success = success && testRemove();
  success = success && testAddRemove();
  success = success && testTransactionAllowed();
  success = success && testPayBasket();
  if (success) console.log("\n✅ Tous les tests sont OK !");
  else console.log("\n❌ ERREUR : Certains tests ont échoué.");
}

testAppEcommerce();
