include("js/jquery.color.js");
include("js/jquery.backgroundpos.min.js");
include("js/jquery.easing-1.3.pack.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/jquery-ui-1.8.24.custom.min.js");
include("js/cScroll.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/bgStretch.js");
include("js/sImg.js");
include("js/forms.js");
include("js/MathUtils.js");
include("js/jcarousellite_1.0.1.min.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = false,
    content;

function addAllListeners() {
    $('.prevBtn').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},250,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
    $('.nextBtn').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},250,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );
    $('.pagin>ul>li>a')
    .hover(
        function(){
            if (!$(this).parent().hasClass('active'))
                if (!MSIE) {
        	       $(this).children('span').stop().animate({opacity:'0'},350,'easeOutExpo');
                } else {
                   $(this).children('span').stop().hide();
                }  
        },
        function(){
            if (!$(this).parent().hasClass('active'))
                if (!MSIE) {
        	       $(this).children('span').stop().animate({opacity:'1'},700,'easeOutCubic');
                } else {
                   $(this).children('span').stop().show();
                }
        }
    );
    $('.list2>li>a').hover(
        function(){
        	$(this).stop().animate({'paddingLeft':'10px'},300,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'paddingLeft':'0'},500,'easeOutCubic');  
        }
    );  
    $('.list1>li>a').hover(
        function(){
            if (!MSIE){
                $(this).children('span').stop().animate({'opacity':'0'},300,'easeOutCubic');  
            } else {
                $(this).children('span').stop().hide();
            }  
        },
        function(){
            if (!MSIE){
                $(this).children('span').stop().animate({'opacity':'0.67'},700,'easeOutCubic'); 
            }else {
                 $(this).children('span').stop().show();
            }
        }
    );
}

function showSplash(){
    content.children('ul').stop().animate({'height':'642px'},700,'easeInOutExpo');
}

function hideSplash(){
    content.children('ul').stop().animate({'height':'0'},700,'easeInOutExpo');
}

function hideSplashQ(){
    content.children('ul').css({'height':'0'});
}

$(document).ready(ON_READY);
function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    if ($.browser.safari && !/chrome/.test(navigator.userAgent.toLowerCase())){
        $('.list2>li>a,h5').addClass('defW');
    }
    
   $('.list1>li>a').attr('rel','appendix')
    .fancybox({
        'titlePosition': 'inside',
        'transitionIn': 'elastic',
    	'transitionOut': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true
    });      
    
   $('.list1.type3>li>a').attr('rel','appendix')
    .fancybox({
        'titlePosition': 'inside',
        'transitionIn': 'elastic',
    	'transitionOut': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true
    });    
    
    $(".gall_slider").jCarouselLite({
            btnNext: ".nextBtn",
            btnPrev: ".prevBtn",
            scroll:1,
            visible: 7,
            easing: 'easeOutExpo',
            speed: 700
    });
    
    function scroll_over(_shuttle){
        _shuttle.stop().animate({'backgroundColor':'#7c7c7c'},200,'easeOutExpo');
    };
    function scroll_out(_shuttle){
        _shuttle.stop().animate({'backgroundColor':'#292929'},500,'easeOutExpo');
    }    
    $('.scroll').cScroll({
        duration: 500,
        easing: 'easeOutExpo',
        step:'190px',
        hoverIn: scroll_over,
        hoverOut: scroll_out
    });
    
    $('.scroll_wide').cScroll({
        duration: 500,
        easing: 'easeOutExpo',
        step:'190px',
        trackCl: '_track_wide',        
        hoverIn: scroll_over,
        hoverOut: scroll_out

    });
    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});	
            hideSplashQ();	
        },
        actFu:function(_){            
            if(_.curr){
                if (_.n != 0){
                    showSplash()
                } else {
                    hideSplash();
                }
                _.curr
                    .css({'top':'700px','visibility':'visible'}).stop(true).delay(200).show().animate({'top':'0px'},{duration:700,easing:'easeInOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'top':'-700px'},{duration:700,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'visibility':'hidden'});
                            }
                        }
		              });
            }            
  		}
    });
    var defColor = $('#menu>li>a').eq(0).css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>strong',li).stop().animate({'height':'100%'},700,'easeOutCubic');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>strong',li).stop().animate({'height':'0'},1000,'easeOutCubic');
            }
        }
    })
    .navs(function(n){	
   	    $('#content').tabs(n);
   	});
    
    setTimeout(function(){
        $('#bgStretch').bgStretch({
    	   align:'leftTop',
           autoplay: false,
           navs:$('.pagin').navs({})
        })
        .sImg({
            sleep: 1000,
            spinner:$('<div class="spinner"></div>').css({opacity:.5}).stop().hide(3000)
        });
        var img=0;
        var num=$('.pagin li').length-1;
        $('.navbox p').text((img+1)+'/'+$('.pagin li').length);
    },0);
    
    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
}

$(window).resize(function (){
    if (content) content.stop().animate({'top':(windowH()-content.height())*.5-20},500,'easeOutCubic');
});

function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
}
listen("load", window, ON_LOAD);