const qs = el => document.querySelector(el)
const qsa = el => document.querySelectorAll(el)
const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

function dubbleToggle(el, clName, time = 500){
	qs(el).classList.toggle(clName)
	setTimeout(() => { qs(el).classList.toggle(clName)}, time);
}

function showMessage(message, duration = 1500) {
	qs('.message').innerHTML = message
	dubbleToggle('.messages', 'active', duration)
}

qs('body').insertAdjacentHTML('beforeend', `<div class="scripts"></div>`)
const include = src =>{
	const sript = document.createElement('script')
	sript.src = src
	sript.async = true
	qs('.scripts').appendChild(sript)
}

include('js/lang.js')

include('js/intro.js')
include('js/qwestions.js')
include('js/fullScreen.js')
include('js/settings.js')
include('js/level-editor.js')

include('js/main.js')
include('js/bonuses.js')
include('js/local-storage.js')