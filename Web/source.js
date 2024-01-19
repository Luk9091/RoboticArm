const canvas = document.getElementById("myCanvas")
const context = canvas.getContext("2d")

const OC = document.getElementById("OC")
const armSlider = document.getElementById("armSlider");
const armValue  = document.getElementById("armValue");

const baseSlider= document.getElementById("baseSlider");
const baseValue = document.getElementById("baseValue");

const handSlider = document.getElementById("handSlider");
const handValue = document.getElementById("handValue");

const rotorSlider = document.getElementById("rotorSlider");
const rotorValue = document.getElementById("rotorValue");

const x_position = document.getElementById("x_pos");
const y_position = document.getElementById("y_pos");

const send = document.getElementById("Send");

const armRes = document.getElementById("armRes");
const baseRes = document.getElementById("baseRes");
const rotorRes = document.getElementById("rotorRes");
// const interval = setInterval(reload, 200);

function toRadian(angle){
    return(angle/360*2*Math.PI)
}

function toDegree(angle){
    return Math.round(angle*360/(2*Math.PI));
}

function measureDistance(startPoint, endPoint){
    x = Math.pow(endPoint.x - startPoint.x, 2);
    y = Math.pow(endPoint.y - startPoint.y, 2);
    distance = x + y;
    return Math.sqrt(distance);
}

let baseAngle = 0;
const scale = 2.5
const thickness = 10


class Base{
    constructor(x, y, width){
        this.x0 = x,
        this.y0 = y,
        
        this.width = width;
        this.thickness = thickness;
    
        this.x1 = 0;
        this.y1 = 0;
    
        this.Angle = 90;
        this.position()
    }

    set Angle(value){
        this.angle = toRadian(value+90);
    }

    get Angle(){
        return toDegree(this.angle)-90
    }

    position(){
        this.x1 = (this.width)*Math.sin(this.angle) + this.x0;
        this.y1 = (this.width)*Math.cos(this.angle) + this.y0;
    }

    get getStartPosition(){
        const point = {x: this.x0, y: this.y0};
        return point;
    }

    get getEndPosition(){
        const point= {x: this.x1, y: this.y1};
        return point;
    }


    draw(){
        context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x1, this.y1)

            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();

        context.beginPath()
            context.moveTo(this.x0 + this.thickness*Math.cos(this.angle), this.y0 - this.thickness*Math.sin(this.angle));
            context.arc(this.x0, this.y0, this.thickness, -this.angle, -this.angle - toRadian(180), true);
            context.lineTo(this.x1 - this.thickness*Math.cos(this.angle), this.y1 + this.thickness*Math.sin(this.angle));
            context.arc(this.x1, this.y1, this.thickness, -this.angle + toRadian(180), -this.angle + toRadian(360), true);
            context.closePath()

            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();
    }

}

class Arm{
    constructor(width){
        this.width = width;
        this.thickness= thickness;
    
        this.Angle = 0;
    }

    set Angle(value){
        this.angle = toRadian(value-45);
    }

    get Angle(){
        return 45+toDegree(this.angle);
    }

    position(startPoint, centerPoint){
        this.x0 = startPoint.x;
        this.y0 = startPoint.y;
        
        this.x1 = centerPoint.x + 0.71 * this.width * Math.cos(this.angle);
        this.y1 = centerPoint.y + 0.71 * this.width * Math.sin(this.angle);
    }

    get getStartPosition(){
        const point= {x: this.x0, y: this.y0};
        return point
    }
    get getEndPosition(){
        const point= {x: this.x1, y: this.y1};
        return point;
    }

    draw(){
        context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x1, this.y1);

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();
            rotorValue
        context.beginPath();
            context.moveTo(this.x0 - this.thickness*Math.sin(this.angle), this.y0 + this.thickness*Math.cos(this.angle));
            context.arc(this.x0, this.y0, this.thickness, this.angle + toRadian(90), this.angle + toRadian(180+90), false);
            context.lineTo(this.x1 + this.thickness*Math.sin(this.angle), this.y1 - this.thickness*Math.cos(this.angle));
            context.arc(this.x1, this.y1, this.thickness, this.angle - toRadian(90), this.angle + toRadian(180-90), false);
            context.closePath()

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();
    }
};

class CrossBar{
    constructor(x, y, width, height){
        this.x0 = x;
        this.y0 = y;
        this.width = width;
        this.height = height
        this.Angle = 0
        this.Angle2= 90

        this.bar = measureDistance(base.getEndPosition, base.getStartPosition);

        this.position();
    }

    set Angle(value){
        this.angle = toRadian(135 + value);
    }

    set Angle2(value){
        this.angle2 = toRadian(value+90)
    }

    get getEndPosition(){
        const point = {x: this.x2, y: this.y2};
        return point;
    }

