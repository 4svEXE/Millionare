let correct = 3
let activeTimer = false
let answerCooldown = false

let player = {
	name: 'player name',
	avatar: 'user-ninja.svg',
	level: 0,
	time: 100,
	winn: () => {
		if (player.level >= 14) {
			showMessage('ти переміг, ' + player.name)
			qs('.scene').style.backgroundImage = 'url(img/winn.gif)'
			setTimeout(() => location.reload(),9000);
		}else {
			player.level++
			ballanceUpp()
			printQwestion()
			saveGame()
		}
	},
	lose: () => {
		if (player.level < 5) {
			showMessage('ти програв, ' + player.name)
		}
		else if (5 < player.level < 10) {
			showMessage('ти програв, ' + player.name + ' але 5000 твої!', 3000)
		}
		else if (10 <= player.level < 14) {
			showMessage('ти програв, ' + player.name + ' але 100 000 твої!', 3000)
		}
		else if (player.level == 14) {
			showMessage('ти був так близько але програв, ' + player.name + ' не засмучуйся!', 3000)
		}
		
		qs('.scene').style.right = '-100%'
		localStorage.removeItem('millionerPlayer')
		player.level = 0
		player.time = 100
		qs('#percent').disabled = false
		qs('#call').disabled = false
		qs('#peoples').disabled = false
		activeTimer = false
		reloadGame()
		resume.disabled = true
	}
}

function printQwestion() {
	player.time = 100
	setTimeout(() => activeTimer = true,2000);
	answerCooldown = false
	
	qwestions.forEach((qwest, id) => {
		if (player.level == id) {
			let rand = random(0, qwest.length - 1)

			qs('.qwestion').innerHTML = qwest[rand].qwestion

			showMessage(qwest[rand].qwestion, 3000)

			for (var i = 0; i < 4; i++) {
				qsa('.answer')[i].innerHTML = qwest[rand].answers[i].answer
				if (qwest[rand].answers[i].correct) correct = i
			}
		}
	})
}

qsa('.answer').forEach((ans, id) => {
	ans.addEventListener('click', () => {
		if (!answerCooldown) {
			activeTimer = false
			answerCooldown = true

			qsa('.answer')[id].classList.toggle('choised')
			setTimeout(() => { qsa('.answer')[id].classList.toggle('choised')}, 8000);

			setTimeout(() => {
			    showCorrect()
			},5000);

			showMessage(`${player.name} дав відповідь ${qsa('.answer')[id].innerHTML}`,3000)

			setTimeout(() => {
			    if (id === correct) {
					player.winn()
				} else {
					player.lose()
				}
			},5000 + 4000);
		}
	})
})

const timer = () => {
	if (activeTimer) {
		qs('.time').style.width = player.time--  + '%'
		if (player.time == 0) player.lose()
	}
}
setInterval(timer,1000 / 5)

function showCorrect() {
	qsa('.answer')[correct].classList.toggle('correct')
	setTimeout(() => { qsa('.answer')[correct].classList.toggle('correct')}, 3000);
}

function ballanceUpp() {
	qsa('.point')[player.level].classList.add('active')
}