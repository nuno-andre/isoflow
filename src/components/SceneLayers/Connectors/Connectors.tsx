import React, { useMemo } from 'react';
import type { useScene } from 'src/hooks/useScene';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Connector } from './Connector';

interface Props {
  connectors: ReturnType<typeof useScene>['connectors'];
}

export const Connectors = ({ connectors }: Props) => {
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });

  const mode = useUiStateStore((state) => {
    return state.mode;
  });

  const selectedConnectorId = useMemo(() => {
    if (mode.type === 'CONNECTOR') {
      return mode.id;
    }
    if (itemControls?.type === 'CONNECTOR') {
      return itemControls.id;
    }

    return null;
  }, [mode, itemControls]);

  return (
    <>
      {[...connectors].reverse().map((connector) => {
        let opacity = 1;

        if (itemControls?.type === 'ITEM') {
          const isConnected = connector.anchors.find((anchor) => {
            return anchor.ref.item === itemControls.id;
          });

          if (!isConnected) {
            opacity = 0.2;
          }
        }

        return (
          <Connector
            key={connector.id}
            connector={connector}
            isSelected={selectedConnectorId === connector.id}
            opacity={opacity}
          />
        );
      })}
    </>
  );
};
