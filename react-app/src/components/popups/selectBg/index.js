import "./style.scss";
export default function SelectBg({ setVisible, setSelectedImage, images, selectedImage }) {
	return (
		<div className="blur">
			<div className="select-bg">
				<div className="select-bg-header">
					<i className="fa-solid fa-xmark" onClick={() => setVisible(false)}></i>
					<span>Changer le fond d'écran</span>
					<span>Sélectionnez une image d'arrière-plan :</span>
				</div>
				<div className="image-grid">
					{images.map((image) => (
						<img
							key={image}
							src={image}
							className={selectedImage === image ? "selected" : ""}
							alt="Background"
							onClick={() => setSelectedImage(image)}
						/>
					))}
				</div>
				<button
					className="btn"
					onClick={() => {
						setVisible(false);
					}}
				>
					Appliquer
				</button>
			</div>
		</div>
	);
}
