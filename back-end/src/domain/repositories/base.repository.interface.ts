export interface IBaseRepository<T> {
  create?: (entity: T) => Promise<T>;
  findOne?: (entity: T) => Promise<T | null>;
  findMany?: (entity: T) => Promise<T[] | null>;
  updateOne?: (entity: T) => Promise<boolean>;
  delete?: (entity: T) => Promise<boolean>;
}
