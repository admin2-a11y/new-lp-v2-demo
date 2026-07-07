
'use strict';
function countdownTimer_page_timer() {
	let startDate_page_timer = new Date();
	startDate_page_timer.setHours(9, 30, 0);
	let endDate_page_timer = new Date();
	endDate_page_timer.setHours(20, 59, 59);
	let nowDate = new Date();
	startDate_page_timer.setDate(nowDate.getDate());
	endDate_page_timer.setDate(nowDate.getDate());
	let period = endDate_page_timer - nowDate;
	let addZero = function (n) { return ('0' + n).slice(-2); }
	let elem = document.getElementById('timerTop');
	if (!elem) return; // 見つからない場合、処理を終了
	if (period >= 0 && nowDate >= startDate_page_timer) {
		let hour = Math.floor(period / (1000 * 60 * 60));
		period -= (hour * (1000 * 60 * 60));
		let minutes = Math.floor(period / (1000 * 60));
		period -= (minutes * (1000 * 60));
		let second = Math.floor(period / 1000);
		let millisecond = Math.floor(period);
		let insert = '';
		insert += '<div><span>' + addZero(hour) + '</span>' + '時間';
		insert += '<span>' + addZero(minutes) + '</span>' + '分';
		insert += '<span>' + addZero(second) + '</span>' + '秒</div>';
		let str = '';
		elem.parentNode.previousElementSibling.style.display = 'flex';
		elem.parentNode.style.display = 'flex';
		elem.parentNode.nextElementSibling.style.display = 'none';
		elem.parentNode.parentNode.lastElementChild.innerHTML = str;
		elem.innerHTML = str + insert;
		setTimeout(countdownTimer_page_timer, 1000);
	} else {
		elem.parentNode.previousElementSibling.style.display = 'none';
		elem.parentNode.style.display = 'none';
		elem.parentNode.parentNode.lastElementChild.style.display = 'flex';
		setTimeout(countdownTimer_page_timer, 1000);
	}
}
countdownTimer_page_timer();

function countdownTimer(elem) {
	let startDate = new Date();
	startDate.setHours(9, 30, 0);
	let endDate = new Date();
	endDate.setHours(20, 59, 59);

	function updateTimer() {
		let nowDate = new Date();
		startDate.setDate(nowDate.getDate());
		endDate.setDate(nowDate.getDate());
		let period = endDate - nowDate;
		let addZero = (n) => ('0' + n).slice(-2);

		if (period >= 0 && nowDate >= startDate) {
			let hour = Math.floor(period / (1000 * 60 * 60));
			period -= (hour * (1000 * 60 * 60));
			let minutes = Math.floor(period / (1000 * 60));
			period -= (minutes * (1000 * 60));
			let second = Math.floor(period / 1000);

			let insert = `残り<span>${addZero(hour)}</span>時間
                          <span>${addZero(minutes)}</span>分
                          <span>${addZero(second)}</span>秒`;

			let str = '<span>本日中</span>に借りるなら';
			elem.parentNode.previousElementSibling.style.display = 'block';
			elem.parentNode.style.display = 'block';
			elem.parentNode.parentNode.lastElementChild.style.display = 'none';
			elem.parentNode.previousElementSibling.innerHTML = str;
			elem.innerHTML = insert;

			setTimeout(updateTimer, 1000);
		} else {
			elem.parentNode.previousElementSibling.style.display = 'none';
			elem.parentNode.style.display = 'none';
			elem.parentNode.parentNode.lastElementChild.style.display = 'block';
			setTimeout(updateTimer, 1000);
		}
	}
	updateTimer();
}

document.querySelectorAll('.timer').forEach(countdownTimer);