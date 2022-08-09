// class NodeDemo {
//   data: any;
//   next: NodeDemo | null;

//   constructor(data: any) {
//     this.data = data;
//     this.next = null;
//   }
// }

// class LinkedList {
//   head: NodeDemo | null;
//   size: number;
//   constructor() {
//     this.head = null;
//     this.size = 0;
//   }

//   public addFirst(data: any) {
//     this.head = new NodeDemo(data);
//     this.size++;
//   }
//   addLast(data: any) {
//     let current;
//     if (!this.head) {
//       this.addFirst(data);
//     } else {
//       current = this.head;
//       while (current.next) {
//         current = current.next;
//       }
//       current.next = new NodeDemo(data, null);
//     }
//   }
// }

// const list = new LinkedList();

// list.addLast(100);

// console.log(list);
