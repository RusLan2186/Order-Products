export const products = [
  {
    id: 1,
    name: 'Samsung SyncMaster 2333',
    sn: "MON-2024-07-10-0001",
    img: "https://cdn-icons-png.flaticon.com/512/1220/1220714.png",
    type: 'monitors',
    specification: 'Specification 1',
    isFree: true,
    guarantee: {
      start: '2024-06-29 12:09:33',
      end: '2025-06-29 12:09:33'
    },
    price: 300,
    order: 1,
    date: '2024-06-29 12:09:33'
  },
  {
    id: 2,
    name: 'Gigabyte H55-27-358',
    sn: "MBD-2024-07-10-0001",
    img: "https://ipc2u.ru/upload/medialibrary/243/gyst0a0b3mtkfyk485jf0fjl97vno3hj.png",
    type: 'motherboard',
    specification: 'Specification 2',
    isFree: false,
    guarantee: {
      start: '2023-03-29 12:09:33',
      end: '2025-03-29 12:09:33'
    },
    price: 200,
    order: 2,
    date: '2024-01-31 12:09:33'
  },
  {
    id: 3,
    name: 'Intel I5-550',
    price: 400,
    sn: "PRC-2024-07-10-0001",
    img: "https://static-00.iconduck.com/assets.00/cpu-icon-2048x2048-5rn5o8yp.png",
    type: 'CPU',
    specification: 'Specification 2',
    isFree: true,
    guarantee: {
      start: '2019-11-15 12:09:33',
      end: '2020-03-29 12:09:33'
    },
    order: 3,
    date: '2024-02-10 12:09:33'
  },
  {
    id: 4,
    name: 'intel i7 8700k',
    price: 500,
    sn: "PRC-2024-07-10-0001",
    img: "https://static-00.iconduck.com/assets.00/cpu-icon-2048x2048-5rn5o8yp.png",
    type: 'CPU',
    specification: 'Specification 2',
    isFree: false,
    guarantee: {
      start: '2020-11-15 12:09:33',
      end: '2021-03-29 12:09:33'
    },
    order: 3,
    date: '2024-02-10 12:09:33'
  },

  {
    id: 5,
    name: 'ASUS  tuf gaming b450-plus ii',
    sn: "MBD-2024-07-10-0001",
    img: "https://ipc2u.ru/upload/medialibrary/243/gyst0a0b3mtkfyk485jf0fjl97vno3hj.png",
    type: 'motherboard',
    specification: 'Specification 5',
    isFree: true,
    guarantee: {
      start: '2022-12-05 12:09:33',
      end: '2023-12-05 12:09:33'
    },
    price: 200,
    order: 2,
    date: '2024-01-31 12:09:33'
  },
];

export const orders = [
  {
    id: 1,
    title: 'Comprehensive Electronics and Gadgets Purchase',
    date: '2024-07-11 12:09:33',
    description: 'desc'
  },
  {
    id: 2,
    title: 'Full Home Furniture and Decor Order',
    date: '2024-05-15 12:09:33',
    description: 'desc'
  },
  {
    id: 3,
    title: 'Complete Office Supplies and Stationery Requisition',
    date: '2024-06-29 12:09:33',
    description: 'desc'
  }
];