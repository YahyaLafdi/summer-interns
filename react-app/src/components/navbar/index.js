import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function NavBar({ isAdmin, activeTab, setVisible, setActiveTab, setRefetch, refetch }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		Cookies.set("user", "");
		dispatch({ type: "LOGOUT" });
		navigate("/connect");
	};
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		setRefetch(!refetch); // toggle refetch state to trigger the effect
	};

	return (
		<nav className="sidebar close">
			<header>
				<i className="bx bx-chevron-right toggle"></i>
			</header>

			<div className="menu-bar">
				<div className="menu">
					<ul className="menu-links">
						<li className="nav-link">
							<Link
								onClick={() => {
									handleTabClick("home");
								}}
							>
								<img src="./images/icons/compass.png" alt="" />
								<span className="text nav-text">Tableau de bord</span>
							</Link>
						</li>
						<div className="miniHeader">
							<span>Gestion des ressources</span>
						</div>
						{isAdmin && (
							<li className="nav-link">
								<Link
									className={activeTab === "utilisateur" ? "active" : ""}
									onClick={() => {
										handleTabClick("utilisateur");
									}}
								>
									<img src="./images/icons/teamwork.png" alt="" />
									<span className="text nav-text">Gestion utilisateurs</span>
								</Link>
							</li>
						)}

						<li className="nav-link">
							<Link
								className={activeTab === "fournisseur" ? "active" : ""}
								onClick={() => handleTabClick("fournisseur")}
							>
								<img src="./images/icons/delivery-truck.png" alt="" />{" "}
								<span className="text nav-text">Gestion fournisseurs</span>
							</Link>
						</li>

						<li className="nav-link">
							<Link
								className={activeTab === "client" ? "active" : ""}
								onClick={() => handleTabClick("client")}
							>
								<img src="./images/icons/customer-service.png" alt="" />{" "}
								<span className="text nav-text">Gestion Clients</span>
							</Link>
						</li>

						<li className="nav-link">
							<Link
								className={activeTab === "personnel" ? "active" : ""}
								onClick={() => handleTabClick("personnel")}
							>
								<img src="./images/icons/worker.png" alt="" />{" "}
								<span className="text nav-text">Gestion Personnels</span>
							</Link>
						</li>

						<li className="nav-link">
							<Link
								className={activeTab === "adherent" ? "active" : ""}
								onClick={() => {
									handleTabClick("adherent");
								}}
							>
								<img src="./images/icons/add-friend.png" alt="" />{" "}
								<span className="text nav-text">Gestion Adhérents</span>
							</Link>
						</li>
						<li className="nav-link">
							<Link
								className={activeTab === "matiere" ? "active" : ""}
								onClick={() => {
									handleTabClick("matiere");
								}}
							>
								<img src="./images/icons/coop.png" alt="" />{" "}
								<span className="text nav-text">matières et fournitures</span>
							</Link>
						</li>
						<li className="nav-link">
							<Link
								className={activeTab === "produit" ? "active" : ""}
								onClick={() => {
									handleTabClick("produit");
								}}
							>
								<img src="./images/icons/package.png" alt="" />{" "}
								<span className="text nav-text">Gestion Produits</span>
							</Link>
						</li>
						<div className="miniHeader">
							<span>Operations</span>
						</div>
						<li className="nav-link">
							<Link
								className={activeTab === "achat" ? "active" : ""}
								onClick={() => {
									handleTabClick("achat");
								}}
							>
								<img src="./images/icons/shopping-cart.png" alt="" />{" "}
								<span className="text nav-text">Achats</span>
							</Link>
						</li>
						<li className="nav-link">
							<Link
								className={activeTab === "production" ? "active" : ""}
								onClick={() => {
									handleTabClick("production");
								}}
							>
								<img src="./images/icons/assembly-line.png" alt="" />{" "}
								<span className="text nav-text">Production</span>
							</Link>
						</li>
					</ul>
				</div>

				<div className="bottom-content">
					<div className="miniHeader">
						<span>Paramètres</span>
					</div>{" "}
					<li className="">
						<Link onClick={() => setVisible(true)}>
							<img src="./images/icons/settings.png" alt="" />{" "}
							<span className="text nav-text">Paramètres</span>
						</Link>
					</li>
					<li className="">
						<Link onClick={() => setVisible(true)}>
							<img src="./images/icons/graphic-designer.png" alt="" />{" "}
							<span className="text nav-text">Fond d'écran</span>
						</Link>
					</li>
					<li className="">
						<Link onClick={() => logout()}>
							<img src="./images/icons/exit.png" alt="" />{" "}
							<span className="text nav-text">Se déconnecter</span>
						</Link>
					</li>
				</div>
			</div>
		</nav>
	);
}
