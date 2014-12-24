var startTyping = function()
{
	var showImage = function(image, delayIn, delayOut)
	{
		$(".bg-animation").css("background-image", "url('" + image + "')");
		$(".bg-animation").fadeIn(delayIn, function()
			{
				$(".bg-animation").fadeOut(delayOut);
			});
	};

	$(".bg-animation").hide();

	$('.textarea').focus()
	.typetype("Bob Boeren").delay(1000).backspace(10)
	.typetype("Bob Roeren").delay(1000).backspace(10)
	.typetype("Rob Broeren").delay(1000)
	.typetype(",", { callback: function() { showImage("bigsmile.png", 2500, 1500) } })
	.delay(3500)
	.typetype("\n\nWat kun jij toch", { callback: function() { showImage("blabla.png", 1500, 1500) } })
	.typetype(" ouwehoeren")
 	.delay(2500)
 	.backspace(10)
 	.typetype("de oren van je kop lu", { callback: function() { showImage("vangogh.jpg", 3000, 3000) } })
	.typetype("llen.")
	.delay(6000)
 	.backspace(39)
 	.typetype("ben je toch gezellig.\n")
	.typetype("Je kunt alleen nonie").delay(400)
	.backspace(5)
	.typetype("nongie").delay(400)
	.backspace(6)
	.typetype("nog niet zo gat").delay(400).backspace(3)
	.typetype("god").delay(400).backspace(3)
	.typetype("goed lezen.").delay(400)
	.typetype("\nDat heb je zojuist bewezen.\n\n")
	.typetype("Laten we het eens hebben over jouw kado voor mij.").delay(400).backspace(10)
	.typetype(".\n")
	.typetype("Ik heb er heel lang over nagedacht.\n")
	.typetype("Het komt waarschijnlijk onverwacht.\n")
	.typetype("Natuurlijk krijg jij het boek van Bill.", { callback: function() { showImage("bill.jpg", 3500, 1500) } }).delay(4000)
	.typetype("\nOf is dat niet wat je wil?")
	.typetype("\n\nMisschien liever het boek van G.K. Joling.", { callback: function() { showImage("gerardjoling.jpg", 3500, 1500) } }).delay(4000)
	.typetype("\nGeintje, ik bedoel natuurlijk J.K. Rowling.", { callback: function() { showImage("cuckoo.jpg", 3500, 1500) } }).delay(4000)
	.typetype("\n\n")
	.typetype("Ook heb ik nog wat muziek gekocht bij Bol.com.\n")
	.typetype("Dat vind jij wellicht een beetje dom.\n")
	.typetype("Deze plaat kost namelijk bij de V&D een euro of 10.\n")
	.typetype("Bij Bol had je hem voor meer gezien.\n")
	.typetype("Je raadt het al het is Punk Floyd", { callback: function() { showImage("punk_floyd.jpg", 1000, 1000) } }).delay(1000).backspace(9)
	.typetype("ink Floyd.\n", { callback: function() { showImage("pink_floyd.jpg", 3000, 2000) } }).delay(5000)
	.typetype("\n")
	.typetype("Je zult nu denken meer komt er niet.\n")
	.typetype("Helaas tot mijn grote verdriet.\n")
	.typetype("Heb ik nog een plaat gekocht.\n")
	.typetype("Ik heb er stad en land voor afgezo").delay(2000).backspace(24)
	.typetype("geen moeite voor gedaan.\n")
	.typetype("Op jouw verlanglijstje zag ik hem staan.", { callback: function() { showImage("lijstje.png", 10000, 4000) } }).delay(10000)
	.typetype("\nJe kunt zelf wel raden welke het geworden is.\n")
	.typetype("\n")
	.typetype("Dit was het dan voor deze keer.\n")
	.typetype("Volgend jaar komt er vast meer.\n")
	.typetype("Groeten van.... de kerstman...", { callback: function() { showImage("kerstman.jpg", 10000, 4000) } })
	.typetype("P.S wat heb je toch een geweldige schoonzoo")
	.backspace(9)
	.typetype("dochter.");
}

var startSnow = function()
{
		//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 25; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 33);
}
