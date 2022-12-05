qs('#percent').onclick = () => {
	if(qs('#percent').classList.contains('disable')) {
		console.log(['_jeb', 'player', 'sosiska killer', 'minecraft', 'стив', 'майнкрафт'])
	} else {
		saveGame()
		for (var i = 0; i < 2; i++) {
			if (i != correct) {
				qsa('.answer')[i].style.display = 'none'
				qsa('.answer')[i+1].style.display = 'none'

				setTimeout(() => {
					qsa('.answer')[i].style.display = 'block'
					qsa('.answer')[i+1].style.display = 'block'
				},7000);
				break;
			}
		}
		qs('#percent').classList.add('disable')
	}
}

qs('#call').onclick = () => {
	if(qs('#call').classList.contains('disable')) {
		console.log(['кибер', 'бомж', 'kiber sosiska', 'сука', 'пес', 'квас'])
	} else {
		saveGame()
		if (random(1, 10) < 9) {
			showMessage(callText + qsa('.answer')[correct].innerHTML, 3000)
		} else {
			if (correct - 1 >= 0) {
				showMessage(callText + qsa('.answer')[correct - 1].innerHTML, 3000)
			} else {
				showMessage(callText + qsa('.answer')[correct + 1].innerHTML, 3000)
			}
		}
		qs('#call').classList.add('disable')
	}
}

qs('#peoples').onclick = () => {
	if(qs('#peoples').classList.contains('disable')) {
		console.log(['fresko', 'Жак Фреско', 'жак фреско', 'Андрій', 'андрій', 'админ', 'адмін', 'admin', 'future', 'step', 'Jack'])
	} else {
		saveGame()
		if (random(1, 10) < 10) {
			showMessage(qsa('.answer')[correct].innerHTML, 3000)
		} else {
			if (correct - 1 >= 0) {
				showMessage(qsa('.answer')[correct - 1].innerHTML, 3000)
			} else {
				showMessage(qsa('.answer')[correct + 1].innerHTML, 3000)
			}
		}
		qs('#peoples').classList.add('disable')
	}
}