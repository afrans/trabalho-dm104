var Index = {

	init: function() {
		Index.getCharacters();
	},
	
	getCharacters: function() {
		$.ajax({
			url: "http://gateway.marvel.com/v1/public/characters?limit=10&apikey=95d321e83b29af0d57da6cb5e8307e9a",
			success: function (data) {
				Index.checkResponseCode(data);
			},
			erro: function () {
				alert('erro');
			}
		});
	},
	
	checkResponseCode: function(responseData) {
		if (responseData.code !== 200) {
			Index.addErrorMessage(responseData.message);
			
		} else {
			Index.addResponseToPage(responseData);
		}
	},
	
	addErrorMessage: function(message) {
		$('#error_message').innerHTML(message);
	},
	
	addResponseToPage: function(responseData) {
		for (var i = 0; i < responseData.data.results.length; i++) {
			
			var character = responseData.data.results[i];
			Index.addCharacterDiv(character);
		}
	},
	
	addCharacterDiv: function(character) {
		var div = document.createElement('div'),
			figure = document.createElement('figure');
		
		figure.appendChild(Index.createImage(character));
		figure.appendChild(Index.createFigCaption(character));
		
		div.appendChild(figure);
		div.appendChild(Index.createDescriptionParagraph(character));
		
		$('#characters').append(div);
	},
	
	createImage: function(character) {
		var srcPortraitSmall = character.thumbnail.path + '/portrait_fantastic.' + character.thumbnail.extension;
		
		var image = document.createElement('img');
		image.src = srcPortraitSmall;
		image.alt = character.name;
		
		return image;
	},
	
	createFigCaption: function(character) {
		var figCaption = document.createElement('figcaption');
		figCaption.innerHTML = character.name;
		
		return figCaption;
	},
	
	createDescriptionParagraph: function(character) {
		var paragraph = document.createElement('p');
		paragraph.innerHTML = character.description;
		
		return paragraph;
	}
	
};

Index.init();
