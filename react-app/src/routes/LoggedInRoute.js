import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Connect } from "../pages/connect";

export default function LoggedInRoute() {
	const { user } = useSelector((state) => ({ ...state }));
	return user ? <Outlet /> : <Connect />;
}
