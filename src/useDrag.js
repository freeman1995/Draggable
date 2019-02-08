import { useCallback, useEffect, useState } from "react";

export const useDrag = defaultPosition => {
  const [position, setPosition] = useState(defaultPosition);
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [isTouchInterface, setIsTouchInterface] = useState(false);

  // TODO: Unite
  const onMouseDragStart = useCallback(
    ({ clientX, clientY }) => setDragStartPosition({ x: clientX, y: clientY }),
    []
  );
  const onTouchDragStart = useCallback(({ clientX, clientY }) => {
    setDragStartPosition({ x: clientX, y: clientY });
    setIsTouchInterface(true);
  }, []);

  useEffect(
    () => {
      if (!dragStartPosition) return;

      const onDrag = ({ clientX, clientY }) => {
        const { x, y } = position;
        const deltaX = clientX - dragStartPosition.x;
        const deltaY = clientY - dragStartPosition.y;

        setPosition({ x: x + deltaX, y: y + deltaY });
      };

      const onTouchMove = e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const { clientX, clientY } = e.targetTouches[0];

        onDrag({ clientX, clientY });
      };

      const dragStartEventType = isTouchInterface ? "touchend" : "mouseup";
      const dragEventType = isTouchInterface ? "touchmove" : "mousemove";
      const dragEventHandler = isTouchInterface ? onTouchMove : onDrag;

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

  return {
    isDragging: !!dragStartPosition,
    position,
    onMouseDragStart,
    onTouchDragStart
  };
};
