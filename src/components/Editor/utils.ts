import { IBlock } from '../../types/editor';

/**
 * Functions excludes a block with the given position from blocks array,
 * then reassigns block ids; returns new blocks array
 *
 * @param position
 */
function excludeBlock(position: number[]): IBlock[] {
  const blocksFiltered: IBlock[] = this.level.blocks.filter((block: IBlock) => {
    return !(block.position[0] === position[0] && block.position[1] === position[1]);
  });

  return blocksFiltered.map((block: IBlock, index: number) => ({ ...block, id: index + 1 }));
}

export { excludeBlock };
