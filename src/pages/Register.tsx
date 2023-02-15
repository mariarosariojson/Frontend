/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import axios from "axios";

import type { SubmitHandler } from "react-hook-form";
import type { CreateUser } from "Src/api/Dto";

import { UserType } from "Src/api/Enums";
import { addUser, listUsers } from "Src/api/User";

import GoogleLogoutButton from "Src/components/google-login/GoogleLogout";

import Login from "./Login";

import "src/css/Register.css";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Register() {
  const [newUser, setNewUser] = useState<CreateUser[]>([]);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      setUserIsLoading(true);
      const result = await listUsers();
      setNewUser(result);
      setUserIsLoading(false);
    };
    fetchData();

    return () => {
      setNewUser([]);
    };
  }, []);

  const registerUser = async () => {
    const newUser: CreateUser = {
      firstName: "",
      lastName: "",
      email: "",
      orders: [],
      userType: UserType.User || UserType.Admin
    };
    await addUser(newUser);
    setUserIsLoading(true);
    const result = await addUser(newUser);
    setNewUser([result]);
    setUserIsLoading(false);
  };

  return (
    <>
      <Helmet title="Register" />
      <Box className="container-logreg">
        <form className="register-input" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-reg">
            <div>
              <Login kitchenQueue={5} />
            </div>
          </div>
          <div className="register-container">
            <div className="register-header">
              <h3>Skapa nytt konto</h3>
            </div>
            <section className="input-1">
              <input placeholder="Förnamn" type="text" {...register("firstName")} />
              <input placeholder="Efternamn" type="text" {...register("lastName")} />
            </section>
            <section className="input-2">
              <input placeholder="E-mail adress" type="email" {...register("email")} />
            </section>
            <section className="input-4">
              <button className="register-btn" type="submit" onSubmit={() => registerUser()}>
                Spara
              </button>
            </section>
            <div className="google-logout-btn">
              <GoogleLogoutButton />
            </div>
          </div>
        </form>
      </Box>
    </>
  );
}
