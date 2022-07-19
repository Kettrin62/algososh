import { TElement } from "../../types/data";

export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  toArray: () => void;
  toInitArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  private initArray: TElement<T>[] | undefined;
  constructor(array?: TElement<T>[]) {
    this.head = null;
    this.size = 0;
    this.initArray = array;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        if (curr) {
          while ((currIndex < index - 1) && (curr.next)) {
            curr = curr.next;
            currIndex++;
          }
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.head && this.head.next !== null) {
      const current = this.head.next;
      this.head = current;
      this.size--;
    } else {
      this.head = null;
    }
  }

  deleteTail() {
    if (this.head && this.head.next !== null) {
      let curr = this.head;
      let prev;
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      if (prev) {
        prev.next = null;
      }
    } else {
      this.head = null;
    }
    this.size--;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev;
        if (curr) {
          while ((currIndex < index) && (curr.next)) {
            prev = curr;
            curr = curr.next;
            currIndex++;
          }
          if (prev) {
            prev.next = curr.next;
          }
        }
      }
      this.size--;
    }
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  toInitArray() {
    this.initArray?.map((item) => {
      this.append(item.value);
    })
    return this.toArray();
  }
}