
var imageContainer = document.querySelector("#image");
var choiceContainer = document.querySelector("#choices");

var rooms = {
	"room-1": {
		"image": "Photo 30.11.18, 15 18 34.jpg",
		"headline": "Gang vor Computerpool",
		"text": "Ein kalter Wind umspielt deine Beine.",
		"choices": [
			{
				"title": "Umdrehen",
				"action": function() {
					gotoRoom(rooms["room-2"]);
				}
			},
			{
				"title": "Weitergehen",
				"action": function() {
					gotoRoom(rooms["room-4"]);
				}
			}
		]
	},
	"room-2": {
		"image": "Photo 30.11.18, 15 18 15.jpg",
		"headline": "Gang links vom Computerpool",
		"choices": [
			{
				"title": "Umdrehen",
				"action": function() {
					gotoRoom(rooms["room-1"]);
				},
			},
			{
				"title": "Treppe runter",
				"action": function() {
					gotoRoom(rooms["room-3"]);
				}
			}
		]
	},
	"room-3": {
		"image": "Photo 30.11.18, 15 18 27.jpg",
		"headline": "Treppe nach unten",
		"init": function() {
			alert("A wild Dr. Berger appears!");
		},
		"choices": [
			{
				"title": "Umdrehen",
				"action": function() {
					gotoRoom(rooms["room-2"]);
				},
			}
		]
	},
	"room-4": {
		"image": "Photo 30.11.18, 15 18 49.jpg",
		"headline": "Gang rechts vom Computerpool",
		"choices": [
			{
				"title": "Zurück",
				"action": function() {
					gotoRoom(rooms["room-1"]);
				},
			},
			{
				"title": "In den Fahrstuhl",
				"action": function() {
					gotoRoom(rooms["room-6"]);
				}
			},
			{
				"title": "Treppe runter",
				"action": function() {
					gotoRoom(rooms["room-5"]);
				}
			}
		]
	},
	"room-5": {
		"image": "Photo 30.11.18, 15 19 04.jpg",
		"headline": "Kleiner Computerpool",
		"text": "Es gibt kein Zurück. Ah nein, es gibt NUR zurück!",
		"choices": [
			{
				"title": "Zurück",
				"action": function() {
					gotoRoom(rooms["room-4"]);
				},
			}
		]
	},
	"room-6": {
		"image": "Photo 30.11.18, 15 19 13.jpg",
		"headline": "Im Fahrstuhl",
		"text": "Es geht abwärts. Aber wie weit?",
		"choices": [
			{
				"title": "Zurück",
				"action": function() {
					gotoRoom(rooms["room-4"]);
				},
			}
		]
	}
}

var gotoRoom = function(room) {
	imageContainer.innerHTML = "";
	choiceContainer.innerHTML = "";

	/* generate first image */
	var image = document.createElement("img");
	image.src = "images/" + room.image;
	image.alt = room.headline;
	imageContainer.appendChild(image);

	if (room.headline !== undefined) {
		var headline = document.createElement("h2");
		headline.innerHTML = room.headline;
		imageContainer.appendChild(headline);
	}

	if (room.text !== undefined) {
		var text = document.createElement("p");
		text.innerHTML = room.text;
		imageContainer.appendChild(text);
	}

	/* generate choices */
	var choices = generateChoices(room);
	for (var i = 0; i < choices.length; i++) {
		choiceContainer.appendChild(choices[i]);
	};

	/* do initial actions */
	if (room.init !== undefined) {
		room.init();
	}
}

var generateChoices = function(room) {
	var choices = [];
	for (var i = 0; i < room.choices.length; i++) {
		var choiceButton = document.createElement('p');
		choiceButton.innerHTML = room.choices[i].title;
		choiceButton.addEventListener('click', room.choices[i].action);

		choices.push(choiceButton);
	};

	return choices;
}

gotoRoom(rooms["room-1"]);


