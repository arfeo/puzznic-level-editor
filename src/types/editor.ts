export interface Level {
  id: number;
  map: number[][];
  target: number[];
  blocks: Block[];
  bonus: number;
  password?: string;
}

export interface Block {
  id: number;
  type: number;
  position: number[];
}
