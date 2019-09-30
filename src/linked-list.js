const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let element = new Node(data);
        if (this.length === 0) {
            this._head = element;
            this._tail = element;

        } else {
            this._tail.next = element;
            element.prev = this._tail;
            this._tail = element;
        }

        this.length++;

        return this;
    }

    head() {
        if (this._head == null) return null;
        return this._head.data;
    }

    tail() {
        if (this._tail == null) return null;
        return this._tail.data;
    }

    at(index) {
        let current = this._head;
        let iter = 0;

        if (this.length === 0 || index > this.length || index < 0) {
            throw new Error("Data is incorrect");
        }

        while (iter < index) {
            current = current.next;
            iter++;
        }

        return current.data;
    }

    insertAt(index, data) {
        let current = this._head;
        let iter = 0;

        if (index > this.length || index < 0) {
            throw new Error("Data is incorrect");
        }

        if (index === this.length) {
            this.append(data);
        } else {
            while (iter < index) {
                current = current.next;
                iter++;
            }

            let element = new Node(data);
            element.prev = current.prev;
            element.next = current;
            current.prev.next = element;
            current.prev = element;

            this.length++;
        }

        return this;

    }

    isEmpty() {
        if (this.length === 0)
            return true;
        else
            return false;
    }

    clear() {
        let current = this._head;

        while (current != null) {
            let next = current.next;
            current.data = null;
            current.prev = null;
            current.next = null;
            current = next;
        }

        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let current = this._head;
        let iter = 0;

        if (this.length === 0 || index > this.length || index < 0) {
            throw new Error("Data is incorrect");
        }

        if (index === 0) {
            this._head = current.next;
            if (this._head != null) {
                this._head.prev = null;
            } else {
                this._tail = null;
            }
            this.length--;
        } else if (index === this.length - 1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
            this.length--;
        } else {
            while (iter < index) {
                current = current.next;
                iter++;
            }

            let temp = current;
            let tempNext = current.next;
            let tempPrev = current.prev;

            current = tempPrev;
            current.next = tempNext;
            current.next.prev = current;
            temp = null;

            this.length--;
        }

        return this;
    }

    reverse() {
        let temp = new LinkedList();
        let current = this._tail;

        while (current != null) {
            temp.append(current.data);
            current = current.prev;
        }

        this._head = temp._head;
        this._tail = temp._tail;

        return this;
    }

    indexOf(data) {
        let current = this._head;
        let iter = 0;

        if (this.length === 0) {
            throw new Error("List is not exist");
        }

        while (iter < this.length) {
            if (current.data == data) {
                return iter;
            }
            current = current.next;
            iter++;
        }

        return -1;
    }
}

module.exports = LinkedList;
