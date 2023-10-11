import { React, useEffect, useState } from "react";
import "./alquileres.css";
import Navbar from "../../components/navbar/navbar";
import MisAlquileres from "../../components/misAlquileres/misAlquileres";
import axios from "axios";
import Pagination from "react-js-pagination";

function Alquileres() {
	const [alquileres, setAlquileres] = useState(null);
	const [idAlquilerCargando, setIdAlquilerCargando] = useState(null);
	const [activePage, setActivePage] = useState(1);
	const [paginationInfo, setPaginationInfo] = useState(null);

	useEffect(() => {
		axios
			.get("alquileres?page=" + activePage, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response);
				setAlquileres(response.data.data);
				setPaginationInfo(response.data.meta);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [activePage]);

	const finalizarAlquiler = (id) => {
		setIdAlquilerCargando(id);
		axios
			.put("alquileres/finalizar/" + id, null, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIdAlquilerCargando(null);
				// set hora_finalizacion of the alquiler to the current time
				window.location.reload();
			});
	};

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	};

	return (
		<div className="container">
			<h1 className="display-5 text-center my-5">MIS ALQUILERES</h1>
			<div className="row">
				{!alquileres && (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				)}
				{alquileres &&
					alquileres.map((alquiler, index) => {
						return (
							<MisAlquileres
								key={index}
								horaComienzo={alquiler.hora_comienzo}
								horaFInal={alquiler.hora_final}
								bicicleta={alquiler.bicicleta}
								id={alquiler.id}
								precioFinal={alquiler.precio_total}
								idAlquilerCargando={idAlquilerCargando}
								finalizarAlquiler={finalizarAlquiler}
							/>
						);
					})}
				<div className="my-5">
					<nav aria-label="Page navigation my-5 d-block">
						{paginationInfo && (
							<Pagination
								activePage={activePage}
								itemsCountPerPage={paginationInfo.per_page}
								totalItemsCount={paginationInfo.total}
								onChange={handlePageChange}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination justify-content-center"
							/>
						)}
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Alquileres;
