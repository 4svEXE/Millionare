function printQwestions() {
	let result = `<span class="point_title">РІВНІ: </span>`

	for (var i = 0; i < qwestions.length; i++) {
		result += `<div class="level_title"><span class="">рівень ${i+1}</span><button class="add_qwest" >+</button></div>
		<div class="qwestions_cont">
		`
		let egg = 0

		for (q of qwestions[i]) {
			result += `<div class="qwest flex" tooltip="${q.qwestion}">`
			result += `<input type="text" disabled value="${q.qwestion}">`
			result += `
				<div>
					<button class="redact" egg="${egg}">e</button>
					<button class="delete" egg="${egg}" >x</button>
				</div>
							
			</div>
			`
			egg++
		}
		result += `</div>`
	}

	result += `</div>`

	qs('.level_point').innerHTML = result

	qsa('.level_title').forEach((el, id) => {
		el.addEventListener('click', () => {
			qsa('.qwestions_cont')[id].classList.toggle('active')
		})
	})

	qsa('.add_qwest').forEach((el, id) => {
		el.addEventListener('click', () => {
			qs('#new_level').value = id + 1
			qs('#new_qestion').focus()
			levelTitleRange()
		})
	})

	deleteQwestion()
}

printQwestions()

function addSaveButton() {
	qwestions_db = `const qwestions = ` + JSON.stringify(qwestions, null, 3)
	const tooltip = 'збережений файл перемістити в папку з грою в папку js iз заміною файлів'
	let sawer = `<a id="save_button" tooltip="${tooltip}" href="data:text/plain; charset=utf-8,${encodeURIComponent(qwestions_db)}" download="qwestions.js">ЗБЕРЕГТИ ВСЕ</a>`
	qs('.save_button').innerHTML = sawer
}

qsa('.nav').forEach((el, id) => {
	el.addEventListener('click', () => {
		if (qs('#new_level').value - 1 > 0 && id == 0) {
			qs('#new_level').value--
		}
		if (qs('#new_level').value < 15 && id == 1) {
			qs('#new_level').value++
		}

		levelTitleRange()
	})
})

function levelTitleRange() {
	for (btn of qsa('.level_title')) {
		if (btn.classList.contains('range')) {
			btn.classList.remove('range')
		}
	}
	qsa('.level_title')[qs('#new_level').value - 1].classList.add('range')
}
levelTitleRange()

add_qwestion.onclick = () => {
	let corector = true
	for (ans of qsa('.new_answer')) {
		if (ans.value == '') {
			showMessage('Заповніть всі поля!')
			corector = false
			break;
		}
	}

	if (corector) {
		let lvl = qs('#new_level').value - 1
		qwestions[lvl][qwestions[lvl].length] = {}
		let new_qwest = qwestions[lvl][qwestions[lvl].length - 1]

		new_qwest.level = lvl
		new_qwest.qwestion = new_qestion.value

		new_qwest.answers = []

		for (var i = 0; i < 4; i++) {
			new_qwest.answers[i] = {}
			new_qwest.answers[i].answer = qsa('.new_answer')[i].value
			if (i == 0) {
				new_qwest.answers[i].correct = true
			} else {
				new_qwest.answers[i].correct = false
			}
			
		}

		let rand = random(0,3)
		let buffer = {}

		buffer = new_qwest.answers[0]
		new_qwest.answers[0] = new_qwest.answers[rand]
		new_qwest.answers[rand] = buffer

		showMessage('Питання додане але не збережене!')
		printQwestions()
		levelTitleRange()

		qs('#new_qestion').value = ''
		for (var i = 0; i < 4; i++) {
			qsa('.new_answer')[i].value = ''
		}

		addSaveButton()
	}
}

function deleteQwestion() {
	qsa('.level_title').forEach((el, id) => {			
		el.onclick = () => {
			qsa('.delete').forEach(del => {
				del.onclick = () => {
					showMessage(`Питання видалено! ${qwestions[id][+del.getAttribute('egg')].qwestion}!`, 4000)
					qwestions[id].splice(+del.getAttribute('egg'), 1)
					printQwestions()
				}
			})

			qsa('.redact').forEach(red => {
				red.onclick = () => {
					let egg = +red.getAttribute('egg')
					let turn = 1

					showMessage(`це питання було видалено та підготовлене для редагування!`, 4000)

					qs('#new_level').value = qwestions[id][egg].level + 1
					qs('#new_qestion').value = qwestions[id][egg].qwestion

					for (var i = 0; i < 4; i++) {
						if (qwestions[id][egg].answers[i].correct == true) {
							qsa('.new_answer')[0].value = qwestions[id][egg].answers[i].answer
						} 
						if (qwestions[id][egg].answers[i].correct == false) {
							qsa('.new_answer')[turn++].value = qwestions[id][egg].answers[i].answer
						}
					}

					qwestions[id].splice(egg, 1)
					printQwestions()
				}
			})
		}
	})
}