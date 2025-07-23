import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

const myCart = [];
const myWhishList = [];

console.log("Welcome to the your Shopee Cart!\n");

//criando dois itens
const ferrari = await createItem("hotwheels ferrari", 20.99, 1);
const lamborghini = await createItem("hotwheels lamborghini", 39.99, 3);
const corvette = await createItem("hotwheels corvette", 25.99, 2);

// adicionei dois itens ao carrinho
await cartService.addItem(myCart, ferrari);
await cartService.addItem(myCart, lamborghini);
await cartService.addItem(myCart, corvette);
// exibir os itens do carrinho
await cartService.displaycart(myCart);

//retirei um item do carrinho
await cartService.removeItem(myCart, lamborghini);

//deletando um item do carrinho
await cartService.deleteItem(myCart, ferrari.name);



// exibir os itens do carrinho
await cartService.displaycart(myCart);
// deletei dois itens do carrinho
// await cartService.deleteItem(myCart, item2.name);
// await cartService.deleteItem(myCart, item1.name);
await cartService.calculateTotal(myCart);


await cartService.addItem(myWhishList, ferrari);
await cartService.addItem(myWhishList, lamborghini);
await cartService.displayWishList(myWhishList);

console.log("Thank you for using Shopee Cart!\n");