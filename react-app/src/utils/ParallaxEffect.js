export default function ParallaxEffect(speedX, speedY) {
	document.addEventListener("mousemove", parallax);
	function parallax(e) {
		document.querySelectorAll(".object").forEach(function (move) {
			var moving_value = move.getAttribute("data-value");
			var x = (e.clientX * moving_value) / speedX;
			var y = (e.clientY * moving_value) / speedY;
			move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
		});
	}
}
