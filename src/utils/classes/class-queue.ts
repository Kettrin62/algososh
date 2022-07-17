interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size]=item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head++;
    this.length--;
  };

  clear = () => {
    this.container = Array(this.size).fill(null);
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.length > 0) {
      return this.container[this.head];
    }
    return null;
  };

  isEmpty = () => this.length === 0;

  getQueue = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail - 1;

  getLength = () => this.length;

  getSize = () => this.size;




  setClear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size).fill(null);
  };




  getElements() {
    return this.container;
  }

  






}