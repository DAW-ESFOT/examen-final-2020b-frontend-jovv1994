import { useState } from "react";
import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "@/styles/Login.module.css";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//VALIDACIONES
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup.string().required("Ingrese su clave"),
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
//FUNCION PARA EL LOGIN
const Login = () => {
  const { login } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  //MÉTODO PARA EL BOTÓN LOGIN
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("data", data);
    try {
      const userData = await login(data);
      setLoading(false);
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
      setLoading(false);
    }
  };

  /********************************************************************************************************/

  //INTERFAZ GRÁFICA CON MATERIAL UI
  return (
    <div className={styles.login}>
      <Grid container justify="center">
        <Grid item xs={6}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justify="center" alignItems="center">
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
                  label="Clave"
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
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default withoutAuth(Login);
