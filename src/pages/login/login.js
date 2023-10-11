import { React, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";

function Login({ setIsLogged }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [errores, setErrores] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const loginSatisfactorio = () =>
		toast.success("Bienvenido!", {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setErrores("");

		const data = { email, password, remember };
		console.log(data);
		axios
			.post("auth/login", data)
			.then((response) => {
				loginSatisfactorio();
				localStorage.setItem("token", response.data.access_token);
				setIsLogged(true);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 422) {
					setErrores(error.response.data.errors);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div>
			<div className="main-login">
				<h1 className="h1-login text-center">LOGIN</h1>
				<form onSubmit={handleSubmit} className="form-size">
					<div className="div-form">
						<label className="label-form">Email</label>
						<input
							className="input-form"
							type="email"
							placeholder="Ingrese su email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errores.email && <p className="input-error">{errores.email[0]}</p>}
					</div>

					<div className="div-form">
						<label className="label-form">Contraseña</label>
						<input
							className="input-form"
							type="password"
							placeholder="Ingrese contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errores.password && <p className="input-error">{errores.password[0]}</p>}
					</div>
					<div className="div-checkbox d-flex mb-3">
						<label className="label-form mx-2">Recordar</label>
						<input
							className="input-form-checkbox"
							type="checkbox"
							placeholder="Recordar"
							value={remember}
							onChange={(e) => setRemember(e.target.value)}
						/>
						{errores.remember && <p className="input-error">{errores.remember[0]}</p>}
					</div>
					<button className="button-form" type="submit" disabled={loading}>
						{loading ? (
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							"Ingresar"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
