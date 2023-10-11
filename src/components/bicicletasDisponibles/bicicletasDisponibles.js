import { React } from "react";
import "./bicicletasDisponibles.css";

function BicicletasDisponibles({ alquilada, foto_url, id, marca, modelo, precio_por_hora, alquilarBicicleta, idBicicletaCargando }) {
	return (
		<div className="col-12 col-md-6 col-lg-4 col-xxl-3">
			<div className="card my-3 mx-auto" style={{ width: "18rem", height: "400px" }}>
				<img className="card-img-top" src={`http://bicicletas-api-clone.test/${foto_url}`} alt="Bicicleta" />
				<div className="card-body">
					<h5 className="card-title">{modelo}</h5>
					<ul>
						<li>Marca: {marca}</li>
						<li>Precio por hora: ${precio_por_hora}</li>
					</ul>
				</div>
				<div className="card-footer">
					{idBicicletaCargando === id ? (
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
							<span role="status">Alquilando...</span>
						</button>
					) : (
						<button onClick={() => alquilarBicicleta(id)} disabled={alquilada} className="btn btn-primary">
							{alquilada ? "Alquilada" : "Alquilar"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default BicicletasDisponibles;
