import React from "react";
import styled from "styled-components";

const SettingsForm = ({
  onInputChange,
  animateDragging,
  growShrinkBehavior,
  movementBoxX,
  movementBoxY,
  maxX,
  maxY,
  minX,
  minY
}) => (
  <Form>
    <Field
      name="animateDragging"
      type="checkbox"
      checked={animateDragging}
      onChange={onInputChange}
    />
    <Field
      name="growShrinkBehavior"
      type="checkbox"
      checked={growShrinkBehavior}
      onChange={onInputChange}
    />

    <hr />

    <Field
      name="movementBoxX"
      type="number"
      value={movementBoxX}
      onChange={onInputChange}
    />
    <Field
      name="movementBoxY"
      type="number"
      value={movementBoxY}
      onChange={onInputChange}
    />

    <hr />

    <Field name="maxX" type="number" value={maxX} onChange={onInputChange} />
    <Field name="maxY" type="number" value={maxY} onChange={onInputChange} />
    <Field name="minX" type="number" value={minX} onChange={onInputChange} />
    <Field name="minY" type="number" value={minY} onChange={onInputChange} />
  </Form>
);

export default SettingsForm;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
`;

const Field = ({ name, type, value, checked, onChange }) => (
  <Label htmlFor={name}>
    {name}:&nbsp;
    <input
      name={name}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  </Label>
);

const Label = styled.label`
  text-transform: capitalize;
`;
