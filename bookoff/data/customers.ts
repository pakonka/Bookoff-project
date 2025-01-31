interface Customer {
  id: number;
  name: string;
  availablePoints: number;
  minTotalForPoints: number;
}

export const customers: Customer[] = [
  {
    id: 1,
    name: "Yamada Taro",
    availablePoints: 1000,
    minTotalForPoints: 3000,
  },
  {
    id: 2,
    name: "Tanaka Hanako",
    availablePoints: 2000,
    minTotalForPoints: 5000,
  },
  {
    id: 3,
    name: "Suzuki Ichiro",
    availablePoints: 1500,
    minTotalForPoints: 4000,
  },
  {
    id: 4,
    name: "Sato Yuki",
    availablePoints: 2500,
    minTotalForPoints: 3500,
  },
  {
    id: 5,
    name: "Kobayashi Ken",
    availablePoints: 800,
    minTotalForPoints: 2000,
  },
];
