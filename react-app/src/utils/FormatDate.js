export default function FormatDate(dateObject) {
	const formattedDate = dateObject.toLocaleDateString("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}
