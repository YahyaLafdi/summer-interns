import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Connect } from "./pages/connect";
import Reset from "./pages/reset";
import Users from "./pages/main";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
import LoggedInRoute from "./routes/LoggedInRoute";
import ResetRoute from "./routes/ResetRoute";
import { VerifyEmail } from "./pages/verifyEmail";
import { EmailVerified } from "./pages/emailVerified";
import SendEmailForgottenPassword from "./pages/sendEmailForgottenPassword";

function App() {
	return (
		<div>
			<Routes>
				<Route element={<LoggedInRoute />}>
					<Route element={<ResetRoute />}>
						<Route path="/reset" element={<Reset />} exact />
					</Route>
					<Route path="/verify" element={<VerifyEmail />} exact />
					<Route path="/" element={<Users />} exact />
				</Route>
				<Route element={<NotLoggedInRoute />}>
					<Route path="/identify" element={<SendEmailForgottenPassword />} exact />
					<Route path="/connect" element={<Connect />} exact />
				</Route>
				<Route path="/verified" element={<EmailVerified />} exact />
			</Routes>
		</div>
	);
}

export default App;
