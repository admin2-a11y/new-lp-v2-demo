
'use strict';
function countdownTimer_page_timer() {
	let startDate_page_timer = new Date();
	startDate_page_timer.setHours(0, 0, 0, 0);
	let endDate_page_timer = new Date();
	endDate_page_timer.setHours(20, 59, 59, 990);
	let nowDate = new Date();
	startDate_page_timer.setDate(nowDate.getDate());
	endDate_page_timer.setDate(nowDate.getDate());
	let period = endDate_page_timer - nowDate;
	let addZero = function (n) { return ('0' + n).slice(-2); }
	let elem = document.getElementById('timerTop');
	if (!elem) return; // 見つからない場合、処理を終了
	let timerWrap = elem.closest('.timer_in_box');
	if (nowDate >= startDate_page_timer && nowDate <= endDate_page_timer) {
		if (timerWrap) {
			timerWrap.classList.remove('is-countdown-hidden');
			timerWrap.style.removeProperty('display');
		}
		period = Math.max(0, period);
		let hour = Math.floor(period / (1000 * 60 * 60));
		period -= (hour * (1000 * 60 * 60));
		let minutes = Math.floor(period / (1000 * 60));
		period -= (minutes * (1000 * 60));
		let second = Math.floor(period / 1000);
		period -= (second * 1000);
		let centisecond = Math.floor(period / 10);
		let insert = '';
		insert += '<div class="timerTopParts"><small>あと</small><span class="timerTopNum">' + addZero(hour) + '</span><em>時間</em>';
		insert += '<span class="timerTopNum">' + addZero(minutes) + '</span><em>分</em>';
		insert += '<span class="timerTopNum">' + addZero(second) + '</span><em>秒</em>';
		insert += '<span class="timerTopNum timerTopCenti">' + addZero(centisecond) + '</span><b>以内に申し込み</b></div>';
		let str = '';
		elem.parentNode.previousElementSibling.style.display = 'block';
		elem.parentNode.previousElementSibling.innerHTML = '今日中に借りるなら';
		elem.parentNode.style.display = 'flex';
		elem.parentNode.nextElementSibling.style.display = 'none';
		elem.parentNode.parentNode.lastElementChild.innerHTML = str;
		elem.innerHTML = str + insert;
		setTimeout(countdownTimer_page_timer, 10);
	} else {
		if (timerWrap) {
			timerWrap.classList.add('is-countdown-hidden');
			timerWrap.style.setProperty('display', 'none', 'important');
		}
		elem.parentNode.previousElementSibling.style.display = 'none';
		elem.parentNode.style.display = 'none';
		elem.parentNode.parentNode.lastElementChild.style.display = 'flex';
		setTimeout(countdownTimer_page_timer, 1000);
	}
}
countdownTimer_page_timer();

function countdownTimer(elem) {
	let timerWrap = elem.closest('.timer_in_box');
	let endDate = new Date();
	endDate.setHours(20, 59, 59);

	function updateTimer() {
		let nowDate = new Date();
		endDate.setDate(nowDate.getDate());
		let period = endDate - nowDate;
		let addZero = (n) => ('0' + n).slice(-2);

		if (period >= 0) {
			if (timerWrap) {
				timerWrap.classList.remove('is-countdown-hidden');
				timerWrap.style.removeProperty('display');
			}
			let hour = Math.floor(period / (1000 * 60 * 60));
			period -= (hour * (1000 * 60 * 60));
			let minutes = Math.floor(period / (1000 * 60));
			period -= (minutes * (1000 * 60));
			let second = Math.floor(period / 1000);
			period -= (second * 1000);
			let centisecond = Math.floor(period / 10);

			let insert = `残り<span>${addZero(hour)}</span>時間
                          <span>${addZero(minutes)}</span>分
                          <span>${addZero(second)}</span>秒<span class="cs">${addZero(centisecond)}</span>`;

			let str = '<span>本日中</span>に借入をする場合';
			elem.parentNode.previousElementSibling.style.display = 'block';
			elem.parentNode.style.display = 'block';
			elem.parentNode.parentNode.lastElementChild.style.display = 'none';
			elem.parentNode.previousElementSibling.innerHTML = str;
			elem.innerHTML = insert;

			setTimeout(updateTimer, 10);
		} else {
			if (timerWrap) {
				timerWrap.classList.add('is-countdown-hidden');
				timerWrap.style.setProperty('display', 'none', 'important');
			}
			elem.innerHTML = '';
			setTimeout(updateTimer, 60000);
		}
	}
	updateTimer();
}

document.querySelectorAll('.timer').forEach(countdownTimer);

function initV3SamedayDeadlineTimers() {
	document.querySelectorAll('[data-v3-sameday-deadline]').forEach(function(box) {
		if (box.dataset.v3DeadlineReady === '1') return;
		box.dataset.v3DeadlineReady = '1';
		let timer = box.querySelector('.v3-result-deadline-timer');
		if (!timer) return;
		let hourSetting = Number(box.dataset.deadlineHour || 20);
		let minuteSetting = Number(box.dataset.deadlineMinute || 59);
		let secondSetting = Number(box.dataset.deadlineSecond || 59);
		let addZero = function(n) { return ('0' + n).slice(-2); };

		function update() {
			let nowDate = new Date();
			let endDate = new Date();
			endDate.setHours(hourSetting, minuteSetting, secondSetting, 999);
			let period = endDate - nowDate;
			if (period >= 0) {
				box.hidden = false;
				box.style.removeProperty('display');
				box.classList.remove('is-ended');
				let hour = Math.floor(period / (1000 * 60 * 60));
				period -= (hour * (1000 * 60 * 60));
				let minutes = Math.floor(period / (1000 * 60));
				period -= (minutes * (1000 * 60));
				let second = Math.floor(period / 1000);
				period -= (second * 1000);
				let centisecond = Math.floor(period / 10);
				timer.innerHTML = '残り <span class="h">' + addZero(hour) + '</span><em>時間</em>' +
					'<span class="m">' + addZero(minutes) + '</span><em>分</em>' +
					'<span class="s">' + addZero(second) + '</span><em>秒</em>' +
					'<span class="cs">' + addZero(centisecond) + '</span>';
				setTimeout(update, 10);
			} else {
				box.hidden = true;
				box.classList.add('is-ended');
				box.style.setProperty('display', 'none', 'important');
				timer.innerHTML = '';
				setTimeout(update, 60000);
			}
		}

		update();
	});
}

initV3SamedayDeadlineTimers();

function countdownTimer_flow() {
	let endDate = new Date();
	endDate.setHours(20, 59, 59);
	let nowDate = new Date();
	endDate.setDate(nowDate.getDate());
	let period = Math.max(0, endDate - nowDate);
	let addZero = function (n) { return ('0' + n).slice(-2); }
	let hour = Math.floor(period / (1000 * 60 * 60));
	period -= (hour * (1000 * 60 * 60));
	let minutes = Math.floor(period / (1000 * 60));
	period -= (minutes * (1000 * 60));
	let second = Math.floor(period / 1000);
	period -= (second * 1000);
	let centisecond = Math.floor(period / 10);
	let text = addZero(hour) + '時間' + addZero(minutes) + '分' + addZero(second) + '秒' + addZero(centisecond);
	document.querySelectorAll('.js-flow-countdown').forEach(function(elem) {
		elem.innerHTML = text;
	});
	setTimeout(countdownTimer_flow, 100);
}
countdownTimer_flow();
