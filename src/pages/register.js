import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import withoutAuth from "@/hocs/withoutAuth";
import { useAuth } from "@/lib/auth";
import { Button, Grid, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
//VALIDACIONES
const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup.string().required("Ingrese su clave"),
  password_confirmation: yup.string().required("Ingrese su clave"),
});
//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
}));
//FUNCION PARA EL REGISTER
const Register = () => {
  const { register: doRegister } = useAuth();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const userData = await doRegister({ ...data, role: "ROLE_USER" });

      console.log("userData", userData);
    } catch (error) {
      if (error.response) {
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={6}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid xs={12} item>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  label="Nombre"
                  inputRef={register}
                  autoComplete="email"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  inputRef={register}
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Contraseña"
                  inputRef={register}
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  label="Confirmar Contraseña"
                  inputRef={register}
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid xs={12} item className={classes.buttonWrapper}>
                <Button
                  name="submit"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default withoutAuth(Register);
