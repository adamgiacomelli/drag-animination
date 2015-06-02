
var isDragging = false;
var initLoc = 0;
var diffLoc = 0;

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function DragAnimation(imgPrefix, frameCount, imgType, speed) {
    this.animationFrame = 0;    
    this.currentAnimationFrame = 0;    
    this.speedFactor = speed/10;
    this.frameCount = frameCount;
    this.imgType = imgType;
    this.imgPrefix = imgPrefix;
    
    this.images = new Array();
    if(!!document.getElementById("drag-animation")) {            
        for(var i = 0; i < this.frameCount; i++) {
            this.images[i] = new Image();
            this.images[i].src = this.imgPrefix + pad(parseInt(i), this.frameCount.toString().length) + this.imgType;        
            this.images[i].draggable = false;
            this.images[i].className = "drag-image unselectable";

            if(i == 0)
                this.images[i].className += " active";
            document.getElementById("drag-animation").appendChild(this.images[i]);
        }
    }

    $("#drag-animation").mousedown(function(e) {
        isDragging = true;
        initLoc = e.pageX;
        diffLoc = 0;

        $(window).mousemove(function(e) {
            if(isDragging) {            
                diffLoc = e.pageX - initLoc;
                var changed = dragAnimation.incrementAnimationFrame(diffLoc);
                if(changed > 0)
                    initLoc = e.pageX;
            }        
        });
    });
    $(window).mouseup(function() {
        var wasDragging = isDragging;
        isDragging = false;    
        if (!wasDragging) { 
            //was clicking    
        }
    });

}

DragAnimation.prototype.incrementAnimationFrame = function(diffLoc) {
    this.animationFrame += diffLoc*this.speedFactor/$("#drag-animation").width();          
    if(this.animationFrame < 0)
        this.animationFrame = this.frameCount - 1;

    if(this.animationFrame >= this.frameCount)
        this.animationFrame = 0;

    if(this.currentAnimationFrame != parseInt(this.animationFrame)) {
        for(var i = 0; i < this.frameCount; i++) {
            this.images[i].className = "drag-image unselectable";
        }

        this.images[parseInt(this.animationFrame)].className = "drag-image unselectable active";

        var changed = Math.abs(this.currentAnimationFrame - this.animationFrame);
        this.currentAnimationFrame = parseInt(this.animationFrame);
        return changed;
    }

    return 0;
}
