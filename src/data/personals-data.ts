import restourant from 'assets/images/category-images/restourant.png';
import administrative from 'assets/images/category-images/administrative.png';
import auto from 'assets/images/category-images/car.png';
import building from 'assets/images/category-images/building.png';
import cleaning from 'assets/images/category-images/cleaning.png';
import entertaiment from 'assets/images/category-images/entertaiments.png';
import finance from 'assets/images/category-images/finance.png';
import health from 'assets/images/category-images/health.png';
import household_staff from 'assets/images/category-images/household_staff.png';
import industry from 'assets/images/category-images/industry.png';
import it from 'assets/images/category-images/it.png';
import logistics from 'assets/images/category-images/logistics.png';
import marketing from 'assets/images/category-images/marketing.png';
import retail from 'assets/images/category-images/retail.png';
import sales from 'assets/images/category-images/sales.png';
import security from 'assets/images/category-images/security.png';
import services from 'assets/images/category-images/services.png';
import the_beauty from 'assets/images/category-images/the_beauty.png';

export const getCategoryImageById = (id: string): any => {
  switch (id) {
    case '1':
      return restourant;
    case '2':
      return retail;
    case '3':
      return administrative;
    case '4':
      return building;
    case '5':
      return it;
    case '6':
      return security;
    case '7':
      return logistics;
    case '8':
      return services;
    case '9':
      return entertaiment;
    case '10':
      return auto;
    case '11':
      return sales;
    case '12':
      return marketing;
    case '13':
      return household_staff;
    case '14':
      return finance;
    case '15':
      return cleaning;
    case '16':
      return health;
    case '17':
      return the_beauty;
    case '18':
      return industry;
    default:
      return services;
  }
};

export const personals = [
  {
    id: '1',
    categoryId: '1',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: 'https://tezbazar.az/uploads/news/f9abea81c6b840c2290d1584f491ccdc.jpg',
  },
  {
    id: '2',
    categoryId: '2',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('2'),
  },
  {
    id: '3',
    categoryId: '3',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('3'),
  },
  {
    id: '4',
    categoryId: '4',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('4'),
  },
  {
    id: '5',
    categoryId: '5',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '100 000 - 120 000   в месяц',
    image: 'https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg',
  },
  {
    id: '6',
    categoryId: '6',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('6'),
  },
  {
    id: '7',
    categoryId: '7',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('7'),
  },
  {
    id: '8',
    categoryId: '8',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('8'),
  },
  {
    id: '9',
    categoryId: '9',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('9'),
  },
  {
    id: '91',
    categoryId: '1',
    image: 'https://skolko-poluchaet.ru/wp-content/uploads/2018/02/skolko-poluchaet-pekar.jpg',
    name: 'Ергалиев Алишер',
    city: 'г. Алматы',
    profession: 'Пекарь / Кондитер',
    salary: '80 000 - 100 000   в месяц',
  },
  {
    id: '10',
    categoryId: '10',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('10'),
  },
  {
    id: '11',
    categoryId: '11',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('11'),
  },
  {
    id: '12',
    categoryId: '12',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('12'),
  },
  {
    id: '13',
    categoryId: '13',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('13'),
  },
  {
    id: '14',
    categoryId: '14',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('14'),
  },
  {
    id: '15',
    categoryId: '15',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('15'),
  },
  {
    id: '16',
    categoryId: '16',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('16'),
  },
  {
    id: '17',
    categoryId: '17',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('17'),
  },
  {
    id: '18',
    categoryId: '18',
    name: 'Константинов Константин',
    city: 'г. Алматы',
    profession: 'Официант',
    salary: '80 000 - 100 000   в месяц',
    image: getCategoryImageById('18'),
  },
];
