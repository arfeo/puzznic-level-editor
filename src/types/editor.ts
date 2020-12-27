export interface Level {
  id: number;
  map: number[][];
  target: number[];
  blocks: Block[];
  password?: string;
}

export interface Block {
  id: number;
  type: number;
  position: number[];
}
