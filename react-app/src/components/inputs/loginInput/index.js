import "./style.scss";
import { useField } from "formik";
import { useMediaQuery } from "react-responsive";

export function LoginInput({
	placeholder,
	formik,
	isError,
	bottom,
	bottomN,
	handleClickAudio,
	playing,
	audioRef,
	isDefault,
	audioFile,
	...props
}) {
	const [field, meta] = useField(props);
	const desktopView = useMediaQuery({ query: "(min-width: 850px)" });

	return (
		<div className="login-input-wrap">
			{meta.touched && meta.error && !bottom && (
				<div
					className={desktopView && !isDefault ? "input-error input-error-desktop" : "input-error"}
					style={{ transform: "translateY(5px)" }}
				>
					{meta.touched && meta.error}
					{meta.touched && meta.error && (
						<div className={desktopView && !isDefault ? "error-arrow-left" : "error-arrow-top"}></div>
					)}
				</div>
			)}

			<div className="input-button">
				<input
					className={meta.touched && meta.error ? "input-error-border" : ""}
					type={field.type}
					name={field.name}
					placeholder={placeholder}
					{...field}
					{...props}
				/>
				<button type="button" className="aud-btn" onClick={handleClickAudio} disabled={playing}>
					<i className="fa-solid fa-circle-play"></i>
				</button>
			</div>
			{meta.touched && meta.error && bottom && (
				<div className={desktopView && !isDefault ? "input-error input-error-desktop" : "input-error"}>
					{meta.touched && meta.error}
					{meta.touched && meta.error && (
						<div className={desktopView && !isDefault ? "error-arrow-left" : "error-arrow-bottom"}></div>
					)}
				</div>
			)}

			{!isDefault && meta.touched && meta.error && (
				<i
					className="fa-solid fa-circle-exclamation"
					style={{ top: `${!bottom && !desktopView ? "60%" : "16px"}`, right: "35px" }}
				></i>
			)}
			{isDefault && meta.touched && meta.error && (
				<i
					className="fa-solid fa-circle-exclamation"
					style={{ top: `${!bottomN ? "60%" : "65%"}`, right: "35px" }}
				></i>
			)}
		</div>
	);
}
