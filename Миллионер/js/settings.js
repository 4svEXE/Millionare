qs('#set_menu').onclick = () => {
	qs('.scene').style.right = '-100%'
	reloadGame()
	qs('.level_editor').classList.remove('active')
	activeTimer = false

	if (player.level < 1) {
		resume.disabled = true
	} else {
		resume.disabled = false
	}
}

level_editor.onclick = () => qs('.level_editor').classList.add('active')

new_game.onclick = () => {
	qs('.scene').style.right = '0%'
	localStorage.removeItem('millionerPlayer')
	player.level = 0
	saveGame()

	for (var i = 0; i < 3; i++) {
		qsa('.bonuses .setting_button')[i].classList.remove('disable')
	}

	for (let i = 1; i < 15; i++) {
		qsa('.point')[i].classList.remove('active')
	}
	printQwestion()
}

resume.onclick = () => {
	qs('.scene').style.right = '0%'
	loadSettings()
	printQwestion()
}

exit.onclick = () => showMessage(exitMsg, 3000)

//налаштування імені гравця
qs('.player').ondblclick = () => changeName()
qs('#change_name').onclick = () => changeName()
qs('#player_name').onkeypress = e => e.keyCode == 13?changeName():0

function changeName() {
	if (!(qs('#player_name').disabled)) {
		qs('#change_name').src = 'img/icons/edit.svg'
		player.name = qs('#player_name').value
		qs('#player_name').disabled = true
	} else {
		qs('#change_name').src = 'img/icons/save.svg'
		qs('#player_name').disabled = false
		qs('#player_name').focus()
	}

	reloadGame()
}

// управління звуком
function checkOnlineState(){
  if (navigator.onLine){
	qs('#audio').src = `https://pub0302.101.ru:8443/stream/pro/aac/64/358?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcCI6IjE3Ni4xMjQuMTM0LjEyNCIsInVzZXJhZ2VudCI6Ik1vemlsbGFcLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdFwvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lXC85NS4wLjQ2MzguNjkgU2FmYXJpXC81MzcuMzYgT1BSXC84MS4wLjQxOTYuNjAiLCJ1aWRfY2hhbm5lbCI6IjM1OCIsInR5cGVfY2hhbm5lbCI6ImNoYW5uZWwiLCJleHAiOjE2MzkwMDU5ODZ9.bH6fMieQYWEhqkOrj2HGjIdi6-k1YQYFgeb0QzofUyM`
  } else {
    qs('#audio').src = 'audio/0.mp3'
  }
}
window.addEventListener('online',  checkOnlineState);

checkOnlineState();


qs('#audio').volume = 0

sound.onclick = function() {
	checkOnlineState();
	if (qs('#sound').classList.contains('disable')) {
		qs('#audio').play()
		qs('#audio').volume = 0.05
		qs('#sound').src = 'img/icons/sound-on.svg'
		qs('#sound').classList.remove('disable')
	} else {
		qs('#audio').volume = 0
		qs('#sound').src = 'img/icons/sound-off.svg'
		qs('#sound').classList.add('disable')
	}
}

// avatars
const avatars = ['user-ninja.svg', 'police-officer.svg', 'business-person.svg', 'child-cognition.svg', 'construction-worker.svg', 'death-alt.svg', 'donkey.svg', 'elderly-person.svg', 'female-doctor.svg', 'girl-1-5-years.svg']
avatars.forEach(el => {
	let avatar = document.createElement('img')
	avatar.classList.add('avatar')
	avatar.classList.add('setting_button')
	avatar.src = 'img/avatars/' + el
	qs('.avatars').appendChild(avatar)
})

qsa('.avatar').forEach((el, id) => {
	el.onclick = () => {
		qs('.avatars').classList.remove('active')
		player.avatar = avatars[id]
		reloadGame()
	}
})

qs('.player_avatar').onclick = () => qs('.avatars').classList.toggle('active')