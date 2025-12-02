import React from 'react';
import { ViewItem } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Node } from './Node/Node';

interface Props {
  nodes: ViewItem[];
}

export const Nodes = ({ nodes }: Props) => {
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });

  return (
    <>
      {[...nodes].reverse().map((node) => {
        const opacity =
          itemControls?.type === 'ITEM' && itemControls.id !== node.id
            ? 0.2
            : 1;

        return (
          <Node
            key={node.id}
            order={-node.tile.x - node.tile.y}
            node={node}
            opacity={opacity}
          />
        );
      })}
    </>
  );
};
