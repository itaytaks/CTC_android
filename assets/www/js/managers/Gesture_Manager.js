gestureMan = function() {
    this.initGesture = function() {
        gestureMan_.gestureStart("LR");
    }
    this.showPage = function() {
        NavigationMan_.navigate(NavigationMan_.pagePosition, "gesture");


    }

    this.gestureStart = function(type) {
        eyesightMan.changeDirection(type);
    }
    this.gestureStop = function() {
        //eyesightMan.changeDirection("STOP");
    }
}