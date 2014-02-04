var oApplication;


function Application(){
	this.idLayer=1;
	this.idObject=1;
	this.tLayer=Array();
	this.idLayerSelected=-1;
	this.tData=Array();
	this.oCanvasTmp;
	this.processing=0;
	this.tmpX='';
	this.tmpY='';
	
	this.tObject=Array();
	
	this.tMenuLayer=Array();
	this.tMenuLayerObject=Array();
}
Application.prototype={
	
	load:function(){
		this.oCanvasTmp=new Canvas('canvas_tmp');
	},
	buildLayer:function(idLayer){
		oApplication.tLayer[idLayer].clear();
		
		var iLength=this.tMenuLayerObject[idLayer].length-1;
		
		for(var i=iLength;i>=0;i--){
			var tmpObj=this.getObject(this.tMenuLayerObject[idLayer][i]);
			if(tmpObj && tmpObj.visible==1){
				tmpObj.build();
			}
		}
		/*
		for(var i=0;i< this.tObject.length;i++){
			if(this.tObject[i] && this.tObject[i].idLayer==idLayer && this.tObject[i].visible==1 ){
				this.tObject[i].build();
			}
		}*/
	},
	showHideLayer:function(idLayer){
		var a=getById('checkbox_'+idLayer);
		if(a){
			var b=getById('canvas_'+idLayer);
			
			if(a.checked){
				b.style.visibility='visible';
			}else{
				b.style.visibility='hidden';
			}
		}
	},
	showHideObject:function(idObject){
		var a=getById('checkbox_object_'+idObject);
		if(a){
			var oObject=this.getObject(idObject);
			
			if(a.checked){
				oObject.visible=1;
			}else{
				oObject.visible=0;
			}
			
			this.buildLayer(oObject.idLayer);
		}
		
	},
	deselectLayer:function(){
		var a=getById('layer_'+this.idLayerSelected);
		if(a){
			a.className='layer';
		}
		this.idLayerSelected=-1;
	},
	selectLayer:function(idLayer){
		this.deselectLayer();
		this.deselectObject();
		this.clearForm();
		
		this.idLayerSelected=idLayer;
		var a=getById('layer_'+idLayer);
		if(a){
			a.className='layerSelected';
		}
	},
	deselectObject:function(){
		var a=getById('layerObject_'+this.idObjectSelected);
		if(a){
			a.className='layerObject';
		}
		this.idObjectSelected=-1;
	},
	selectObject:function(idObject){
		this.deselectLayer();
		this.deselectObject();
		this.clearForm();
		
		this.idObjectSelected=idObject;
		var a=getById('layerObject_'+idObject);
		if(a){
			a.className='layerObjectSelected';
		}
		
		this.loadForm(idObject);
	},
	updateTexte:function(a){
		var sText=prompt('Choisir libelle',a.innerHTML);
		a.innerHTML='&nbsp;'+sText+'&nbsp;';
	},
	addLayer:function(){
		this.addMenuLayer(this.idLayer);
		
		var sCanvas='<canvas class="canvas" id="canvas_'+this.idLayer+'" style="visibility:visible" width="900px" height="800px"></canvas>';
		
		this.addContent('tCanvas',sCanvas);
		
		
		this.tLayer[this.idLayer]=new Canvas('canvas_'+this.idLayer);
		
		this.tLayer[this.idLayer].fillText(0,0,'Nouveau calque '+this.idLayer,'#000');
		
		this.selectLayer(this.idLayer);
		
		this.idLayer++;
	},
	addMenuLayer:function(idLayer){
		console.log('layer '+idLayer);
		
		var sLayer='<p class="layer" id="layer_'+idLayer+'" >';
		sLayer+='<input onclick="oApplication.showHideLayer('+idLayer+')" id="checkbox_'+idLayer+'" type="checkbox" checked="checked"/>';
		
		sLayer+='<a href="#" style="padding-right:37px" onclick="oApplication.selectLayer('+idLayer+');return false;" >Calque '+idLayer+'</a>';
		sLayer+=' : ';
		sLayer+='<a href="#" onclick="oApplication.updateTexte(this);return false">commentaire</a>';
		
		sLayer+='</p>';
		
		sLayer+='<div id="objectLayer_'+idLayer+'"></div>';
		
		this.addContent('menudrawContent',sLayer);
		
		
	},
	clearMenuObject:function(idLayer){
		var a=getById('objectLayer_'+idLayer);
		if(a){
			a.innerHTML='';
		}
	},
	addLayerObject:function(idLayer){
		//this.addMenuLayerObject(idLayer,oObject);
		this.clearMenuObject(idLayer);
		this.builListMenuLayerObject(idLayer);
	},
	addMenuLayerObject:function(idLayer,oObject,i,iLength){
		
		var sName='layerObject';
		if(this.idObjectSelected==oObject.id){
			sName='layerObjectSelected';
		}
		
		var sHtml='<p class="'+sName+'" id="layerObject_'+oObject.id+'">';
		sHtml+='<input onclick="oApplication.showHideObject('+oObject.id+')" id="checkbox_object_'+oObject.id+'" type="checkbox" checked="checked"/>';
		
		sHtml+='<a href="#" onclick="oApplication.selectObject('+oObject.id+');return false;">&nbsp;'+oObject.type+' #'+oObject.id+'&nbsp;';
		
		sHtml+='&nbsp;';
		sHtml+=oObject.comment+'</a>';
		
		if(i!=0){
			sHtml+=' <a href="#"  style="float:right" onclick="oApplication.moveLayerObjectUp('+oObject.id+');return false;"><img src="css/images/up.png"/></a>';
		}else{
			sHtml+=' <a href="#" style="float:right" onclick="oApplication.moveLayerObjectUp('+oObject.id+');return false;"><img src="css/images/upOff.png"/></a>';
		}
		if(i!=iLength-1){
			sHtml+=' <a href="#" style="float:right" onclick="oApplication.moveLayerObjectDown('+oObject.id+');return false;"><img src="css/images/down.png"/></a>';
		}else{
			sHtml+=' <a href="#" style="float:right" onclick="oApplication.moveLayerObjectDown('+oObject.id+');return false;"><img src="css/images/downOff.png"/></a>';
		}
		sHtml+='</p>';
		
		this.addContent('objectLayer_'+idLayer,sHtml);
		
	},
	moveLayerObjectUp:function(idObject){
		this.selectObject(idObject);
		
		var oObject=this.getObject(idObject);
		
		this.clearMenuObject(oObject.idLayer);
		
		for(var i=0;i<this.tMenuLayerObject[oObject.idLayer].length;i++){
			if(!this.tMenuLayerObject[oObject.idLayer][i]){ continue;}
			
			var tmpObject=this.getObject(this.tMenuLayerObject[oObject.idLayer][i]);
			
			if(idObject== tmpObject.id){
				var twistId=this.tMenuLayerObject[oObject.idLayer][i-1];
				
				this.tMenuLayerObject[oObject.idLayer][i-1]=this.tMenuLayerObject[oObject.idLayer][i];
				this.tMenuLayerObject[oObject.idLayer][i]=twistId;
				
			}
		}
		
		this.builListMenuLayerObject(oObject.idLayer);
		
		
		
	},
	moveLayerObjectDown:function(idObject){
		this.selectObject(idObject);
		
		var oObject=this.getObject(idObject);
		
		this.clearMenuObject(oObject.idLayer);
		var process=0;
		for(var i=0;i<this.tMenuLayerObject[oObject.idLayer].length;i++){
			if(!this.tMenuLayerObject[oObject.idLayer][i]){ continue;}
			
			var tmpObject=this.getObject(this.tMenuLayerObject[oObject.idLayer][i]);
			
			if(idObject== tmpObject.id && process==0){
				var twistId=this.tMenuLayerObject[oObject.idLayer][i+1];
				
				this.tMenuLayerObject[oObject.idLayer][i+1]=this.tMenuLayerObject[oObject.idLayer][i];
				this.tMenuLayerObject[oObject.idLayer][i]=twistId;
				
				process=1;
			}
		}
		
		this.builListMenuLayerObject(oObject.idLayer);
		
		
		
	},
	builListMenuLayerObject:function(idLayer){
		
		var iLength=this.tMenuLayerObject[idLayer].length;
		
		for(var i=0;i<iLength;i++){
			if(!this.tMenuLayerObject[idLayer][i]){ continue;}
			var tmpObject=this.getObject(this.tMenuLayerObject[idLayer][i]);
			
			this.addMenuLayerObject(tmpObject.idLayer,tmpObject,i,iLength);
		}
		
		this.buildLayer(idLayer);

	},
	addContent:function(id,sText){
		var oTmp=document.createElement('div');
		oTmp.innerHTML=sText;
		
		var a=getById(id);
		if(a){
			a.appendChild(oTmp);
		}
	},
	setContent:function(id,sText){
		
		var a=getById(id);
		if(a){
			a.innerHTML=sText;
		}
	},
	click:function(e){
		var x=this.getXmouse(e);
		var y=this.getYmouse(e);
			
		this.draw(x,y);
		
		
	},
	mousemove:function(e){
		var x=this.getXmouse(e);
		var y=this.getYmouse(e);
		
		var iWidth=(x-this.tmpX);
		var iHeight=(y-this.tmpY);
		
		
		if(this.processing){
			this.clearCanvasTmp();
			if(this.drawType=='carre'){
				this.oCanvasTmp.drawRectStroke(this.tmpX,this.tmpY,iWidth,iHeight,'green');
			}else if(this.drawType=='ligne'){
				this.oCanvasTmp.line(this.tmpX,this.tmpY,x,y,'green',2);
			}else if(this.drawType=='fleche'){
				this.oCanvasTmp.line(this.tmpX,this.tmpY,x,y,'green',2);
			}else if(this.drawType=='bdd'){
				this.oCanvasTmp.drawBdd(this.tmpX,this.tmpY,iWidth,iHeight,1,'green','#fff');
			}
		}
	},
	clearCanvasTmp:function(){
		this.oCanvasTmp.clear();
	},
	getXmouse:function(e){
		if(e && e.x!=null && e.y!=null){
			return e.x +document.body.scrollLeft;
		}else{
			return e.clientX +document.body.scrollLeft;
		}
	},
	getYmouse:function(e){
		if(e && e.x!=null && e.y!=null){
			return e.y + document.body.scrollTop;
		}else{
			return e.clientY + document.body.scrollTop;
		}
	},
	draw:function(x,y){
		if(this.idObjectSelected > -1){
			this.drawType=this.getObject(this.idObjectSelected).type;
			if(this.drawType=='link'){
				var oLink=this.getObject(this.idObjectSelected);
				oLink.points+=x+':'+y+';';
				oApplication.buildLayer(oLink.idLayer);
				return;
			}else if(this.processing==0){
				
				
				if(this.drawType=='texte'){
					this.getObject(this.idObjectSelected).updateCoord(x,y,0,0);
					
					this.clearCanvasTmp();
				
					this.clearType();
					return;
				}else if(this.drawType=='carre' || this.drawType=='bdd'){
					var oCarre=this.getObject(this.idObjectSelected);
					oCarre.x=x
					oCarre.y=y;
					oApplication.buildLayer(oCarre.idLayer);
					
					oApplication.clearForm();
					oApplication.loadForm(oCarre.id);
					
					this.clearCanvasTmp();
				
					this.clearType();
					return;
				}
				
				this.tmpX=x;
				this.tmpY=y;
				
				this.processing=1;
				
				return;
			}else{
				this.processing=0;
				this.getObject(this.idObjectSelected).updateCoord(this.tmpX,this.tmpY,x,y);
				
				this.clearCanvasTmp();
				
				this.clearType();
			}
			
			return;
		}else if(this.idLayerSelected==-1){
			alert('Selectionnez un calque pour dessiner');
			return;
		}
		
		if(this.drawType=='bdd' & this.processing==0){
			
			this.tmpX=x;
			this.tmpY=y;
			
			this.processing=1;
			
			return;
			
		}else if(this.drawType=='bdd' & this.processing==1){
			this.processing=0;
			
			var iWidth=(x-this.tmpX);
			var iHeight=(y-this.tmpY);
			
			var oData=new Data(this.drawType,this.idLayerSelected);
			oData.x=this.tmpX;
			oData.y=this.tmpY;
			oData.width=iWidth;
			oData.height=iHeight;
			
			oData.lineWidth=1;
			oData.fillStyle='#ffffff';
			oData.strokeStyle='#222222';
			
			oData.build();
			
			this.addLayerObject(this.idLayerSelected,oData);
			
			this.clearCanvasTmp();
		}else if(this.drawType=='carre' & this.processing==0){
			
			this.tmpX=x;
			this.tmpY=y;
			
			this.processing=1;
			
			return;
			
		}else if(this.drawType=='carre' & this.processing==1){
			this.processing=0;
			
			var iWidth=(x-this.tmpX);
			var iHeight=(y-this.tmpY);
			
			var oData=new Data(this.drawType,this.idLayerSelected);
			oData.x=this.tmpX;
			oData.y=this.tmpY;
			oData.width=iWidth;
			oData.height=iHeight;
			
			oData.lineWidth=1;
			oData.fillStyle='#ffffff';
			oData.strokeStyle='#222222';
			
			oData.build();
			
			this.addLayerObject(this.idLayerSelected,oData);
			
			this.clearCanvasTmp();
		
		}else if( (this.drawType=='ligne' || this.drawType=='fleche' ) && this.processing==0){
			
			this.tmpX=x;
			this.tmpY=y;
			
			this.processing=1;
			
			return;
			
		}else if( (this.drawType=='ligne' || this.drawType=='fleche' ) && this.processing==1){
			this.processing=0;
			
			
			var oData=new Data(this.drawType,this.idLayerSelected);
			oData.x=this.tmpX;
			oData.y=this.tmpY;
			oData.x2=x;
			oData.y2=y;
			
			oData.lineWidth=1;
			oData.strokeStyle='#222222';
			
			oData.build();
			
			this.addLayerObject(this.idLayerSelected,oData);
			
			this.clearCanvasTmp();
			
		}else if(this.drawType=='texte'){
			var sText=prompt('Indiquez le texte');
			if(sText==''){
				return;
			}
			
			var oData=new Data(this.drawType,this.idLayerSelected);
			oData.x=x;
			oData.y=y;
			oData.strokeStyle='#222222';
			oData.texte=sText;
			oData.size=12;
			oData.build();
			
			this.addLayerObject(this.idLayerSelected,oData);
			
		}else if(this.drawType=='link'){
			var oData=new Data(this.drawType,this.idLayerSelected);
			oData.build();
			
			this.addLayerObject(this.idLayerSelected,oData);
			
			this.selectObject(oData.id);
		}else{
			this.clearType();
			return;
		}
		
		this.tData.push(oData);
		
		this.clearType();
	},
	getLayerSelected:function(){
		return this.tLayer[this.idLayerSelected];
	},
	chooseType:function(sType){
		if(this.idLayerSelected==-1){
			alert('Selectionnez un calque');
			return;
		}
		
		this.clearType();
		
		this.drawType=sType;
		
		var a=getById('btn_'+this.drawType);
		if(a){
			a.className='btnSelected';
		}
		
		
	},
	clearType:function(){
		var a=getById('btn_'+this.drawType);
		if(a){
			a.className='btn';
		}
		
		this.drawType='';
		
		
	},
	getObject:function(id){
		return oApplication.tObject[id];
	},
	clearForm:function(){
		this.setContent('formEdit','');
	},
	loadForm:function(id){
		this.addContent('formEdit',this.getObject(id).getForm() );
	},
	updateObject:function(id,field,value){
		this.getObject(id).update(field,value);
	},
	updateInfo:function(id){
		this.getObject(id).updateInfo();
	}
	
}; 


oApplication=new Application;