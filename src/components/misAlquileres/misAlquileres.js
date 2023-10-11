import { React } from "react";
import "./misAlquileres.css";

function MisAlquileres({ bicicleta, id, horaComienzo, horaFInal, precioFinal, idAlquilerCargando, finalizarAlquiler }) {
	return (
		<div className="col-12 col-md-6 col-lg-4 col-xxl-3">
			<div className="card my-3 mx-auto" style={{ width: "18rem", height: "500px" }}>
				<img className="card-img-top" src={`http://bicicletas-api-clone.test/${bicicleta.foto_url}`} alt="Bicicleta" />
				<div className="card-body">
					<h5 className="card-title">{bicicleta.modelo}</h5>
					<ul>
						<li>Marca: {bicicleta.marca}</li>
						<li>Precio por hora: ${bicicleta.precio_por_hora}</li>
						<li>Hora de comienzo: {horaComienzo}</li>
						<li>Hora de finalización: {horaFInal}</li>
						<li>Precio final: ${precioFinal}</li>
					</ul>
				</div>
				<div className="card-footer">
					{idAlquilerCargando === id ? (
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
							<span role="status">Finalizando...</span>
						</button>
					) : (
						<button onClick={() => finalizarAlquiler(id)} disabled={horaFInal} className="btn btn-primary">
							{horaFInal ? "Finalizado" : "Finalizar"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default MisAlquileres;
