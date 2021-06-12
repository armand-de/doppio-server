import { LessThan } from 'typeorm';

export const LIST_WHERE_OPTION = (start: number) =>
  start > -1 ? { id: LessThan(start) } : {};
