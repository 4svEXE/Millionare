const intro = qs('#video_bg')

intro.volume = 0
intro.autoplay = true
intro.loop = false

if (intro.readyState) {
	intro.play()
	qs('.loader').classList.add('disable')
}

setTimeout(() => {
	intro.style.zIndex = "-1"
	qs('.header').style.top = "0px";
	qs('.wrapper').classList.add('wp_opasity')
	qs('.loader').classList.add('blured')
	qs('.menu').classList.add('active')
}, 5000);

const autoPlay = () => {
	if (intro.currentTime == intro.duration) intro.currentTime = 17.5

	if (intro.currentTime > 18.3) {
		intro.currentTime = 17.7
		intro.playbackRate = 0.8
	}
}
setInterval(autoPlay,500)

// to do //
// intro.volume = 0
// qs('.header').style.top = "0px";
// intro.style.zIndex = "-1"
// qs('.menu').classList.add('active')
// qs('.loader').style.display = 'none'