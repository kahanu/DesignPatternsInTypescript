export class Entity {
  id: any;
}

export class Bank extends Entity {
  name: string;
}

export class Branch extends Entity {
  bankId: any;
  name: string;
}
