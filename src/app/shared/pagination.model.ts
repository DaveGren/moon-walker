export class Pagination<T> {

  constructor(
    public items: T[],
    public metadata: {
      total_hits
    }
  ) {}
}
