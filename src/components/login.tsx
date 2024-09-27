"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LabelInput from "./input";
import { RedAlert } from "./alert";

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

export default function LoginComp() {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  const errorInitialState = {
    global: "",
    username: "",
    password: "",
  };
  const [errors, setErrors] = useState(errorInitialState);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    const result = await fetch(`${APIBASE}/auth/login`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const { authorized, ...data } = await result.json();
    if (authorized) {
      localStorage.setItem("token", data.token);
      redirect("/budget-services");
      return;
    }
    setErrors({
      ...errors,
      global: "Usuario y/o password incorrecto",
    });
  };
  return (
    <div className="container bg-white rounded-lg shadow-md lg:px-12 px-6 py-8  lg:w-1/2 sm:w-0.8 max-w-full sm:max-w-md md:max-w-lg m-0 ">
      <h2 className="text-center text-2xl  mb-6">
        <span className="font-bold">Iniciar</span> tu sesión
      </h2>
      <form action="#">
        {errors.global !== "" ? <RedAlert>{errors.global}</RedAlert> : null}
        <div className="grid grid-rows-2 gap-5">
          <LabelInput
            label=""
            placeholder="Usuario"
            type="text"
            errorField={errors.username}
            value={credentials.username}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                username: e.currentTarget.value,
              });
            }}
          />
          <LabelInput
            label=""
            placeholder="Contraseña"
            type="password"
            errorField={errors.password}
            value={credentials.password}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                password: e.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="mb-6 flex flex-wrap justify-between items-center">
          <Link href="#" className="text-blue-500 hover:underline">
            Olvidé mi contraseña
          </Link>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-orange-500 text-gray-100 w-full rounded-md border px-2 py-2"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Ingresar
          </button>
        </div>
        <div className="flex items-center">
          <p className="text-sm mr-2">
            ¿No tienes tus claves?
            <a href="#" className="text-blue-500 hover:underline">
              {" "}
              Contacta a tu admin.
            </a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
