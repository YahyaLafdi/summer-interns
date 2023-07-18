import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ResetRoute() {
	const { user } = useSelector((state) => ({ ...state }));
	return user.passwordChanged ? <Navigate to="/verify" /> : <Outlet />;
}