    position(){
        this.x1 = this.x0 + this.width*Math.cos(this.angle);
        this.y1 = this.y0 + this.width*Math.sin(this.angle);
        this.x2 = this.x1 + this.bar*Math.sin(this.angle2);
        this.y2 = this.y1 + this.bar*Math.cos(this.angle2);
    }

    draw(){
        context.beginPath()
            context.moveTo(this.x0, this.y0)
            context.lineTo(this.x1, this.y1)
            
            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();

        context.beginPath()
            context.moveTo(this.x1, this.y1)
            context.lineTo(this.x2, this.y2)

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();
    }
}

class Finger{
    constructor(width, height, leftRight, angle){
        this.width = width*0.75;
        this.height = height;
        this.leftRight = leftRight;
        this.Angle = angle;

        if (leftRight) {
            this.height = this.height * -1;
        }
    }

    set Angle(value) {
        this.angle = toRadian(value);
    }

    position(x, y){
        this.x = x;
        this.y = y
    }

    draw() {
        context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.x + this.width*Math.cos(this.angle), this.y - this.height*Math.sin(this.angle));
            context.lineTo(this.x + this.width*Math.cos(this.angle) + this.width*0.1*Math.sin(this.angle + toRadian(30)), this.y - this.height*Math.sin(this.angle) + 0.2*this.height*Math.cos(this.angle + toRadian(30)));

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();

        context.beginPath();
            context.moveTo(this.x + this.width*Math.cos(this.angle) + this.width*0.1*Math.sin(this.angle + toRadian(30)) - 0.2*this.width*Math.cos(this.angle), this.y - this.height*Math.sin(this.angle) + 0.2*this.height*Math.cos(this.angle + toRadian(30)) + 0.2*this.height*Math.sin(this.angle));
            context.lineTo(this.x + this.width*Math.cos(this.angle) + this.width*0.1*Math.sin(this.angle + toRadian(30)) + 0.2*this.width*Math.cos(this.angle), this.y - this.height*Math.sin(this.angle) + 0.2*this.height*Math.cos(this.angle + toRadian(30)) - 0.2*this.height*Math.sin(this.angle));

            context.lineWidth = 4;
            context.strokeStyle = "white";
            context.stroke();


            
    }
}

class Hand{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.angle = 0;

        this.left =  new Finger(width, height, false, this.angle)
        this.right = new Finger(width, height, true,  this.angle)
    }

    set Angle(value){
        this.left.Angle = value;
        this.right.Angle = value;
    }

    get Angle(){
        return Math.round(toDegree(this.left.angle), 2);
    }

    position(point){
        this.left.position (point.x, point.y - 0.2*this.height);
        this.right.position(point.x, point.y + 0.2*this.height);
    }

    draw(){
        this.left.draw()
        this.right.draw()
    }
}


class Axis{
    constructor(x0, y0, step){
        this.x0 = x0;
        this.y0 = y0;
        this.step = step;
    }

    draw(){
        context.beginPath()
            for (let i = 0; this.x0 + this.step*i < canvas.width; i++) {
                context.moveTo(this.x0 + this.step*i, canvas.height);
                context.lineTo(this.x0 + this.step*i, canvas.height-20);
                if(i % 4 == 0){
                    context.textAlign = "center";
                    context.lineTo(this.x0+ this.step*i, canvas.height-40);
                    context.fillText(i*this.step/scale, this.x0 + this.step*(i), canvas.height-45)
                }
            }


            for (let i = 0; this.y0 > this.step*i; i++){
                context.moveTo(canvas.width, this.y0-this.step*i);
                context.lineTo(canvas.width-20, this.y0-this.step*i);
                if (i % 4 == 0){
                    context.textAlign = "right";
                    context.lineTo(canvas.width-45, this.y0-this.step*i);
                    context.fillText(i*this.step/scale, canvas.width-50, this.y0-this.step*i+4)
                }
            }
            
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.stroke();
    }
}


function draw(){
    base.position();
    crossBar.position()
    arm.position(crossBar.getEndPosition, base.getEndPosition);
    hand.position(arm.getEndPosition)

    context.clearRect(0, 0, canvas.width, canvas.height);
    axis.draw()
    base.draw();
    crossBar.draw();
    arm.draw();

    hand.draw();
    
    timer = 0;
}


function setXY(){
    x_position.value = Math.round( (arm.getEndPosition.x - base.getStartPosition.x)/scale, 2);
    y_position.value = Math.round(-(arm.getEndPosition.y - base.getStartPosition.y)/scale, 2);
}

