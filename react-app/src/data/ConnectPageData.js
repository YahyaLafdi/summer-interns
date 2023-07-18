import passwordAudioAR from "../assets/audios/passwordAR.mp3";
import passwordAudioFR from "../assets/audios/passwordFR.mp3";
import usernameAudioAR from "../assets/audios/usernameAR.mp3";
import usernameAudioFR from "../assets/audios/usernameFR.mp3";
import forgotPasswordAudioAR from "../assets/audios/forgotPasswordAR.mp3";
import forgotPasswordAudioFR from "../assets/audios/forgotPasswordFR.mp3";

export const ConnectData = {
	FR: {
		description: [
			"Simplifiez la gestion de votre coopérative en gérant facilement vos ",
			"membres",
			", vos ",
			"activités ",
			"et vos ",
			"finances ",
			"et plus en un seul endroit. ",
			"Connectez-vous ",
			"dès maintenant pour accéder à toutes les informations importantes concernant votre ",
			"coopérative.",
		],
		forgetPassword: ["Mot de passe oublié ? ", "Récupérer votre compte."],
		connecter: "Se Connecter",
	},
	AR: {
		description: [
			"قم بتبسيط إدارة تعاونك من خلال إدارة ",
			"أعضائك ",
			"و, ",
			"أنشطتك ",
			"و, ",
			"أموالك ",
			"وغير ذلك بسهولة في مكان واحد. ",
			"قم بتسجيل الدخول ",
			"الآن للوصول إلى جميع المعلومات المهمة حول ",
			"تعاونيتك",
		],
		forgetPassword: ["نسيت كلمة السر ؟ ", "استردد حسابك"],
		connecter: "تسجيل الدخول",
	},
	AMZ: {
		description:
			"ⵙ ⵙⵉⵎⴱⵉⵍⵓⵣⵉⵏ ⵍⵖⵔⴰⵏⵢⵓ ⵏ ⵜⴰⵜⴼⵓⵜⵔⵓⴳⵉⴹ ⵉⴷⴰⴳⴳⴰⵣⴰⴻⵜ ⵜⴰⴳⴳⴰⴼⴼⴰⵜ ⴰⴷ ⵜⴰⵍⴻⵍⴻⵍⴻⵜ ⵜⵓⵙⵓⵏⵓⵏ ⵎⵉⵎⵎⵔⵓⵙⵉⵣⵜ ⵜⵓⵙⵓⵏⵓⵏ ⵜⵓⵔⵓⵏⵉⵜ, ⵣⴳⵣⵣⵓⵜ ⵏ ⵓⵏ ⵙⵉⵍⵓ ⵉⵏⵓ. ⴷⴰⵔ ⵜⴰⵡⴰⵍⴰ ⴷⴰⴷ ⴽⴼⴻⴼⴻⴷⴰⴷ ⴰⴼⵔⴰⵔ ⵜⵜⵜ ⴷⴰⴳⴳⴰⵎⴰⵢ ⵜⵓⵎⵎⵉⵣⵓⵜ ⵜⵜⵜ ⵜⵣⵔⵉⵍⵍⵉ ⵜⵜⵜ ⵜⵓⵙⵓⵏⵓⵏ.",
	},
};

export const AudioFiles = {
	username: {
		AR: usernameAudioAR,
		FR: usernameAudioFR,
	},
	password: {
		AR: passwordAudioAR,
		FR: passwordAudioFR,
	},
	forgotPassword: {
		AR: forgotPasswordAudioAR,
		FR: forgotPasswordAudioFR,
	},
};

export const ValidationData = {
	FR: {
		usernameRequired: "Le nom d'utilisateur est obligatoire.",
		passwordRequired: "Le mot de passe est obligatoire.",
	},
	AR: {
		usernameRequired: "اسم المستخدم مطلوب",
		passwordRequired: "كلمة المرور مطلوبة",
	},
};

export const Placeholders = {
	FR: {
		username: "Nom d'utilisateur",
		password: "Mot de passe",
	},
	AR: {
		username: "اسم المستخدم",
		password: "كلمة المرور ",
	},
};
