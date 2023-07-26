import axios from "axios";

export default function Disable({ visible, activeTab, setLoading, item, setRefetch, refetch }) {
	const doDisable = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${item.id}`);
			if (data.data.username === "admin") {
				alert("You can not delete the ADMIN !");
				setLoading(false);
				return;
			}
			await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/${activeTab}s/${item.id}/disable`);
			setLoading(false);
			visible(false);
			setRefetch(!refetch);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<div className="blur">
			<div className="delete-container">
				<i className="fa-solid fa-xmark" onClick={() => visible(false)}></i>
				<header>
					Vous êtes sûr ?<img className="action-btn" src="./images/icons/trash-bin.png" alt="" />
				</header>
				<div className="btns">
					<button className="btn red" onClick={doDisable}>
						Desactiver
					</button>
					<button className="btn" onClick={() => visible(false)}>
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
}
