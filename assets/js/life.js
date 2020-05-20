
var cell = {
	w: 32,
	h: 32
};

var field = {
	example: null,
	ctx: null,
	sum: 0,
	x: 0,
	y: 0,
	wi: 8,
	hi: 8,
	padding: 8,
	fst: [[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0] ],
	scn: [[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0] ],
	init: function(elementid) {
		this.example = document.getElementById(elementid) || false;
		this.ctx = example.getContext('2d');
		this.ctx.clearRect(0,0, 312, 312);
		for (i = 1; i <= this.wi; i++) {
			for (n = 1; n <= this.hi; n++) {
				this.fst[i][n] = Math.floor(Math.random()*(2));
			}
		}
	},
	clear: function() {
		for (i = 0; i <= this.wi+2; i++) {
			for (n = 0; n < this.hi+2; n++) {
				this.fst[i][n] = 0;
				this.scn[i][n] = 0;
			}
		}
	},
	calc: function() {
		for (i = 1; i <= this.wi; i++) {
			for (n = 1; n <= this.hi; n++) {
				this.sum = this.fst[i-1][n-1] + this.fst[i][n-1] + this.fst[i+1][n-1] + 
					this.fst[i-1][n] + this.fst[i+1][n] + this.fst[i-1][n+1] + this.fst[i][n+1] + 
					this.fst[i+1][n+1];
				if (this.fst[i][n] == 0) {
					this.scn[i][n] = (this.sum == 3) ? 1 : this.scn[i][n];
				} else if (this.fst[i][n] == 1) {
					this.scn[i][n] = ((this.sum == 3) || (this.sum == 2)) ? this.fst[i][n] : 0;
				}
			}
		}
		for (i = 0; i <= this.wi+1; i++) {
			for (n = 0; n <= this.hi+1; n++) {
				this.fst[i][n] = this.scn[i][n];
				this.scn[i][n] = 0;
			}
		}
	},
	draw: function() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(this.x, this.y, example.width, example.height);
		for (i = 1; i < this.wi+2; i++) {
			for (n = 1; n < this.hi+2; n++) {
				this.ctx.fillStyle = (this.fst[i][n] == 1) ? "#279EE3" : "#222222";
				this.ctx.strokeStyle = (this.fst[i][n] == 1) ? "#2222dd" : "#666666";
				this.ctx.fillRect(this.padding + this.x + n*cell.w, 
							 this.padding + this.y + i*cell.h, 
							 cell.w-1, cell.h-1);
			}
		}
	}
};

function main() {
	field.init('example');
	return setInterval(loop, 666);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}



function loop()
{
	field.draw();
	field.calc();
}
main();