'use strict';

// task 1
console.log('===Task 1===');

class LinkedListNode {
  #next;
  #prev;
  constructor (data) {
    this.data = data;
    this.next = null; // вказівник на наступний вузол у списку
    this.prev = null; // вказівник на попередній вузол у списку
  }

  get next () {
    return this.#next;
  }

  get prev () {
    return this.#prev;
  }

  set next (node) {
    if(node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#next = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  set prev (node) {
    if(node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#prev = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  static isLinkedListNode (value) {
    return value instanceof LinkedListNode;
  }
}

class DoubleLinkedList {
  #head;
  #tail;
  constructor() {
    this.head = null; // перший вузол у списку
    this.tail = null; // останній вузол у списку
    this.length = 0; // довжина списку
  }

  get head () {
    return this.#head;
  }


  get tail () {
    return this.#tail;
  }

  set head (node) {
    if(node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#head = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  set tail (node) {
    if(node === null || LinkedListNode.isLinkedListNode(node)) {
      this.#tail = node;
      return;
    }

    throw new TypeError('Invalid node value');
  }

  // вставка значення у кінець списку
  push (data) {
    /*
      1. створити новий вузол списку
      2. вставити вузол у список
        2.1 якщо список пустий то зробити вузол 
            і головою і хвостом списку
        2.2 якщо список не пустий то 
            2.2.1 новий вузол має вказувати на попередній хвіст
            2.2.2 попередній хвіст має вказувати на новий вузол як на насутпний вузол
            2.2.3 маємо зміними хвіст на новий елемент
      3. збільшити довжину списку
      4. повернути довжину списка
    */

    // 1. створити новий вузол списку
    const newNode = new LinkedListNode(data);

    // 2.1 якщо список пустий то зробити вузол 
    // і головою і хвостом списку
    if(this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this.length;
  }

  // видалення останнього вузла зі списку
  pop() {
    /*
      1. якщо список пустий то нічого не робимо взагалі
      2. якщо він не пустий то:
        2.1 зберігаємо останній вузол в окрему змінну
        2.2 змінюємо хвіст на передостанній елемент
        2.3 перевіряємо чи існує передостанній елемент (чи довжина дорівнює 1)
          2.3.1 якщо не існує то head встановлюємо в null
          2.3.2 якщо існує то передостанньому елементу змінюемо next на null
              (опціонально витираємо останнюому елементу prev)
      3. зміеншиємо довжину
      4. повертаємо вузол який видалили зі списку
    */

    // 1. якщо список пустий то нічого не робимо взагалі
    if(this.length === 0) {
      return undefined;
    }

    // 2.1 зберігаємо останній вузол в окрему змінну
    const deletedNode = this.tail;
    const prevNode = deletedNode.prev;
    // 2.2 змінюємо хвіст на передостанній елемент
    this.tail = prevNode;
    // 2.3 перевіряємо чи існує передостанній елемент (чи довжина дорівнює 1)
    if(this.length === 1) {
      // 2.3.1 якщо не існує то head встановлюємо в null
      this.head = null;
    } else {
      // 2.3.2 якщо існує то передостанньому елементу змінюемо next на null
      //         (опціонально витираємо останнюому елементу prev)
      prevNode.next = null;
      deletedNode.prev = null;
    }

    // 3. зміеншиємо довжину
    this.length--;
    // 4. повертаємо вузол який видалили зі списку
    return deletedNode;
  }

  unshift(data) {

    const newNode2 = new LinkedListNode(data);

        /*
      1. створити новий вузол списку
      2. вставити вузол у список
        2.1 якщо список пустий то зробити вузол 
            і головою і хвостом списку
        2.2 якщо список не пустий то 
            2.2.1 новий вузол має вказувати на попередню голову
            2.2.2 попередня голова має вказувати на новий вузол як на насутпний вузол
            2.2.3 маємо змінити голову на новий елемент
      3. збільшити довжину списку
      4. повернути довжину списка
    */

    if(this.length === 0) {
      this.head = newNode2;
      this.tail = newNode2;
    } else {
      newNode2.prev = this.head;
      this.head.next = newNode2;
      this.head = newNode2;
    }

    this.length++;

    return this.length;
  }

  shift() {
    /*
      1. якщо список пустий то нічого не робимо взагалі
      2. якщо він не пустий то:
        2.1 зберігаємо останній вузол в окрему змінну
        2.2 змінюємо голову на передостанній елемент
        2.3 перевіряємо чи існує передостанній елемент (чи довжина дорівнює 1)
          2.3.1 якщо не існує то tail встановлюємо в null
          2.3.2 якщо існує то передостанньому елементу змінюемо next на null
              (опціонально витираємо останнюому елементу prev)
      3. зменшуємо довжину
      4. повертаємо вузол який видалили зі списку
    */

    if(this.length === 0) {
      return undefined;
    }

    const deletedNode2 = this.head;
    const prevElem = deletedNode2.prev;
    
    this.head = prevElem;

    if(this.length === 1) {
      this.tail = null;
    } else {
      prevElem.next = null
      deletedNode2.next = null;
    }

    this.length--;

    return deletedNode2;
  }
}

const list1 = new DoubleLinkedList();
list1.unshift('eighth');
list1.unshift('nineth');
list1.unshift('tenth');

list1.shift();


console.log(list1);


// task 2
console.log('===Task 2===');

class MyArray {
  constructor() {
    this.data = {}; 
    this.length = 0; 
  }
  
  push(element) {
    /*
      1. встановити length як індекс для нового елемента
      2. збільшити довжину списка на 1
      3. повернути нову довжину списка
    */
    this.data[this.length] = element;
    this.length++;
    return this.length;
  }

  pop() {
    /*
    1. якщо список пустий то повернути undefined
    2. якщо список повний: 
      2.1 зменшити довжину списку
      2.2 зберегти в змінну видалений елемент
      2.3 створити новий обʼєкт newData
      2.4 створити цикл який буде копіювати всі елементи зі старого списку в новий без видаленого елемента
      2.5 встановити замість старого списку новий
      2.6 певорнути видалений елемент
    */
    if (this.length === 0) {
      return undefined;
    }
    this.length--;
    const delElement = this.data[this.length];

    const newData = {};
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  
    return delElement;
  }

  shift() {
    /*
      1. якщо список пустий то повернути undefined
      2. якщо список повний:
        2.1 створити змінну, в якій буде збергіатися значення першого елемента списку
        2.2 рухаємо всі елементи на 1 індекс назад
        2.3 зменшуємо довжину
        2.4 створити новий обʼєкт newData
        2.5 створити цикл який буде копіювати всі елементи зі старого списку в новий без видаленого елемента
        2.6 встановити замість старого списку новий
        2.7 певорнути видалений елемент
    */
    if (this.length === 0) {
      return undefined;
    }
    
    const element = this.data[0];

    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
  
    this.length--;

    const newData = {};
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  
    return element;
  }
  

  unshift(element) {
    /*
      1. рухаємо всі елементи вправо
      2. змінюємо 1 елемент списку на вказаний
      3. зблішуємо довжину списку
      4. поврнути нову довжину списку
    */
    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = element;
    this.length++;
    return this.length;
  }

  static isMyArray(obj) {
    return obj instanceof MyArray;
  }
}

const list2 = new MyArray();

list2.push('one');
list2.push('two');
list2.push('three');

list2.unshift('zero');
list2.unshift('-one');

list2.pop();

list2.shift();
list2.shift();

console.log(list2);