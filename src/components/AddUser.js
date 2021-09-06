import React, { useState, useContext, useEffect } from 'react';
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
  const [bmi, setBmi] = useState({});
  const history = useHistory();

  
  useEffect(() => {
    console.log(bmi)
      
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height : height,
          weight : weight
        }),
      };    

      
      // fetch('http://localhost:9000/bmi', requestOptions)
      fetch('https://api-bmi-r.herokuapp.com/bmi', requestOptions)
        .then(res => res.json())
        .then(data => setBmi(data))

  }, );

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: nanoid(),
      height,
      weight,
      bmi
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
        
        <Label>BMI</Label>
        <Input type="text" value={ bmi.bmi != null ? "("+bmi.bmi+")"+ bmi.statusBmi : ''}  placeholder="Weight" required></Input>
      </FormGroup>
      
      <Button type="submit">Submit</Button>

      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}
