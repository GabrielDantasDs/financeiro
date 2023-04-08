import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Formik } from "formik";
import "../style/login.css";
import { login } from "../cruds/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState('');
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(auth.isAuthenticated) {
      navigate('/')
    }
  }, [auth])

  return (
    <div className="login-screen">
      <div className="login-screen-text">
        <span>Sistema de gerenciamento financeiro</span>
        {errors ? (
          <div className="alert alert-danger mt-2" role="alert">
            {errorText}
          </div>
        ) : null}
      </div>
      <div className="login-card">
        <div className="login-card-text">
          <span className="text-login">Login</span>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Endereço de email inválido";
            }

            return errors;
          }}
          onSubmit={ async (values, { setSubmitting }) => {
           dispatch(login(values, navigate)).catch(err => {
              setErrors(true);
              setErrorText('Usuário ou senha inválidas.')
            });

            setSubmitting(false);
          }}
        >
          {({
            values,

            errors,

            touched,

            handleChange,

            handleBlur,

            handleSubmit,

            isSubmitting,

            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="text"
                  label="Usuário"
                  onChange={handleChange}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="login-card-button">
                <button
                  id="submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="login-button"
                >
                  {isSubmitting ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
