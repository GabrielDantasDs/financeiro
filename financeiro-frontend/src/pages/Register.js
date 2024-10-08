import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Formik } from "formik";
import "../style/login.css";
import Swal from "sweetalert2";
import { register } from "../cruds/auth"; 
import { useSelector } from "react-redux";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState('');
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(auth.isAuthenticated) {
      navigate('/dashboard')
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
          <span className="text-login">Registre-se</span>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirm_password: "" }}
          validate={(values) => {
            const errors = {};

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Endereço de email inválido";
            }

            if (values.password !== values.confirm_password) {
                errors.confirm_password = "As senhas não são identicas.";
            }

            return errors;
          }}
          onSubmit={ async (values, { setSubmitting }) => {
          await register({ email: values.email, name: values.name, password: values.password }).then(res => {
                Swal.fire({ title: "Sucesso!", text: "Sua conta foi criada com sucesso.", icon: "success", timer: 3000});
                navigate('/auth');
            }).catch(err => {
                Swal.fire('Ops', 'Houve um erro ao realizar seu cadastro.', 'error');
            })
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
                  id="name"
                  name="name"
                  type="text"
                  label="Nome completo"
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>

              <div className="form-group">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="text"
                  label="Email"
                  onChange={handleChange}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div className="form-group">
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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

              <div>
                <TextField
                  fullWidth
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  label="Repetir a senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
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
