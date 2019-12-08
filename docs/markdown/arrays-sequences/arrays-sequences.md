<!-- .slide: class="transition-white sfeir-bg-red" -->

# Arrays and Sequences

functional programming with collections

##==##

# WarmUp

> Given an array of integers<br> `[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]`<br>
> return the product of their squares not multiple of 3

Notes:
Il faut parler de map, filter, reduce
Expliquer programmation déclarative

##==##

<!-- .slide: class="with-code consolas" -->

# Declarative programming

```javascript
input
  .map(x => x ** 2)
  .filter(x => x % 3 !== 0)
  .reduce((x, y) => x * y);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# More declarative programming

```javascript
const square = x => x ** 2;
const isMultipleOf = y => x => x % y === 0;
const not = f => x => !f(x);
const muliply => (a, b) => a * b;

input
  .map(square)
  .filter(not(isMultipleOf(3)))
  .reduce(multiply);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice sfeir-bg-pink" -->

# Manipulate arrays

## Exercice 0

<br>
1. Read a list of numbers from a file
2. Reduce to a single value
3. Solve day1 of AdventOfCode
<br>

### make the test pass, then run main.ts

##==##

# Lazyness

Immutable array functions always return new Arrays

##==##

# Let's talk about Purity

> In computer programming, a pure function is a function that has the following properties :
>
> 1. Its return value is the same for the same arguments.
> 2. Its evaluation has no side effects.

Notes:
expliquer les 2 points (exemples de code à venir sur les slides suivants)

##==##

<!-- .slide: class="with-code consolas" -->

# Its return value is the same for the same arguments.

```javascript
let a = 0;
function impureFunction(b) {
  return a + b;
}
impureFunction(1); // => 1
a = 1;
impureFunction(1); // => 2
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# Its return value is the same for the same arguments.

```javascript
function pureFunction(b) {
  const a = 0;
  return a + b;
}
pureFunction(1); // => 1
pureFunction(1); // => 1
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# Its evaluation has no side effects

```javascript
let count = 0;
const sideEffectFunction = () => count++;
const dependantFunction = b => count + b;

dependantFunction(1); // => 1
sideEffectFunction(); // count changed
dependantFunction(1); // => 2
```

<!-- .element: class="big-code" -->

Notes:
Expliquer que l'effet de bord si on a une autre méthode qui accède au paramètre count
alors, notre méthode a modifier le comportement de l'autre => problème

##==##

##==##

# How to return values ?

<br><br>

|      | Single   | Multiple |
| ---- | -------- | -------- |
| Pull | Function | Iterator |

Notes:
Ici pour récupérer des valeurs, on peut soit récupérer un nombre fini de valeurs, ou alors un nombre infini et surtout non borné dans le temps

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition-white transition-center" data-type-show="prez" -->

# Live coding !

Notes:
Faire un livecoding de :

1. Return single value
2. Return finite multiple value
3. Return a generator
4. Controler le temps => retourner une promesse
5. Comment controler le temps ? Le générateur peut générer des valeurs à tes temps différents

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return a single value

```javascript
function singleValue() {
  return 'hello world!';
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on ne retourne qu'une seule valeure via notre function

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return multiples values

```javascript
function singleValue() {
  return ['hello', ' World', '!'];
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on récupère un nombre fini de valeurs

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return infinite values ?

```javascript
function* myGenerator() {
  let wontFinish = false;
  let count = 0;
  while (wontFinish) {
    wonFinish = yield count++;
  }
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on récupère un nombre inifini de valeurs

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return single value with time

```javascript
function asyncValue() {
  return new Promise((resolve, reject)=>{
    ...
    resolve(value);
  })
}
```

<!-- .element: class="big-code" -->

Notes:
on ne sait pas quand la valeur va arriver, mais elle arrivera un jour ! Par contre elle est unique
##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return infinite values with time

```javascript
function* myGenerator() {
  ...
}
const myIterator = myGenerator();
console.log(myIterator.next());
console.log(myIterator.next());
setInterval(()=>console.log(myIterator.next()), 500);
```

<!-- .element: class="big-code" -->

Notes:
on récupère 0 et 1 très rapidement et ensuite on demande la suite toute les 500ms
⚠️ Avec un générateur, on est dans une stratégie bloquante

##==##

<!-- .slide: class="two-column-layout" -->

# Recap: Array vs Generators

##--##

<!-- .slide: class="with-code consolas" -->

### Array (Finite values)

```javascript
const finiteArray = [1, 2, 3, 4];

for (let number of finiteArray) {
  console.log(number);
}

//will show '1', '2', '3', '4'
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code consolas" -->

### Generators (Infinite values ?)

```javascript
function* myGenerator(max) {
  let count = 0;
  while (count < max) yield count++;
  return;
}
for (let number of myGenerator(x)) {
  console.log(number);
}
```

<!-- .element: class="big-code" -->

Notes:
Revenir sur le concept de finite vs infinite value

##==##

# How to return values ?

<br><br>

|      | Single   | Multiple |
| ---- | -------- | -------- |
| Pull | Function | Iterator |

<br>

- A function return an array of a single value (sync or not)
- A generator return an iterator (sync)

Notes:
Conclure sur le concept de réception