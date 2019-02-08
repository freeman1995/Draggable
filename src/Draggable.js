import React from "react";
import styled, { css } from "styled-components";

import { useDrag } from "./useDrag";

const Draggable = ({
  defaultPosition = { x: 0, y: 0 },
  children,
  className,
  movementBox,
  animateDragging,
  growShrinkBehavior,
  baseZIndex = 1,
  maxX,
  maxY,
  minX,
  minY
}) => {
  let {
    isDragging,
    position: { x, y },
    onMouseDragStart,
    onTouchDragStart
  } = useDrag(defaultPosition, minX, minY, maxX, maxY, movementBox);

  return (
    <DraggableContainer
      isDragging={isDragging}
      x={x}
      y={y}
      onMouseDown={onMouseDragStart}
      onTouchStart={onTouchDragStart}
      growShrinkBehavior={growShrinkBehavior}
      animateDragging={animateDragging}
      baseZIndex={baseZIndex}
      className={className}
    >
      {children}
    </DraggableContainer>
  );
};

export default Draggable;

const DraggableContainer = styled.div.attrs(
  ({ x, y, isDragging, growShrinkBehavior }) => ({
    style: {
      transform: `
        translate(${x}px, ${y}px)
        scale(${isDragging && growShrinkBehavior ? 1.1 : 1})
      `
    }
  })
)`
  touch-action: none;
  user-select: none;
  cursor: move;
  position: absolute;
  transition: transform cubic-bezier(0.17, 0.67, 0.91, 1.45) 150ms;
  z-index: ${({ isDragging, baseZIndex }) =>
    isDragging ? baseZIndex + 2 : baseZIndex};

  ${({ isDragging, animateDragging }) =>
    isDragging &&
    !animateDragging &&
    css`
      transition: none;
    `}

  &:hover {
    z-index: ${({ baseZIndex }) => baseZIndex + 1};

    ${({ x, y, isDragging, growShrinkBehavior }) =>
      !isDragging &&
      growShrinkBehavior &&
      css`
        transform: translate(${x}px, ${y}px) scale(1.1) !important;
      `}
  }
`;