window.onload = function(){
    if (OC.value != 0){
        var OverCurrent = document.createElement('div');
            OverCurrent.classList.add("slider")
            OverCurrent.textContent = "Over current";

        if(OC.value & 1){
            baseSlider.outerHTML = OverCurrent.outerHTML;
            baseValue.style.display = 'none';
            baseRes.style.display = "inline";
        }
        if(OC.value & 2){
            armSlider.outerHTML = OverCurrent.outerHTML;
            armValue.style.display = 'none';
            armRes.style.display = "inline";
        }
        if(OC.value & 8){
            rotorSlider.outerHTML = OverCurrent.outerHTML;
            rotorValue.style.display = 'none';
            rotorRes.style.display = "inline";
        }
        send.textContent = "Reset"
    }
    changeVal_arm(parseInt(armValue.value));
    changeVal_base(parseInt(baseValue.value));
    hand.Angle  = parseInt(handValue.value);
    handSlider.value  = handValue.value;
    rotorSlider.value  = rotorValue.value;

    draw();
    setXY();
    timer = timer_limit+1;
}

let timer = 0;
const timer_limit = 10;
send.onclick = function(){
    if (OC.value == 0){
        baseAngle = rotorValue.value
        window.location.href = "/cgi?" + arm.Angle + "&" + base.Angle + "&" + baseAngle + "&" + hand.Angle;
    } else {
        window.location.href = "/res?11"
    }
}
function reload(){
    timer = timer + 1;

    if(timer == timer_limit){
        baseAngle = rotorValue.value
        window.location.href = "/cgi?" + arm.Angle + "&" + base.Angle + "&" + baseAngle + "&" + hand.Angle;
    }
}

armRes.onclick = function(){window.location.href   = "/res?1"}
baseRes.onclick = function(){window.location.href  = "/res?0"}
rotorRes.onclick = function(){window.location.href = "/res?8"}

function changeVal_arm(value){
    value = parseInt(value);

    arm.Angle = value;
    crossBar.Angle = value;
    
    armSlider.value = value;
    armValue.value = value;
    draw();
}

function changeVal_base(value){
    value = parseInt(value);
    base.Angle = value;
    crossBar.Angle2 = value;

    min = 75-value;
    if (min < 0) min = 0;
    armSlider.min = min;
    armValue.min = min;

    max = 180-value;
    if (max > 85) max = 85;
    armSlider.max = max;
    armValue.max = max;

    if (arm.Angle < min){
        changeVal_arm(min);
    } else if (arm.Angle > max){
        changeVal_arm(max);
    }

    baseSlider.value = value;
    baseValue.value = value;
    draw();
}

armSlider.oninput = function(){
    changeVal_arm(this.value);
    setXY();
}
armValue.oninput = function(){
    changeVal_arm(this.value);
    setXY();
}

baseSlider.oninput = function(){
    changeVal_base(this.value);
    setXY();
}
baseValue.oninput = function(){
    changeVal_base(this.value);
    setXY();
}



handSlider.oninput = function(){
    hand.Angle = parseInt(this.value);
    handValue.value = this.value;
    draw();
}
handValue.oninput = function(){
    hand.Angle = parseInt(this.value);
    handSlider.value = this.value;
    draw();
}

rotorSlider.oninput = function(){
    baseAngle = parseInt(this.value);
    rotorValue.value = this.value;
    timer = 0;
}

rotorValue.oninput = function(){
    baseAngle = parseInt(this.value);
    rotorSlider.value = this.value;
    timer = 0;
}

x_position.oninput = function(){
    value = parseInt(this.value);
    y2 = Math.pow(parseInt(y_position.value), 2);
    if (Math.sqrt(Math.pow(value, 2) + y2) < 152){
        offset = Math.round((arm.getEndPosition.x-base.getEndPosition.x)/scale, 2);
        angle = toDegree(Math.acos((value-offset)/80));
        changeVal_base(angle);

        y_position.value =-Math.round((arm.getEndPosition.y-base.getStartPosition.y)/scale, 2);
    } else {
        this.value = Math.round(Math.sqrt(23104-y2), 2)
    }
}

y_position.oninput = function(){
    offset = (base.getStartPosition.y-base.getEndPosition.y)/scale;
    angle = toDegree(Math.asin((parseInt(this.value)-offset)/85));

    if(angle >= armValue.min && angle <= armValue.max){
        changeVal_arm(angle);
        x_position.value = Math.round((arm.getEndPosition.x-base.getStartPosition.x)/scale, 2);
    } else {
        y_position.value =-Math.round((arm.getEndPosition.y-base.getStartPosition.y)/scale, 2);
    }
}


const base= new Base(canvas.width * 0.2, canvas.height *  0.8, 80*scale);
const arm = new Arm(120*scale);
const crossBar = new CrossBar(base.getStartPosition.x, base.getStartPosition.y, 35*scale)
const hand = new Hand(80, 30);
const axis = new Axis(base.getStartPosition.x, base.getStartPosition.y, 10*scale)