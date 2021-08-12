import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { nanoid } from 'nanoid';
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddUser = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('')
  const { addUser } = useContext(GlobalContext);
  // const { addUserName } = useContext(GlobalContext)
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: nanoid(),
      height,
      weight
    }
    addUser(newUser);
    // addUserName(newUser);
    history.push("/");
  }

  const onChange1 = (e) => {
    setHeight(e.target.value);
  }

  const onChange2 = (e) => {
    setWeight(e.target.value);
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Input Height</Label>
        <Input type="text" value={height} onChange={onChange1} name="name" placeholder="Height" required></Input>

        <Label>Input Weight</Label>
        <Input type="text" value={weight} onChange={onChange2} name="name" placeholder="Weight" required></Input>

      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}
