class Player{
	constructor(player){
		this.name = player.name
		this.avatar = player.avatar
		this.level = player.level
		this.bonuses = [
			!(qs('#percent').classList.contains('disable')),
			!(qs('#call').classList.contains('disable')),
			!(qs('#peoples').classList.contains('disable')),
		]
		this.sound = !(qs('#peoples').classList.contains('disable'))
	}
}

function loadGame() {
	if (localStorage.millionerPlayer) {
		loadSettings()
		qs('#resume').disabled = false
	} else {
		saveGame()
		qs('#resume').disabled = true
	}
	if (player.level < 1) resume.disabled = true
}
loadGame()


function saveGame() {
	addPlayerMom()

	qs('.player_avatar').src = 'img/avatars/' + player.avatar
	player.name = qs('#player_name').value
	localStorage.setItem('millionerPlayer', JSON.stringify(new Player(player)))
}

function loadSettings() {
	let player_db = JSON.parse(localStorage.millionerPlayer)

	qs('#player_name').value = player_db.name
	qs('.player_avatar').src = 'img/avatars/' + player_db.avatar
	player.avatar = player_db.avatar
	player.level = player_db.level

	for (var i = 0; i < 3; i++) {
		if (!player_db.bonuses[i]) qsa('.bonuses .setting_button')[i].classList.add('disable')
	}

	if (!player_db.sound) qs('#sound').classList.add('disable')

	for (point of qsa('.point')) {
		point.classList.remove('active')
	}

	for (let i = 0; i < player_db.level + 1; i++) {
		qsa('.point')[i].classList.add('active')
	}
}

function reloadGame() {
	saveGame()
	loadGame()
}

function addPlayerMom() {
	let names = [
		['_jeb', 'player', 'sosiska killer', 'minecraft', 'стив', 'майнкрафт'],
		['кибер', 'бомж', 'kiber sosiska', 'сука', 'пес', 'квас'],
		['fresko', 'Жак Фреско', 'жак фреско', 'Андрій', 'андрій', 'админ', 'адмін', 'admin', 'future', 'step', 'Jack'],
	]

	checker:
	for (var i = 0; i < names.length; i++) {
		for (n of names[i]) {
			if (player.name == n || qs('#player_name').value == n) {
				switch (i) {
					case 0:
						qs('.scene').style.backgroundImage = 'url(img/eggs/mine.gif)'
						player.avatar = '_jeb.gif'
						break checker;
					case 1:
						qs('.scene').style.backgroundImage = 'url(img/eggs/kiber.gif)'
						break checker;
					case 2:
						qs('.scene').style.backgroundImage = 'url(img/eggs/kiber.gif)'
						player.avatar = 'fre.jpg'
						break checker;
				}
			} else {
				qs('.scene').style.backgroundImage = 'url(img/bg_scene.jpg)'
			}
		}
	}
}