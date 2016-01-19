function Helpman(){

	this.tooltip=null;
	this.tooltip_inner=null;
	this.youngor_help=null;
	this.is_showing_helpman=true;//判断现在显示的是小人 还是二维码
	this.tooltip_msgs=[
		{content:"点我呀!让你看看我的真身!&nbsp;&nbsp;^_^",duration:2000},
		{content:"点击‘表格型’，‘球型’,'螺旋形'按钮会还原到初始状态!&nbsp;&nbsp;^_^",duration:2000},
		{content:"通过左键进行旋转，右键进行拖拉，滚轮进行放大缩小!",duration:4000}
	];
	//初始化可以拖动的元素
	this.initDrag=function(){
		var self=this;
		
		this.youngor_help= $('#youngor_help');
		this.tooltip= $('#youngor_help .tooltip');
		this.tooltip_inner=$("#youngor_help .tooltip-inner");
		
		$(document).mousemove(function(e) {
			if(!!this.move) {
				var posix = !document.move_target ? {
						x: 0,
						y: 0
					} : document.move_target.posix,
					callback = document.call_down || function() {
						$(this.move_target).css({
							top: e.pageY - posix.y,
							left: e.pageX - posix.x
						});
					};
	
				callback.call(this, e, posix);
			}
		}).mouseup(function(e) {
			if(!!this.move) {
				var callback = document.call_up || function() {};
				callback.call(this, e);
				$.extend(this, {
					move: false,
					move_target: null,
					call_down: false,
					call_up: false
				});
			}
		});
		

		this.youngor_help.mousedown(function(e) {
			var offset = $(this).offset();
			this.posix = {
				x: e.pageX - offset.left,
				y: e.pageY - offset.top
			};
			$.extend(document, {
				move: true,
				move_target: this
			});
			//console.log(1);
			self.youngor_help.clikDate=(new Date()).getTime();
			self.youngor_help.is_moving_helpman=false;
			
		}).mouseup(function(e) {
			//判断是点击还是拖拉鼠标
			if((new Date()).getTime()-self.youngor_help.clikDate>200){
				self.youngor_help.is_moving_helpman=true;
			}
		});
		
		this.youngor_help.click(function(e){	
			if(self.youngor_help.is_moving_helpman){
				return;
			}
			//alert($(this).css("background-image"));
			self.toggleHelpmanImage(self);
		});
		
		self.showTips("点我呀!让你看看我的真身!&nbsp;&nbsp;^_^",3000);
		var tooltip_msgs_length=this.tooltip_msgs.length;
		setInterval(function(){
			//如果正在显示，就直接退出了
			if(self.tooltip.is_showing){
				return;
			}
			if(self.is_showing_helpman){
				var index=parseInt(Math.random()*tooltip_msgs_length);
				var msg=self.tooltip_msgs[index];
				self.showTips(msg.content,msg.duration);
			} else {
				self.showTips("我有点害羞了，快点我让我变回人形吧!&nbsp;&nbsp;^_^",3000);
			}
		},10000);	
		
		this.initPadDrag();
	}
	//在触摸屏上进行拖动的时候，初始化的内容
	this.initPadDrag=function(){
		/*单指拖动*/
		var obj = document.getElementById('youngor_help');
		//this.youngor_help.get(0).on('touchmove',function(event) {
		obj.addEventListener('touchmove', function(event) {
			 // 如果这个元素的位置内只有一个手指的话
			if (event.targetTouches.length == 1) {
		　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = event.targetTouches[0];
				// 把元素放在手指所在的位置
				obj.style.left = touch.pageX-50 + 'px';
				obj.style.top = touch.pageY-50 + 'px';
				}
		}, false);
	}
	//显示一些自言自语的信息
	this.toggleHelpmanImage=function(self){
		var self=self?self:this;
		if(self.is_showing_helpman){
			//self.showTips("点我呀!让你看看我的真身!&nbsp;&nbsp;^_^",2000);
			self.youngor_help.css("background-image", "url('./images/qrcode.png')");
			self.youngor_help.animate({
				width:80,
				height:80	
			});
			self.is_showing_helpman=false;
		} else {
			//self.showTips("我会害羞的，点我让我变回人形!&nbsp;&nbsp;^_^",2000);
			self.youngor_help.css("background-image", "url('./images/help_man.png')");
			self.youngor_help.animate({
				width:58,
				height:58	
			});
			self.is_showing_helpman=true;
		}
		
	}
	//在小人上显示帮助提示信息
	this.showTips=function(msg,delay){
		var self=this;
		var html='';
		self.tooltip.is_showing=true;	
		this.tooltip_inner.html(msg);
		this.tooltip.fadeIn( 1000 ).delay(delay?delay:2000).fadeOut( 1000,function(){
			self.tooltip.is_showing=false;	
		});
		//this.tooltip.delay("slow").hide();
		
	}
	
}