import { Link } from "react-router-dom";
import "./style.scss";

export default function Footer({ setLanguage }) {
	function handleLanguageChange(event) {
		const selectedLanguage = event.target.value;
		setLanguage(selectedLanguage);
	}
	return (
		<footer className="login-footer">
			<div className="login-footer-wrap">
				<Link to="/" className="copyright">
					KitCoop&copy; 2023
				</Link>

				<select onChange={handleLanguageChange}>
					<option value="FR">Francais</option>
					<option value="AR">العربية</option>
					<option value="AMZ">ⵜⵉⴼⵉⵏⴰⵖ</option>
				</select>

				{/*<div>
					Avez-vous trouvé un bug ? <Link to="/">Contacter-nous.</Link>
				</div>*/}
			</div>
		</footer>
	);
}
