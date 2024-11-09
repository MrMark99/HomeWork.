import './style.css'

function Swap<T>(a: T, b: T):  [T, T] {
    return [b, a]
}

console.log(Swap<number>(1,2))
console.log(Swap<string>('World','Hello,'))

interface Product {
    id: number;
    name: string;
    price: number;
}

const getMostExpensiveProduct = (products) => {
    if (products.length === 0) {
        return null;
    }

    return products.reduce((a, b) => {
        if (a.price > b.price) {
            return a;
        } else {
            return b;
        }
    });
};

// Приклад використання
const products = [
    { id: 1, name: "сметана", price: 1200 },
    { id: 2, name: "молоко", price: 800 },
    { id: 3, name: "хліб", price: 600 },
];

console.log(getMostExpensiveProduct(products));
