import { React, useEffect, useState } from "react";
import "./perfil.css";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { toast } from "react-toastify";

function Perfil() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [errores, setErrores] = useState("");
	const [loading, setLoading] = useState(false);

	const actualizacionSatisfactoria = () =>
		toast.success("Actualizado correctamente!", {
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

		const data = { name, email, current_password: password, password: newPassword, password_confirmation: confirmPassword };

		axios
			.put("perfil", data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response.data);
				actualizacionSatisfactoria();
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

	useEffect(() => {
		axios
			.get("perfil", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response.data);
				setEmail(response.data.email);
				setName(response.data.name);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	});

	return (
		<div>
			<div className="main-perfil">
				<h1 className="h1-perfil">PERFIL</h1>
				<form className="form-size" onSubmit={handleSubmit}>
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
						<label className="label-form">Nombre</label>
						<input
							className="input-form"
							type="text"
							placeholder="Ingrese su nombre"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{errores.name && <p className="input-error">{errores.name[0]}</p>}
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
					<div className="div-form">
						<label className="label-form">Nueva Contraseña</label>
						<input
							className="input-form"
							type="password"
							placeholder="Ingrese contraseña"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						{errores.newPassword && <p className="input-error">{errores.newPassword[0]}</p>}
					</div>
					<div className="div-form">
						<label className="label-form">Confirmar contraseña</label>
						<input
							className="input-form"
							type="password"
							placeholder="Confirmar contraseña"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{errores.confirmPassword && <p className="input-error">{errores.confirmPassword[0]}</p>}
					</div>
					<button className="button-form" type="submit" disabled={loading}>
						{loading ? (
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							"Modificar"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Perfil;
