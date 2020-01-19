import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
require("dotenv").config();

const UserSignUpForm = props => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    if (data.password === data.confirmPassword) {
      console.log("Hello There");
    } else {
      console.log(
        "Passwords don't match. Please ensure you have typed it in correctly"
      );
    }
    console.log(data);

    axios
      .post(`https://weexplorebackend.herokuapp.com/users/create`, data)
      .then(response => {
        console.log(response.data);
        props.history.push("/");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          placeholder="Please enter in your email"
          name="username"
          type="email"
          ref={register({ required: true })}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
        />
        <div>
          <label> Confirm your password </label>
          <input
            placeholder="Please confirm your password"
            name="confirmPassword"
            type="password"
            ref={register({ required: true })}
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            name="first_name"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        <div>
        <label>Last Name</label>
          <input
            name="last_name"
            type="text"
            ref={register({ required: true })}
          />
        </div>


        <div>
        <label>Age</label>
          <input
            name="age"
            type="number"
            ref={register({ required: true })}
          />
        </div>

        {/*       TODO
      sex,
      age,
      religion,
      newsletter,
      interests */}

        <input type="submit" />
      </form>
    </>
  );
};

export default UserSignUpForm;
