import { roll } from '../droll';

export default (rand: any) => {
  return {
    pick: <T>(arr: T[]): T => arr[rand.range(arr.length)],
    roll: (str: string) => () => roll(rand, str).total,
    shuffle: <T>(arr: T[]): T[] => {
      let array = arr.slice();
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [ array[i], array[j] ] = [ array[j], array[i] ];
      }
      return array;
    }
  };
};
