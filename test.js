// class Node {
//   constructor(data, next) {
//     this.data = data;
//     this.next = next;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.size = 0;
//   }

//   addFirst(data) {
//     this.head = new Node(data, this.head);
//     this.size++;
//   }

//   addLast(data) {
//     if (!this.head) {
//       this.addFirst(data);
//     } else {
//       let current = this.head;
//       while (current.next) {
//         current = current.next;
//       }
//       current.next = new Node(data);
//     }
//     this.size++;
//   }
// }

// const list = new LinkedList();

// list.addFirst(100);
// list.addFirst(200);
// list.addFirst(300);
// list.addFirst(400);
// list.addFirst(500);
// list.addLast(400);

// console.log(list);
