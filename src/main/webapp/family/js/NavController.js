//控制导航按钮
function NavController(){
	
	
	
	this.init=function(){
		var ul=$("#youngor_navs"),li=$("#youngor_navs li"),i=li.length,n=i-1,r=160;
		ul.click(function(){
			$(this).toggleClass('active');
			
			if($(this).hasClass('active')){
				for(var a=0;a<i;a++){
					var x=(r*Math.cos(90/n*a*(Math.PI/180))).toFixed(2);
					var y=(-r*Math.sin(90/n*a*(Math.PI/180))).toFixed(2);
					//var aa=(r*Math.cos(90/n*a*(Math.PI/180)));
					li.eq(a).css({
						'transition-delay':""+(50*a)+"ms",
						'-webkit-transition-delay':""+(50*a)+"ms",
						'-o-transition-delay':""+(50*a)+"ms",
						//'-webkit-font-smoothing': 'antialiased',
						'transform':"translate("+x+"px,"+y+"px)",
						'-webkit-transform':"translate("+x+"px,"+y+"px)",
						'-o-transform':"translate("+x+"px,"+y+"px)",
						'-ms-transform':"translate("+x+"px,"+y+"px)",
					});
				}
			}else{
				li.removeAttr('style');
			}
		});
	}
}