//CANVAS
function Canvas(id){
    this.canvas = document.getElementById(id);
    if(!this.canvas){
		alert('cannot find "'+id+'"');
	}
    
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.fill_color = "#FFF";
    this.stroke_color = "#000";
}
Canvas.prototype={
	
	isInside: function(pos) {
		return true;
		//return (pos.x >= 0 && pos.x<=this.width && pos.y>=0 && pos.y<=this.height);
	},

	clear: function(){
		this.ctx.clearRect(0, 0, this.width, this.height);
	},
	clearRect: function(x,y,width,height){
		this.ctx.clearRect(x, y,  width, height);
	},
	circle: function(p,r){
		x = p.x*this.width;
		y = p.y*this.height;
		//this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.stroke_color;
		this.ctx.moveTo(x+r,y);
		this.ctx.arc(x,y,r,0,TWO_PI,false);
		this.ctx.fill();
		//this.ctx.restore();
	},
	line: function(x1,y1,x2,y2,color,border){
		
		this.ctx.beginPath();
		this.ctx.lineWidth=border;
		this.ctx.strokeStyle = color;
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	}
	,
	link:function(oFrom,oTo,color,border){
		
		var x1=oFrom.x+(oFrom.width/2);
		var y1=oFrom.y+(oFrom.height/2);
		
		var x2=oTo.x+(oTo.width/2);
		var y2=oTo.y+(oTo.height/2);
		
		//calcul centre
		var xCenter=x1+((x2-x1)/2);
		
		this.ctx.beginPath();
		this.ctx.lineWidth=border;
		this.ctx.strokeStyle = color;
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(xCenter,y1);
		this.ctx.lineTo(xCenter,y2);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	linkPoint:function(oFrom,oTo,sPoints,color,border){
		
		var x1=oFrom.x+(oFrom.width/2);
		var y1=oFrom.y+(oFrom.height/2);
		
		var x2=oTo.x+(oTo.width/2);
		var y2=oTo.y+(oTo.height/2);
		
		this.ctx.beginPath();
		this.ctx.lineWidth=border;
		this.ctx.strokeStyle = color;
		this.ctx.moveTo(x1,y1);
		
		if(sPoints!=''){
			
			var tPoints=sPoints.split(';');
			for(var i=0;i<tPoints.length;i++){
				var tPoint=tPoints[i].split(':');
				var xPoint=tPoint[0];
				var yPoint=tPoint[1];
				
				this.ctx.lineTo(xPoint,yPoint);
			}
			
		}
		
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	linkPointWithSelected:function(oFrom,oTo,sPoints,iSelectedPointId,color,border){
		
		var x1=oFrom.x+(oFrom.width/2);
		var y1=oFrom.y+(oFrom.height/2);
		
		var x2=oTo.x+(oTo.width/2);
		var y2=oTo.y+(oTo.height/2);
		
		this.ctx.beginPath();
		this.ctx.lineWidth=border;
		this.ctx.strokeStyle = color;
		this.ctx.moveTo(x1,y1);
		
		if(sPoints!=''){
			
			var tPoints=sPoints.split(';');
			for(var i=0;i<tPoints.length;i++){
				var tPoint=tPoints[i].split(':');
				var xPoint=tPoint[0];
				var yPoint=tPoint[1];
				
				this.ctx.lineTo(xPoint,yPoint);
				
				if(i==iSelectedPointId){
					this.ctx.fillRect(xPoint-5,yPoint-5,10,10,'#880000');
					
				}
			}
			
		}
		
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	arrow: function(x1,y1,x2,y2,strokeStyle,lineWidth){
		
		this.ctx.beginPath();
		this.ctx.lineWidth=lineWidth;
		this.ctx.strokeStyle = strokeStyle;
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		
		this.ctx.stroke();
		
		this.fillRect(x2-3,y2-3,6,6,strokeStyle);
	}
	,
	drawRect : function(x,y,ilargeur,ihauteur,lineWidth,strokeStyle,fillStyle){

		this.ctx.beginPath();

		this.ctx.lineWidth=lineWidth;
		this.ctx.strokeStyle=strokeStyle;
		this.ctx.fillStyle=fillStyle;
		
		this.ctx.fillRect(x,y,ilargeur,ihauteur);
		this.ctx.strokeRect(x,y,ilargeur,ihauteur);
		
		this.ctx.closePath();

	},
	fillRect : function(x,y,ilargeur,ihauteur,fond){

		this.ctx.beginPath();

		this.ctx.lineWidth=0;
		 
		this.ctx.fillStyle=fond;
		this.ctx.fillRect(x,y,ilargeur,ihauteur);
		this.ctx.closePath();

	},
	drawRectStroke : function(x,y,ilargeur,ihauteur,contour,width){

		this.ctx.beginPath();

		this.ctx.lineWidth=width;
		this.ctx.strokeStyle=contour;
		 
		this.ctx.strokeRect(x,y,ilargeur,ihauteur);
		this.ctx.closePath();

	}
	,
	drawBdd:function(x,y,ilargeur,ihauteur,lineWidth,strokeStyle,fillStyle){
		
		this.ctx.lineWidth=lineWidth;
		this.ctx.strokeStyle=strokeStyle;
		this.ctx.fillStyle=fillStyle;
		
		var hauteurEllipse=30;
		 
		//this.line(x,y,x,y+ihauteur);
		//this.line(x+ilargeur,y,x+ilargeur,y+ihauteur);
				
		var centerX=x+(ilargeur/2);
		var centerY=y;
		
		var width=ilargeur;
		var height=5;
		
		x=parseFloat(x);
		y=parseFloat(y);
		ilargeur=parseFloat(ilargeur);
		ihauteur=parseFloat(ihauteur);
				
		//fond
		this.ctx.beginPath();
		
			this.ctx.moveTo(x,y);
			this.ctx.bezierCurveTo(
							x,y-hauteurEllipse,
							x+ilargeur,y-hauteurEllipse,
							x+ilargeur,y
			);
									
			this.ctx.moveTo(x+ilargeur,y);
			this.ctx.lineTo(x+ilargeur,y+ihauteur);
			
			this.ctx.moveTo(x,y);
			this.ctx.lineTo(x,y+ihauteur);
			
			this.ctx.moveTo(x+ilargeur,y);
			this.ctx.lineTo(x+ilargeur,y+ihauteur);
			
			this.ctx.moveTo(x+ilargeur,y+ihauteur	);
			this.ctx.bezierCurveTo(
							x+ilargeur,y+ihauteur+hauteurEllipse,
							x,y+hauteurEllipse+ihauteur,
							x,y+ihauteur
			);					
								
			this.ctx.moveTo(x,y+ihauteur);
									
			this.ctx.lineTo(x,y+ihauteur);
			this.ctx.moveTo(x,y);
		
			this.ctx.fillRect(x,y,ilargeur,ihauteur);
			
			this.ctx.fill();
		
		this.ctx.closePath();
		
		//trait
		
		this.ctx.beginPath();
			this.ctx.moveTo(x,y);
			this.ctx.bezierCurveTo(
									x,y+hauteurEllipse,
									x+ilargeur,y+hauteurEllipse,
									x+ilargeur,y
									);
			this.ctx.moveTo(x,y);
			this.ctx.bezierCurveTo(
									x,y-hauteurEllipse,
									x+ilargeur,y-hauteurEllipse,
									x+ilargeur,y
									);
			
			this.ctx.moveTo(x,y+ihauteur);
			this.ctx.bezierCurveTo(
									x,y+hauteurEllipse+ihauteur,
									x+ilargeur,y+hauteurEllipse+ihauteur,
									x+ilargeur,y+ihauteur
									);
									
			this.ctx.moveTo(x,y);
			this.ctx.lineTo(x,y+ihauteur);
			
			this.ctx.moveTo(x+ilargeur,y);
			this.ctx.lineTo(x+ilargeur,y+ihauteur);
			
			this.ctx.stroke();
		
		this.ctx.closePath();
 		
 		
		  
 	}
	
	,
	fillText:function(x,y,texte,couleur,size){
		
		this.ctx.font=size+"px Arial";
		this.ctx.textBaseline = 'top';
		this.ctx.fillStyle=couleur;
		this.ctx.fillText(texte,x,y);
	}
	,
	drawLosange: function (x,y,ilargeur,ihauteur,couleur,fond){

		// fond='#222222';

		this.ctx.lineWidth=1;
		if(couleur!='#000000'){
			this.ctx.lineWidth=2;

		}

		this.ctx.beginPath();
		this.ctx.moveTo(x,y+(ihauteur/2) );

		//_context.closePath();
		this.ctx.lineTo(x+(ilargeur/2),y);
		this.ctx.lineTo(x+(ilargeur/1),y+(ihauteur/2));
		this.ctx.lineTo(x+(ilargeur/2),y+(ihauteur/1));
		this.ctx.lineTo(x,y+(ihauteur/2));


		this.ctx.strokeStyle = couleur;
		this.ctx.stroke();

		this.ctx.fillStyle=fond;
		this.ctx.fill();

		this.ctx.closePath();


	}
	,
	drawImage: function (img,x,y,width,height){
		this.ctx.drawImage(img,x,y ,width,height  );
	}
	,
	drawImage2: function (img,x,y,width,height,x2,y2,width2,height2){
		this.ctx.drawImage(img,x,y ,width,height,x2,y2,width2,height2  );
	}
	,
	isInThisLosange: function(x,y){

	},
	
};
function Point(){
	this.x=0;
	this.y=0;
}
Point.prototype={
	
};
