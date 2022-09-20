"use strict";
/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
class Node {
    constructor(key, value) {
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "next", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prev", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class Deque {
    constructor() {
        Object.defineProperty(this, "head", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tail", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "len", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    get length() {
        return this.len;
    }
    push(key, value) {
        const node = new Node(key, value);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.len++;
        return node;
    }
    moveToTop(node) {
        if (node.prev == null) {
            return;
        }
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        if (next != null) {
            next.prev = prev;
        }
        if (this.tail === node) {
            this.tail = prev;
        }
        node.prev = null;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    deleteBottom() {
        if (!this.len || !this.tail || !this.head) {
            return null;
        }
        if (this.tail === this.head) {
            this.len = 0;
            const node = this.tail;
            this.tail = null;
            this.head = null;
            return node;
        }
        const tail = this.tail;
        const beforeLast = this.tail.prev;
        beforeLast.next = null;
        this.tail.prev = null;
        this.tail.next = null;
        this.tail = beforeLast;
        this.len--;
        return tail;
    }
}
class LRU {
    constructor({ capacity }) {
        Object.defineProperty(this, "capacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deque", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (capacity <= 0) {
            throw new TypeError("capacity is expected to be greater than 0");
        }
        this.capacity = capacity;
        this.map = new Map();
        this.deque = new Deque();
    }
    get length() {
        const len = this.map.size;
        if (len !== this.deque.length) {
            throw new errors_1.InternalClientError("deque & map disagree on elements count");
        }
        return len;
    }
    has(key) {
        return this.map.has(key);
    }
    get(key) {
        const node = this.map.get(key);
        if (node != null) {
            this.deque.moveToTop(node);
            return node.value;
        }
        return undefined;
    }
    set(key, value) {
        const existingNode = this.map.get(key);
        if (existingNode != null) {
            existingNode.value = value;
            this.deque.moveToTop(existingNode);
        }
        else {
            const newNode = this.deque.push(key, value);
            this.map.set(key, newNode);
            while (this.deque.length > this.capacity) {
                const bottomNode = this.deque.deleteBottom();
                this.map.delete(bottomNode.key);
            }
        }
    }
    *keys() {
        let node = this.deque.head;
        while (node != null) {
            yield node.key;
            node = node.next;
        }
    }
    *entries() {
        let node = this.deque.head;
        while (node != null) {
            yield [node.key, node.value];
            node = node.next;
        }
    }
    *values() {
        let node = this.deque.head;
        while (node != null) {
            yield node.value;
            node = node.next;
        }
    }
}
exports.default = LRU;
