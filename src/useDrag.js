import { useCallback, useEffect, useState } from "react";

const restrictRange = (min = -Infinity, max = Infinity, value) =>
  Math.max(min, Math.min(value, max));

// const roundTo = (value, step = value) => value && value - (value % step);

// TODO: fix movement box logic
export const useDrag = (
  defaultPosition,
  minX,
  minY,
  maxX,
  maxY
  // movementBox
) => {
  const [position, setPosition] = useState(defaultPosition);
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [isTouchInterface, setIsTouchInterface] = useState(false);

  const onMouseDragStart = useCallback(({ clientX, clientY }) => {
    setDragStartPosition({ x: clientX, y: clientY });
  }, []);
  const onTouchDragStart = useCallback(({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.targetTouches[0];

    setDragStartPosition({ x: clientX, y: clientY });
    setIsTouchInterface(true);
  }, []);

  useEffect(
    () => {
      if (!dragStartPosition) return;

      const onDrag = (clientX, clientY) => {
        const deltaX = clientX - dragStartPosition.x;
        const deltaY = clientY - dragStartPosition.y;
        let x = position.x + deltaX;
        let y = position.y + deltaY;

        // if (movementBox) {
        //   x = roundTo(x, movementBox.x);
        //   y = roundTo(y, movementBox.y);
        // }

        requestAnimationFrame(() =>
          setPosition({
            x: restrictRange(minX, maxX, x),
            y: restrictRange(minY, maxY, y)
          })
        );
      };

      const onMouseMove = ({ clientX, clientY }) => onDrag(clientX, clientY);
      const onTouchMove = e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const { clientX, clientY } = e.targetTouches[0];

        onDrag(clientX, clientY);
      };

      const dragStartEventType = isTouchInterface ? "touchend" : "mouseup";
      const dragEventType = isTouchInterface ? "touchmove" : "mousemove";
      const dragEventHandler = isTouchInterface ? onTouchMove : onMouseMove;

      document.body.style.cursor = "move";
      document.addEventListener(
        dragStartEventType,
        () => setDragStartPosition(null),
        { once: true }
      );
      document.addEventListener(dragEventType, dragEventHandler);

      return () => {
        document.body.style.cursor = "initial";
        document.removeEventListener(dragEventType, dragEventHandler);
      };
    },
    [dragStartPosition]
  );

  useEffect(
    () =>
      setPosition({
        x: restrictRange(minX, maxX, position.x),
        y: restrictRange(minY, maxY, position.y)
      }),
    [minX, minY, maxX, maxY]
  );

  return {
    isDragging: !!dragStartPosition,
    position,
    onMouseDragStart,
    onTouchDragStart
  };
};
