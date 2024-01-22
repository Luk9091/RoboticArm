const canvas=document.getElementById("myCanvas"),context=canvas.getContext("2d"),OC=document.getElementById("OC"),armSlider=document.getElementById("armSlider"),armValue=document.getElementById("armValue"),baseSlider=document.getElementById("baseSlider"),baseValue=document.getElementById("baseValue"),handSlider=document.getElementById("handSlider"),handValue=document.getElementById("handValue"),rotorSlider=document.getElementById("rotorSlider"),rotorValue=document.getElementById("rotorValue"),x_position=document.getElementById("x_pos"),y_position=document.getElementById("y_pos"),z_position=document.getElementById("z_pos"),send=document.getElementById("Send"),armRes=document.getElementById("armRes"),baseRes=document.getElementById("baseRes"),rotorRes=document.getElementById("rotorRes");function toRadian(t){return t/360*2*Math.PI}function toDegree(t){return Math.round(360*t/(2*Math.PI))}function measureDistance(t,e){return x=Math.pow(e.x-t.x,2),Math.sqrt(x+(y=Math.pow(e.y-t.y,2))+(z=Math.pow(e.z-t.z,2)))}let baseAngle=0;const maxLen=154,scale=2.5,thickness=10;class Base{constructor(t,e,i){this.x0=t,this.y0=e,this.width=i,this.thickness=10,this.x1=0,this.y1=0,this.Angle=90,this.position()}set Angle(t){this.angle=toRadian(t+90)}get Angle(){return toDegree(this.angle)-90}get length(){return 80}position(){this.x1=this.width*Math.sin(this.angle)+this.x0,this.y1=this.width*Math.cos(this.angle)+this.y0}get getStartPosition(){let t={x:this.x0,y:this.y0};return t}get getEndPosition(){let t={x:this.x1,y:this.y1};return t}draw(){context.beginPath(),context.moveTo(this.x0,this.y0),context.lineTo(this.x1,this.y1),context.strokeStyle="white",context.lineWidth=2,context.stroke(),context.beginPath(),context.moveTo(this.x0+this.thickness*Math.cos(this.angle),this.y0-this.thickness*Math.sin(this.angle)),context.arc(this.x0,this.y0,this.thickness,-this.angle,-this.angle-toRadian(180),!0),context.lineTo(this.x1-this.thickness*Math.cos(this.angle),this.y1+this.thickness*Math.sin(this.angle)),context.arc(this.x1,this.y1,this.thickness,-this.angle+toRadian(180),-this.angle+toRadian(360),!0),context.closePath(),context.strokeStyle="white",context.lineWidth=2,context.stroke()}}class Arm{constructor(t){this.width=t,this.thickness=10,this.Angle=0}set Angle(t){this.angle=toRadian(t-45)}get Angle(){return 45+toDegree(this.angle)}position(t,e){this.x0=t.x,this.y0=t.y,this.x1=e.x+.71*this.width*Math.cos(this.angle),this.y1=e.y+.71*this.width*Math.sin(this.angle)}get getStartPosition(){let t={x:this.x0,y:this.y0};return t}get getEndPosition(){let t={x:this.x1,y:this.y1};return t}get length(){return 85}draw(){context.beginPath(),context.moveTo(this.x0,this.y0),context.lineTo(this.x1,this.y1),context.lineWidth=2,context.strokeStyle="white",context.stroke(),context.beginPath(),context.moveTo(this.x0-this.thickness*Math.sin(this.angle),this.y0+this.thickness*Math.cos(this.angle)),context.arc(this.x0,this.y0,this.thickness,this.angle+toRadian(90),this.angle+toRadian(270),!1),context.lineTo(this.x1+this.thickness*Math.sin(this.angle),this.y1-this.thickness*Math.cos(this.angle)),context.arc(this.x1,this.y1,this.thickness,this.angle-toRadian(90),this.angle+toRadian(90),!1),context.closePath(),context.lineWidth=2,context.strokeStyle="white",context.stroke()}}class CrossBar{constructor(t,e,i,s){this.x0=t,this.y0=e,this.width=i,this.height=s,this.Angle=0,this.Angle2=90,this.bar=200,this.position()}set Angle(t){this.angle=toRadian(135+t)}set Angle2(t){this.angle2=toRadian(t+90)}get getEndPosition(){let t={x:this.x2,y:this.y2};return t}position(){this.x1=this.x0+this.width*Math.cos(this.angle),this.y1=this.y0+this.width*Math.sin(this.angle),this.x2=this.x1+this.bar*Math.sin(this.angle2),this.y2=this.y1+this.bar*Math.cos(this.angle2)}draw(){context.beginPath(),context.moveTo(this.x0,this.y0),context.lineTo(this.x1,this.y1),context.lineWidth=2,context.strokeStyle="white",context.stroke(),context.beginPath(),context.moveTo(this.x1,this.y1),context.lineTo(this.x2,this.y2),context.lineWidth=2,context.strokeStyle="white",context.stroke()}}class Finger{constructor(t,e,i,s){this.width=.75*t,this.height=e,this.leftRight=i,this.Angle=s,i&&(this.height=-1*this.height)}set Angle(t){this.angle=toRadian(t)}position(t,e){this.x=t,this.y=e}draw(){context.beginPath(),context.moveTo(this.x,this.y),context.lineTo(this.x+this.width*Math.cos(this.angle),this.y-this.height*Math.sin(this.angle)),context.lineTo(this.x+this.width*Math.cos(this.angle)+.1*this.width*Math.sin(this.angle+toRadian(30)),this.y-this.height*Math.sin(this.angle)+.2*this.height*Math.cos(this.angle+toRadian(30))),context.lineWidth=2,context.strokeStyle="white",context.stroke(),context.beginPath(),context.moveTo(this.x+this.width*Math.cos(this.angle)+.1*this.width*Math.sin(this.angle+toRadian(30))-.2*this.width*Math.cos(this.angle),this.y-this.height*Math.sin(this.angle)+.2*this.height*Math.cos(this.angle+toRadian(30))+.2*this.height*Math.sin(this.angle)),context.lineTo(this.x+this.width*Math.cos(this.angle)+.1*this.width*Math.sin(this.angle+toRadian(30))+.2*this.width*Math.cos(this.angle),this.y-this.height*Math.sin(this.angle)+.2*this.height*Math.cos(this.angle+toRadian(30))-.2*this.height*Math.sin(this.angle)),context.lineWidth=4,context.strokeStyle="white",context.stroke()}}class Hand{constructor(t,e){this.width=t,this.height=e,this.angle=0,this.left=new Finger(t,e,!1,this.angle),this.right=new Finger(t,e,!0,this.angle)}set Angle(t){this.left.Angle=t,this.right.Angle=t}get Angle(){return Math.round(toDegree(this.left.angle))}position(t){this.left.position(t.x,t.y-.2*this.height),this.right.position(t.x,t.y+.2*this.height)}draw(){this.left.draw(),this.right.draw()}}class Axis{constructor(t,e,i){this.x0=t,this.y0=e,this.step=i}draw(){context.beginPath();for(let t=0;this.x0+this.step*t<canvas.width;t++)context.moveTo(this.x0+this.step*t,canvas.height),context.lineTo(this.x0+this.step*t,canvas.height-20),t%4==0&&(context.textAlign="center",context.lineTo(this.x0+this.step*t,canvas.height-40),context.fillText(t*this.step/2.5,this.x0+this.step*t,canvas.height-45));for(let e=0;this.y0>this.step*e;e++)context.moveTo(canvas.width,this.y0-this.step*e),context.lineTo(canvas.width-20,this.y0-this.step*e),e%4==0&&(context.textAlign="right",context.lineTo(canvas.width-45,this.y0-this.step*e),context.fillText(e*this.step/2.5,canvas.width-50,this.y0-this.step*e+4));context.lineWidth=2,context.strokeStyle="red",context.stroke()}}function draw(){base.position(),crossBar.position(),arm.position(crossBar.getEndPosition,base.getEndPosition),hand.position(arm.getEndPosition),context.clearRect(0,0,canvas.width,canvas.height),axis.draw(),base.draw(),crossBar.draw(),arm.draw(),hand.draw(),timer=0}function setXY(){ax=toRadian(baseValue.value),ay=toRadian(rotorValue.value-90),az=toRadian(armValue.value-45),x_position.value=Math.round((base.length*Math.cos(ax)+arm.length*Math.cos(az))*Math.cos(ay)),z_position.value=Math.round(base.length*Math.sin(ax)-arm.length*Math.sin(az)),y_position.value=Math.round(154*(Math.sin(ay)*Math.sin(ax+az))+154)}window.onload=function(){if(0!=OC.value){var t=document.createElement("div");t.classList.add("slider"),t.textContent="Over current",1&OC.value&&(baseSlider.outerHTML=t.outerHTML,baseValue.style.display="none",baseRes.style.display="inline"),2&OC.value&&(armSlider.outerHTML=t.outerHTML,armValue.style.display="none",armRes.style.display="inline"),4&OC.value&&(rotorSlider.outerHTML=t.outerHTML,rotorValue.style.display="none",rotorRes.style.display="inline"),send.textContent="Reset"}changeVal_arm(parseInt(armValue.value)),changeVal_base(parseInt(baseValue.value)),hand.Angle=parseInt(handValue.value),handSlider.value=handValue.value,rotorSlider.value=rotorValue.value,draw(),setXY(),timer=timer_limit+1};let timer=0;const timer_limit=10;function reload(){(timer+=1)==timer_limit?(baseAngle=rotorValue.value,window.location.href="/cgi?"+arm.Angle+"&"+base.Angle+"&"+baseAngle+"&"+hand.Angle):timer==3*timer_limit&&(window.location.href="/index.shtml")}function changeVal_arm(t){t=parseInt(t),arm.Angle=t,crossBar.Angle=t,armSlider.value=t,armValue.value=t,draw()}function changeVal_base(t){t=parseInt(t),base.Angle=t,crossBar.Angle2=t,(min=75-t)<0&&(min=0),armSlider.min=min,armValue.min=min,(max=180-t)>85&&(max=85),armSlider.max=max,armValue.max=max,arm.Angle<min?changeVal_arm(min):arm.Angle>max&&changeVal_arm(max),baseSlider.value=t,baseValue.value=t,draw()}send.onclick=function(){0==OC.value?(baseAngle=rotorValue.value,window.location.href="/cgi?"+arm.Angle+"&"+base.Angle+"&"+baseAngle+"&"+hand.Angle):window.location.href="/res?11"},armRes.onclick=function(){window.location.href="/res?2"},baseRes.onclick=function(){window.location.href="/res?1"},rotorRes.onclick=function(){window.location.href="/res?4"},armSlider.oninput=function(){changeVal_arm(this.value),setXY()},armValue.oninput=function(){changeVal_arm(this.value),setXY()},baseSlider.oninput=function(){changeVal_base(this.value),setXY()},baseValue.oninput=function(){changeVal_base(this.value),setXY()},handSlider.oninput=function(){hand.Angle=this.value,handValue.value=this.value,draw()},handValue.oninput=function(){hand.Angle=this.value,handSlider.value=this.value,draw()},rotorSlider.oninput=function(){baseAngle=this.value,rotorValue.value=this.value,setXY(),timer=0},rotorValue.oninput=function(){baseAngle=this.value,rotorSlider.value=this.value,setXY(),timer=0};const base=new Base(.2*canvas.width,.8*canvas.height,200),arm=new Arm(300),crossBar=new CrossBar(base.getStartPosition.x,base.getStartPosition.y,87.5),hand=new Hand(80,30),axis=new Axis(base.getStartPosition.x,base.getStartPosition.y,25);