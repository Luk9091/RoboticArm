const canvas = document.getElementById("myCanvas")
const context = canvas.getContext("2d")

const armSlider = document.getElementById("armSlider");
const armValue  = document.getElementById("armValue");

const baseArmSlider= document.getElementById("baseArmSlider");
const baseArmValue = document.getElementById("baseArmValue");

const handSlider = document.getElementById("handSlider");
const handValue = document.getElementById("handValue");

const baseSlider = document.getElementById("baseSlider");
const baseValue = document.getElementById("baseValue");

function toRadian(angle){
    return(angle/360*2*Math.PI)
}


class BaseArm{
    constructor(x, y, width, height, geometry){
        this.x0 = x,
        this.y0 = y,
        
        this.width = width;
        this.height = height;
    
        this.x1 = 0;
        this.y1 = 0;
    
        this.Angle = 90;
        this.position(geometry)
    }

    set Angle(value){
        this.angle = toRadian(value+90);
    }

    position(){
        this.x1 = (this.height)*Math.sin(this.angle) + this.x0;
        this.y1 = (this.height)*Math.cos(this.angle) + this.y0;
    }

    get getGeometry(){
        const geometry= {x: this.x1, y: this.y1};
        return geometry;
    }


    draw(){
        context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x1, this.y1)

            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();

        context.beginPath()
            context.moveTo(this.x0+this.width*Math.cos(this.angle), this.y0 - this.width*Math.sin(this.angle));
            context.arc(this.x0, this.y0, this.width, -this.angle, -this.angle - toRadian(180), true);
            context.lineTo(this.x1 - this.width*Math.cos(this.angle), this.y1 + this.width*Math.sin(this.angle));
            context.arc(this.x1, this.y1, this.width, -this.angle + toRadian(180), -this.angle + toRadian(360), true);
        context.closePath()


            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();
    }

}

class Arm{
    constructor(width, height){
        this.width = width;
        this.height= height;
    
        this.Angle = 30;
    }

    set Angle(value){
        this.angle = (-value)/360*2*Math.PI;
    }

    position(geometry){
        this.x0 = geometry.x - 0.25 * this.height * Math.cos(this.angle);
        this.y0 = geometry.y - 0.25 * this.height * Math.sin(this.angle);
        this.x1 = geometry.x + 0.75 * this.height * Math.cos(this.angle);
        this.y1 = geometry.y + 0.75 * this.height * Math.sin(this.angle);
    }

    get getGeometry(){
        const geometry= {x: this.x1, y: this.y1};
        return geometry;
    }

    draw(){
        context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x1, this.y1);

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();

        context.beginPath();
            context.moveTo(this.x0 - this.width*Math.sin(this.angle), this.y0 + this.width*Math.cos(this.angle));
            context.arc(this.x0, this.y0, this.width, this.angle + toRadian(90), this.angle + toRadian(180+90), false);
            context.lineTo(this.x1 + this.width*Math.sin(this.angle), this.y1 - this.width*Math.cos(this.angle));
            context.arc(this.x1, this.y1, this.width, this.angle - toRadian(90), this.angle + toRadian(180-90), false);
            context.lineTo(this.x0 - this.width*Math.sin(this.angle), this.y0 + this.width*Math.cos(this.angle));

            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();
    }
};

class Finder{
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
        console.log("Left Hand")
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

        this.left =  new Finder(width, height, false, this.angle)
        this.right = new Finder(width, height, true,  this.angle)
    }

    set Angle(value){
        this.left.Angle = value;
        this.right.Angle = value;
    }

    position(geometry){
        this.left.position (geometry.x, geometry.y - 0.2*this.height);
        this.right.position(geometry.x, geometry.y + 0.2*this.height);
    }

    draw(){
        this.left.draw()
        this.right.draw()
    }
}


function draw(){
    baseArm.position();
    arm.position(baseArm.getGeometry);
    hand.position(arm.getGeometry)

    context.clearRect(0, 0, canvas.width, canvas.height);
    baseArm.draw();
    arm.draw();

    hand.draw()
}



function setDefault(){
    arm.Angle       = 30;
    armValue.value  = 30;
    armSlider.value = 30;

    baseArm.value       = 90;
    baseArmValue.value  = 90;
    baseArmSlider.value = 90;


    hand.Angle = 30;
    handSlider.value = 30;
    handValue.value = 30;

    // base.Angle = 30;
    baseSlider.value = 90;
    baseValue.value = 90;

    draw()
}

armSlider.oninput = function(){
    arm.Angle = parseInt(this.value);
    armValue.value = this.value;
    draw();
}

baseArmSlider.oninput = function(){
    baseArm.Angle = parseInt(this.value);
    baseArmValue.value = this.value;
    draw();
}

armValue.oninput = function(){
    arm.Angle = parseInt(this.value);
    armSlider.value = this.value;
    draw()
}

baseArmValue.oninput = function(){
    baseArm.Angle = parseInt(this.value);
    baseArmSlider.value = this.value;
    draw()
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

baseSlider.oninput = function(){
    // base.Angle = parseInt(this.value);
    baseValue.value = this.value;
    // draw();
}
baseValue.oninput = function(){
    // base.Angle = parseInt(this.value);
    baseSlider.value = this.value;
    // draw();
}



const baseArm= new BaseArm(canvas.width * 0.33, canvas.height *  0.8, canvas.width*0.02, canvas.height*0.4);
const arm = new Arm(canvas.width * 0.02, canvas.height * 0.6);
const hand = new Hand(canvas.width*0.2, canvas.height*0.15);
