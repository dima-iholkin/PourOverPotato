export class UniquenessCollisionFailure {
  propertyName: string;

  constructor(propertyName: string) {
    this.propertyName = propertyName;
  }
}