function getEle(ele){
    return document.querySelector(ele)
}
var main = getEle('#main');
var bell = getEle('#bell');
var say = getEle('#say');
var music = getEle('#music');
var loading = getEle('#loading');
var progress = getEle('.progress');
var pSpan = getEle('.pSpan');
var phone = getEle('.phone');
var phoneName = getEle('.phoneName');
var phoneText = getEle('.phoneText');
var answerOne = getEle('.answerOne');
var oneTouch = getEle('oneTouch');
var answerOther = getEle('.answerOther');
var otherTouch = getEle('.otherTOuch');
var touchClick = getEle('.touchClick');
var message = getEle('.message');
var msgList = getEle('.msgList');
var msgLis = document.querySelectorAll('.message li');
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 1008;
if(desW/desH<winW/winH){
    main.style.webkitTransform = 'scale('+winW/desW+')';
}else{
    main.style.webkitTransform = 'scale('+winH/desH+')';
}
var oLis = document.querySelectorAll(".slide>li");

~(function(){
    var arr= ['phoneBg.jpg', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    var num = 0;
    fnLoad();
    function fnLoad(){
        for(var i = 0;i<arr.length;i++) {
            var oImg = new Image();
            oImg.src = "images/" + arr[num];
            oImg.onload = function () {
                num++;
                pSpan.style.width = num / (arr.length) * 100 + "%";
            }
            pSpan.addEventListener('webkitTransitionEnd', function () {
                if(num ==7&&loading){
                    loading.parentNode.removeChild(loading);
                    loading=null;
                    fnPhone.init();
                }

            }, false)
        }
    }
})();


var fnPhone = {
    init : function(){
        bell.play();
        phone.addEventListener('touchstart',this.touch,false);
    },
    touch: function(e){
        if(e.target.className =="touchClick"){
            bell.pause();
            e.target.parentNode.style.display='none';
            answerOther.style.webkitTransform='translate(0,0)';
        }else if(e.target.className =="otherTouch"){
            fnPhone.closePhone();
        }
        phone.removeEventListener('touchstart',this.touch,false);
    },
    closePhone:function(){
        phone.style.webkitTransform='translate(0,'+desH+'px)';
        window.setTimeout(function(){
            phone.parentNode.removeChild(phone);
            fnMessage();
        },1000)
    }
};

function fnMessage(){
    var n = 0;
    var h = 0;
    var timer = window.setInterval(function(){
        h+=msgLis[n].offsetHeight-20;
        msgLis[n].style.opacity = 1;
        msgLis[n].style.webkitTransform ='translate(0,0)';
        if(n>=3){
            msgList.style.transform='translate(0,'+(-h)+'px)' ;
        }
        if(n==msgLis.length-1){
            window.clearInterval(timer);
            message.parentNode.removeChild(message);
            fnCube();
        }else{
            n++;

        }
    },1000)

}


function fnCube(){
        [].forEach.call(oLis, function () {
            arguments[0].index = arguments[1];
            arguments[0].addEventListener('touchstart', start, false);
            arguments[0].addEventListener('touchmove', move, false);
            arguments[0].addEventListener('touchend', end, false);
        })

        function start(e) {
            this.startY = e.changedTouches[0].pageY;
        }

        function move(e) {
            e.preventDefault();
            var touchMove = e.changedTouches[0].pageY;
            var changePos = touchMove - this.startY;
            var cur = this.index;
            var step = 1/2;
            var scalePos =(Math.abs(changePos)/winH)*step;
            [].forEach.call(oLis,function(){
                if(arguments[1]!=cur){
                    arguments[0].style.display="none";
                }
                arguments[0].className="";
                arguments[0].firstElementChild.id="";
            })
            if (changePos > 0) {
                var pos = -winH+changePos;
                this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

            } else if (changePos < 0) {
                var pos = winH+changePos;
                this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;

            }
            oLis[this.preSIndex].style.webkitTransform = "translate(0,"+pos+"px)";
            oLis[this.preSIndex].className = "zIndex";
            oLis[this.preSIndex].style.display="block";
            oLis[cur].style.webkitTransform = "scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
            window.setTimeout(function () {
                var oDivs = document.querySelectorAll(".a4>div");
                for (var i = 0; i < oDivs.length; i++) {
                    oDivs[i].className = "move";
                }
            }, 200);
        }
        function end(e) {
            oLis[this.preSIndex].style.webkitTransform ="translate(0,0)";
            oLis[this.preSIndex].style.webkitTransition="0.5s";
            oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
                this.style.webkitTransition="";
                this.firstElementChild.id = "a"+(this.index+1);
            })
        }
}





