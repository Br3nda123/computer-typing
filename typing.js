const box = document.querySelector(".typing");
const text = [
	"Wow! Cieszę się, ze jesteś. ^Lubię mówić do ludzi!",
	"Jak masz na imię? Może Stanisław? ^Był tu taki Stanisław kiedyś, spędzieliśmy razem piękne wpólne chwile.",
	"Niestety żona kazała mu odejść od monitora i wrzucić wegiel do pieca. ^Mam nadzieję, że Ty nie masz pieca!",
];
let wordIndex = 0;
let textIndex = 0;
let oldTime = 0;
const speed = 80;
const stop = 2000;
let activeDOMElement = box;

const typing = (newTime) => {
	const letter = text[textIndex].substr(wordIndex, 1);
	if (newTime - oldTime > speed) {
		if (wordIndex === text[textIndex].length - 1) {
			if (textIndex === text.length - 1) return;
			return setTimeout(() => {
				box.textContent = "";
				textIndex++;
				wordIndex = 0;
				requestAnimationFrame(typing);
			}, stop);
		} else if (wordIndex === 0 || letter === "^") {
			const p = document.createElement("p");
			box.appendChild(p);
			activeDOMElement = p;
		}

		if (!(letter === "^")) {
			activeDOMElement.textContent += letter;
		}
		oldTime = newTime;
		wordIndex++;
	}
	requestAnimationFrame(typing);
};

const bars = () => {
	const tl = new TimelineMax({
		onComplete: bars,
	});
	const voiceBars = document.querySelector("#voice-bars");
	const barsElements = document.querySelectorAll("#voice-bars rect");

	const scale = () => {
		return 0.1 + Math.random() * 3;
	};

	const color = () => {
		const colors = ["green", "red", "blue", "yellow"];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	tl.set(barsElements, {
		y: -30,
		transformOrigin: "50% 50%",
	});
	tl.staggerTo(
		barsElements,
		0.7,
		{
			scaleY: scale,
			repeat: 1,
			yoyo: true,
			fill: color,
			ease: Bounce.easeIn,
		},
		0.1
	);
	return tl;
};
const blink = () => {
	const tl = new TimelineMax({
		repeat: -1,
		repeatDelay: 3,
		delay: 2,
	});
	const eyes = document.querySelectorAll("#eye-left, #eye-right");
	tl.set(eyes, {
		transformOrigin: "50% 50%",
	})
		.to(eyes, 0.1, {
			scaleY: 0,
			fill: "#231f20",
		})
		.to(eyes, 0.1, {
			scaleY: 1,
			fill: "#48b3e6",
		})
		.to(eyes, 0.04, {
			scaleY: 0,
			fill: "#231f20",
			delay: 0.1,
		})
		.to(eyes, 0.04, {
			scaleY: 1,
			fill: "#48b3e6",
		})
		.to(eyes, 0.15, {
			scaleY: 0,
			fill: "#231f20",
			delay: 1.2,
		})
		.to(eyes, 0.16, {
			scaleY: 1,
			fill: "#48b3e6",
		});
	return tl;
};
const move = (legs) => {
	const tl = new TimelineMax();
	tl.staggerTo(
		legs,
		0.5,
		{
			y: -60,
			repeat: -1,
			yoyo: true,
			ease: "linear",
		},
		0.5
	);
	return tl;
};

const master = new TimelineMax();
master.add("start");
master.add(bars(), "start");
master.add(move(document.querySelectorAll("#leg-right, #leg-left")), "start");
master.add(blink(), "start");

typing();
