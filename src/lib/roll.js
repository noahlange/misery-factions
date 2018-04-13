import { roll } from '../droll';

export default (rand, str) => () => roll(rand, str).total;
