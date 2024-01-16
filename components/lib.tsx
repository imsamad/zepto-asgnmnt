import { ChipItemT } from './types';

export const itemsSeeder = (): ChipItemT[] =>
  [
    {
      id: '65a685a0fc13ae505ffa24a2',
      title: 'Equipment',
    },
    { id: '65a685a0fc13ae505ffa24a3', title: 'Packaged' },
    { id: '65a685a0fc13ae505ffa24a4', title: 'Major' },
    { id: '65a685a0fc13ae505ffa24a5', title: 'Enterprise' },
    { id: '65a685a0fc13ae505ffa24a6', title: 'Pharma' },
    {
      id: '65a685a0fc13ae505ffa24a7',
      title: 'Beverages',
    },
    { id: '65a685a0fc13ae505ffa24a8', title: 'Services' },
    { id: '65a685a0fc13ae505ffa24a9', title: 'Railroads' },
    {
      id: '65a685a0fc13ae505ffa24aa',
      title: 'Insurers',
    },
    {
      id: '65a685a0fc13ae505ffa24ab',
      title: 'Military',
    },
    { id: '65a685a0fc13ae505ffa24ad', title: 'Production' },
    { id: '65a685a0fc13ae505ffa24ae', title: 'Government' },
    { id: '65a685a0fc13ae505ffa24af', title: 'Property' },
    {
      id: '65a685a0fc13ae505ffa24b0',
      title: 'Real',
    },
    {
      id: '65a685a0fc13ae505ffa24b1',
      title: 'Tools',
    },
    { id: '65a685a0fc13ae505ffa24b3', title: 'Transmission' },
    { id: '65a685a0fc13ae505ffa24b5', title: 'Restaurants' },
    { id: '65a685a0fc13ae505ffa24b6', title: 'Banks' },
    { id: '65a685a0fc13ae505ffa24b8', title: 'Hardware' },
    { id: '65a685a0fc13ae505ffa24ba', title: 'Homebuilding' },
    { id: '65a685a0fc13ae505ffa24bd', title: 'Business' },
    { id: '65a685a0fc13ae505ffa24be', title: 'O.E.M.' },
    {
      id: '65a685a0fc13ae505ffa24bf',
      title: 'Trusts',
    },
    {
      id: '65a685a0fc13ae505ffa24c0',
      title: 'Bankers',
    },
    {
      id: '65a685a0fc13ae505ffa24c1',
      title: 'Brokers',
    },
    {
      id: '65a685a0fc13ae505ffa24c4',
      title: 'Materials',
    },
    {
      id: '65a685a0fc13ae505ffa24c5',
      title: 'Retails',
    },
    { id: '65a685a0fc13ae505ffa24c6', title: 'Semiconductors' },
    {
      id: '65a685a0fc13ae505ffa24c8',
      title: 'Finance',
    },
    { id: '65a685a0fc13ae505ffa24c9', title: 'E-commerce' },
    { id: '65a685a0fc13ae505ffa24cc', title: 'Television' },
    { id: '65a685a0fc13ae505ffa24cd', title: 'Media' },
    { id: '65a685a0fc13ae505ffa24cf', title: 'Professionals' },
    { id: '65a685a0fc13ae505ffa24d0', title: 'Commercial' },
    {
      id: '65a685a0fc13ae505ffa24d2',
      title: 'Software',
    },
  ].map((x, index) => ({
    ...x,
    icon_src: `https://robohash.org/stefan-${index + 1}`,
  }));

export function compareBy(
  propertyName: string,
  ignoreCase = true,
  desOrd = true
) {
  return (a: any, b: any) => {
    let titleA = a[propertyName];
    let titleB = b[propertyName];
    if (ignoreCase) {
      titleA = titleA.toLowerCase();
      titleB = titleB.toLowerCase();
    }
    if (titleA < titleB) {
      return desOrd ? -1 : 1; // If titleA is less than titleB, move 'a' to a higher index
    } else if (titleA > titleB) {
      return desOrd ? 1 : -1; // If titleA is greater than titleB, move 'a' to a lower index
    } else {
      return 0; // If titles are equal, maintain their order
    }
  };
}
