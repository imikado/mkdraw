<style>
.canvas{
position:absolute;
top:0px;
left:0px;
	
}
#tCanvas{
position:absolute;
top:0px;
left:0px;
width:900px;
height:800px;
background:#ffffff;
}

#menudraw{
position:absolute;
top:0px;
left:920px;
width:300px;
height:800px;
background:#ffffff;
	
}
#menudrawContent{
height:300px;
}
.layer{
margin:2px;
background:#ddd;
}
.layerSelected{
margin:2px;
background:#444;
}
.layerSelected a{
color:white;
}
.layerObject{
margin:2px;
margin-left:8px;
background:#eee;
}
.layerObjectSelected{
margin:2px;
margin-left:8px;
background:#aaa;
}
.layerObjectSelected a{
color:white;
}
.btn{
border:0px solid gray;
padding:6px;
background:#ddd;
text-decoration:none;
}
.btnSelected{
border:0px solid gray;
padding:6px;
background:#333;
color:white;
text-decoration:none;
}
.number{
width:50px;
}
.bulleInfo{
	position:absolute;
	background:darkblue;
	border:1px solid gray;
	cursor:help;
	padding:4px;
	width:6px;
	height:6px;
}
.bulleInfo .contenu{
	position:absolute;
	display:none;
	border:1px solid gray;
	background:white;
}
.bulleInfo:hover .contenu{
	display:block;
	padding:20px;
	border:4px solid #b9b01b;
	background:#faf496;
}
</style>
<script>
function loadSave(){
	var stObject=JSON.stringify( oApplication.tObject); 
	
	var b=getById('tObject');
	if(b){
		b.value=stObject;
	}
	
	var stMenuLayerObject=JSON.stringify( oApplication.tMenuLayerObject); 
	
	var c=getById('tMenuLayerObject');
	if(c){
		c.value=stMenuLayerObject;
	}
}
function save(){
	
	loadSave();
	
	var a=getById('formSave');
	if(a){
		a.submit();
	}
}
</script>
<div id="tCanvas">

</div>
<div id="menudraw">
<div id="menudrawContent">
</div>
<div>
<p>
	<a href="#" id="btn_carre" class="btn" onclick="oApplication.chooseType('carre');">Carre</a>
	<a href="#" id="btn_texte" class="btn" onclick="oApplication.chooseType('texte');">Texte</a>
	<a href="#" id="btn_ligne" class="btn" onclick="oApplication.chooseType('ligne');">Ligne</a>
	<a href="#" id="btn_fleche" class="btn" onclick="oApplication.chooseType('fleche');">Fleche</a>
	<a href="#" id="btn_bdd" class="btn" onclick="oApplication.chooseType('bdd');">BDD</a>
	<a href="#" id="btn_link" class="btn" onclick="oApplication.chooseType('link');">Lien</a>
	
</p>
</div>
	<p><input onclick="oApplication.addLayer()" type="button" value="Add layer"/> <input type="button" value="save" onclick="save()"/></p>
<div id="formEdit"></div>
</div>

<canvas id="canvas_tmp" class="canvas" width="900px" height="800px"  onclick="oApplication.click(event)" onmousemove="oApplication.mousemove(event)"></canvas>

<div id="tInfo"></div>

<script>
oApplication.load();
<?php if($this->tObject!=''):?>
var tObject=<?php echo $this->tObject?>;

var iMax=0;
for(var i=0;i< tObject.length;i++){
	if(!tObject[i]){ continue; }
	if(tObject[i].idLayer > iMax){
		iMax=tObject[i].idLayer;
	}
}
for(var i=0;i<iMax;i++){	
	oApplication.addLayer();
}

for(var i=0;i< tObject.length;i++){
	if(!tObject[i]){ continue; }
	var oData=new Data(tObject[i].type,tObject[i].idLayer);
	oData.x=tObject[i].x;
	oData.y=tObject[i].y;
	oData.strokeStyle=tObject[i].strokeStyle;
	oData.fillStyle=tObject[i].fillStyle;
	oData.width=tObject[i].width;
	oData.height=tObject[i].height;
	oData.from=tObject[i].from;
	oData.comment=tObject[i].comment;
	oData.to=tObject[i].to;
	oData.lineWidth=tObject[i].lineWidth;
	oData.x2=tObject[i].x2;
	oData.y2=tObject[i].y2;
	oData.texte=tObject[i].texte;
	oData.size=tObject[i].size;
	oData.info=tObject[i].info;
	oData.relativeObject=tObject[i].relativeObject;
	oData.relativeX=tObject[i].relativeX;
	oData.relativeY=tObject[i].relativeY;
	//oData.type=tObject[i].type;
	//oData.idLayer=tObject[i].idLayer;
	oData.build();
	
	oApplication.addLayerObject(1,oData);
}

<?php if($this->tMenuLayerObject!=''):?>
	oApplication.tMenuLayerObject=<?php echo $this->tMenuLayerObject?>;
<?php endif;?>

for(var i=1;i<=iMax;i++){
	
	//oApplication.buildLayer(i);
	oApplication.clearMenuObject(i);
	oApplication.builListMenuLayerObject(i);
}

//oApplication.tObject=;
<?php endif;?>
loadSave();

</script>
<div>
<form id="formSave" action="" method="POST" >
	<textarea name="tObject" id="tObject"></textarea>
	<textarea name="tMenuLayerObject" id="tMenuLayerObject"></textarea>
	
</form>
</div>
