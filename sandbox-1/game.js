'use strict';

const player = {
	'maxHealth': 10,
	'health': 10,
	'luck': 5
}

const screens = {
	's-1': {
		'enter': function (nextScreen, lastScreen) { console.log('entering room 1'); },
		'leave': function (lastScreen, nextScreen) { }
	},
	's-2': {
		'enter': function (nextScreen, lastScreen) {
			player.luck += 2;
			document.querySelector('#s-'+nextScreen+' .generated-message').textContent = 'Your Luck has increased by 2. It is now '+player.luck+'.';
		},
		'leave': function (lastScreen, nextScreen) { }
	},
	's-4': {
		'enter': function (nextScreen, lastScreen) {
			if(player.luck > 10) {
				
				const next = '#s-'+nextScreen+' .h-1';
				console.log('you are lucky', next);
				document.querySelector(next).classList.remove('hidden');
			} else {
				player.health -= 2;
			}
		},
		'leave': function (lastScreen, nextScreen) { }
	},
	's-8': {
		'enter': function (nextScreen, lastScreen) {
			player.health = player.maxHealth;
			document.querySelector('#s-'+nextScreen+' .generated-message').textContent = 'You have entered a secret room.';
		},
		'leave': function (lastScreen, nextScreen) {
			player.luck = 3;
		}
	}
}

const handleOption = function (event) {
	if(event.preventDefault) { event.preventDefault(); }

	// get target room id (next story)
	const screen = event.target.getAttribute('data-screen');
	// gotoRoom(screen);

	// hide previously active story
	const lastScreen = document.querySelector('#story > li.active');
	const lastScreenId = lastScreen.getAttribute('id').replace('s-', '');

	// execute last story actions
	if(screens['s-'+lastScreenId] && screens['s-'+lastScreenId].leave) {
		console.log('leaving room ', lastScreenId);
		screens['s-'+lastScreenId].leave(lastScreenId, screen);
	}

	// make last story inactive
	lastScreen.classList.remove('active');

	// show new story
	const nextScreen = document.querySelector('#story li#s-' + screen);
	nextScreen.classList.add('active');

	// execute new story actions
	if(screens['s-'+screen] && screens['s-'+screen].enter) {
		console.log('entering room ', screen);
		screens['s-'+screen].enter(screen, lastScreenId);
	}
}

// make buttons interactive
let storyOptions = document.querySelectorAll('#story [data-screen]');

for (const option of storyOptions) {
	option.addEventListener('click', handleOption);
}

// execute first room enter actions
screens['s-1'].enter(null, null);
