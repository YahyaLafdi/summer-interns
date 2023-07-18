import { useCallback, useRef, useState } from "react";

import Cropper from "react-easy-crop";
import "./style.scss";

import getCroppedImg from "../../utils/getCroppedImg";

export default function UpdateProfilePicture({
	setZoom,
	crop,
	setCrop,
	zoom,
	getCroppedImage,
	setImage,
	image,
	onCropComplete,
	setShow,
}) {
	const [description, setDescription] = useState("");

	const slider = useRef(null);

	const zoomIn = () => {
		slider.current.stepUp();
		setZoom(slider.current.value);
	};
	const zoomOut = () => {
		slider.current.stepDown();
		setZoom(slider.current.value);
	};
	const save = (img) => {
		getCroppedImage("show");
		setImage(img);
		setShow(false);
	};

	return (
		<div className="postBox update_img">
			<div className="box_header">
				<div className="small_circle" onClick={() => setShow(false)}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<span>Mis a jour de la photo</span>
			</div>

			<div className="update_center">
				<div className="crooper">
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						aspect={1 / 1}
						cropShape="round"
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
						showGrid={false}
					/>
				</div>
				<div className="slider">
					<div className="slider_circle hover1" onClick={() => zoomOut()}>
						<i className="fa-solid fa-minus"></i>
					</div>
					<input
						type="range"
						min={1}
						max={3}
						step={0.2}
						ref={slider}
						value={zoom}
						onChange={(e) => setZoom(e.target.value)}
					/>
					<div className="slider_circle hover1" onClick={() => zoomIn()}>
						<i className="fa-solid fa-plus"></i>
					</div>
				</div>
			</div>
			<div className="flex_up">
				<div className="gray_btn" onClick={() => getCroppedImage("show")}>
					<i className="fa-solid fa-crop"></i>Recadrer
				</div>
				<div className="gray_btn">
					<i className="fa-solid fa-download"></i>Télécharger
				</div>
			</div>
			<div className="update_submit_wrap">
				<div className="blue_link" onClick={() => setShow(false)}>
					Annuler
				</div>
				<button className="blue_btn" onClick={() => save(image)}>
					Enregistrer
				</button>
			</div>
		</div>
	);
}
