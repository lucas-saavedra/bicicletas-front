import { React, useEffect, useState } from "react";
import "./home.css";
import BicicletasDisponibles from "../../components/bicicletasDisponibles/bicicletasDisponibles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function Home() {
	const [bicicletas, setBicicletas] = useState(null);
	const [idBicicletaCargando, setIdBicicletaCargando] = useState(null);
	const [activePage, setActivePage] = useState(1);
	const [paginationInfo, setPaginationInfo] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("bicicletas?page=" + activePage, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response);
				setBicicletas(response.data.data);
				setPaginationInfo(response.data.meta);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [activePage]);

	const alquilarBicicleta = (id) => {
		setIdBicicletaCargando(id);
		axios
			.post(
				"alquileres/inicio",
				{
					bicicleta_id: id,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIdBicicletaCargando(null);
				navigate("/alquileres");
			});
	};

	const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	};

	return (
		<div className="container">
			<h1 className="display-5 text-center my-5">BICICLETAS DISPONIBLES</h1>
			<div className="row">
				{!bicicletas && (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				)}
				{bicicletas &&
					bicicletas.map((bicicleta, index) => {
						return (
							<BicicletasDisponibles
								idBicicletaCargando={idBicicletaCargando}
								key={index}
								alquilada={bicicleta.alquilada}
								foto_url={bicicleta.foto_url}
								id={bicicleta.id}
								marca={bicicleta.marca}
								modelo={bicicleta.modelo}
								precio_por_hora={bicicleta.precio_por_hora}
								alquilarBicicleta={alquilarBicicleta}
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

export default Home;
