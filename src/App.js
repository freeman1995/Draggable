import React, { Component } from "react";
import styled from "styled-components";
import { range, random } from "lodash/fp";

import SettingsForm from "./SettingsForm";
import Draggable from "./Draggable";

const items = range(0, 20).map(() => ({
  defaultX: random(100, 1500),
  defaultY: random(100, 800),
  background: `rgb(
    ${random(0, 255)},
    ${random(0, 255)},
    ${random(0, 255)}
  )`
}));

export default class App extends Component {
  state = {
    animateDragging: false,
    growShrinkBehavior: false,
    movementBoxX: "",
    movementBoxY: "",
    maxX: "",
    maxY: "",
    minX: "",
    minY: ""
  };

  onInputChange = e => {
    const { type, checked, value, name } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    this.setState({
      [name]: finalValue
    });
  };

  toNumber = value => (value ? Number(value) : undefined);

  render() {
    const {
      animateDragging,
      growShrinkBehavior,
      movementBoxX,
      movementBoxY,
      maxX,
      maxY,
      minX,
      minY
    } = this.state;

    return (
      <Container>
        <SettingsForm
          onInputChange={this.onInputChange}
          animateDragging={animateDragging}
          growShrinkBehavior={growShrinkBehavior}
          movementBoxX={movementBoxX}
          movementBoxY={movementBoxY}
          maxX={maxX}
          maxY={maxY}
          minX={minX}
          minY={minY}
        />
        {items.map(({ defaultX, defaultY, background }, i) => (
          <DraggableCircle
            index={i}
            key={background}
            background={background}
            animateDragging={animateDragging}
            growShrinkBehavior={growShrinkBehavior}
            defaultPosition={{ x: defaultX, y: defaultY }}
            movementBox={{
              x: this.toNumber(movementBoxX),
              y: this.toNumber(movementBoxY)
            }}
            maxX={this.toNumber(maxX)}
            maxY={this.toNumber(maxY)}
            minX={this.toNumber(minX)}
            minY={this.toNumber(minY)}
          />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const DraggableCircle = styled(Draggable)`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  background: ${({ background }) => background};
  display: flex;
  align-items: center;
  justify-content: center;
`;
