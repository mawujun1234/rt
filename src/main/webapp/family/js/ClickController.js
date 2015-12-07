function ClickController(){
	this.objects=[];
	this.stack=[];//点击的栈
	this.outDuration=2000;
	this.backDuration=1000;
	this.last_index=-1;//最后一次被点击的序号
	this.element_init_css={
		width:120,
		height:160
	};//当卡牌被点击的时候，一个元素的初始css
	
	this.element_click_count=1;//判断元素的点击次数，是从弹出来后开始计算的，所以设置成1
	//this.isBacking=false;//有对象正在回退
	
	//当某个卡牌被点击弹出来的时候
	this.show=function(index){
		var self=this;
		//如果是第二次点击
		if(this.last_index==index){
			//this.rotateY180(index);
			
			if(this.element_click_count==2){
				this.showImage(this.last_index);
				this.element_click_count++;
			} else if(this.element_click_count==3){
				this.showVideo(this.last_index);
				this.element_click_count++;
			} else if(this.element_click_count==4){
				this.showReport(this.last_index);
				this.element_click_count++;
			} else {
				this.showReverseSide(this.last_index);
				this.element_click_count=2;
			}
			
			return;
		}
		this.last_index=index;
		
		this.back();//把上一次弹出的返回
		
		var obj=this.objects[index];
		var element=$(obj.element);
		if(!obj){
			return;
		}

		var cilck_div_orgin= {
			position:{},
			scale:{},
			object:null,
			backgroundColor:null,
			index:null
		};
		cilck_div_orgin.position.x=obj.position.x;
		cilck_div_orgin.position.y=obj.position.y;
		cilck_div_orgin.position.z=obj.position.z;
		cilck_div_orgin.scale.x=obj.scale.x;
		cilck_div_orgin.scale.y=obj.scale.y;
		cilck_div_orgin.scale.z=obj.scale.z;
		cilck_div_orgin.backgroundColor=element.css("background-color");
		
		cilck_div_orgin.index=index;
		cilck_div_orgin.object=obj;
		this.stack.push(cilck_div_orgin);
		//console.log(this.stack.length);
		
		var move_obj=new TWEEN.Tween(obj.position )
				.to( {x:controls.object.position.x,y:controls.object.position.y,z:5}, this.outDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
			
		var scale_obj=new TWEEN.Tween( obj.scale )
				.to( { y: 2,x:2 }, this.outDuration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.onStart( function () {
					element.css("background-color","rgba(0, 127, 127, 0.9)")
				});
		//move_obj.chain(scale_obj);	
		move_obj.start();
		scale_obj.start();
	}
	//把弹出来的卡牌弹回去
	this.back=function(){
		this.element_click_count=1;
		var lasted=this.stack.pop();
		if(!lasted){
			return;
		}
		var obj=lasted.object;
		var element=$(obj.element);
		//console.log(obj.position);
		//console.log(lasted.position);
		var move_obj=new TWEEN.Tween(obj.position )
				.to( lasted.position, this.backDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
			
		var scale_obj=new TWEEN.Tween( obj.scale )
				.to( lasted.scale,  this.backDuration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.onComplete( function () {
					element.css("background-color",lasted.backgroundColor)
				});
				
		this.hideReverseSide(lasted.index);
		//move_obj.chain(scale_obj);	
		move_obj.start();
		scale_obj.start();
	}
	
	//第二次点击时，把反面显示出来
	this.showReverseSide=function(index){
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
		element.children().not(element_reverse_side).slideUp();
		element_reverse_side.slideDown();

		element.animate({
			width:"450px",
			height:"500px"
		});
		element_reverse_side.html("展示该门店的信息，报表，照片等等,请大家集思广益吧。当然也可以用于其他用处。<span color='red'>多点几下会进行切换哦</span>!!!!!")
	}
	this.hideReverseSide=function(index){
		
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
		element.children().not(element_reverse_side).slideDown();
		element_reverse_side.slideUp();	
	
		element.animate({
			width:this.element_init_css.width,
			height:this.element_init_css.height
		})
	}
	this.showImage=function(index){
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
		element_reverse_side.html("<image src='./test.jpg'>")
	}
	this.showVideo=function(index){
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
		element_reverse_side.html("<video autoplay='true' src='./movie.ogg' controls='controls'>你的浏览器不支持播放视频!</video>")
	}
	this.showReport=function(index){
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
		element_reverse_side.css("width",450);
		element_reverse_side.css("height",500)
		//element_reverse_side.html("<image src='./test.jpg'>")
		var myChart = echarts.init(element_reverse_side.get());
        var option = {
			title : {
				text: '未来一周气温变化'
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:['最高气温','最低气温']
			},
	
			calculable : true,
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value',
					axisLabel : {
						formatter: '{value} °C'
					}
				}
			],
			series : [
				{
					name:'最高气温',
					type:'line',
					data:[11, 11, 15, 13, 12, 13, 10],
					markPoint : {
						data : [
							{type : 'max', name: '最大值'},
							{type : 'min', name: '最小值'}
						]
					},
					markLine : {
						data : [
							{type : 'average', name: '平均值'}
						]
					}
				},
				{
					name:'最低气温',
					type:'line',
					data:[1, -2, 2, 5, 3, 2, 0],
					markPoint : {
						data : [
							{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
						]
					},
					markLine : {
						data : [
							{type : 'average', name : '平均值'}
						]
					}
				}
			]
		};
                    
        myChart.setOption(option);
	}
	//旋转180度，就是翻转
	this.rotateY180=function(index){
		var obj=this.objects[index];
		var element=$(obj.element);
		var element_reverse_side=element.children().last();
//		var half_pi=0.5*Math.PI;
//		var last_current_pi_sub=0;
//		//console.log($(obj.element).css("background-color","rgba(0, 127, 127, 1)"));
//		//alert("将会旋转180度，展示该门店的信息，报表，视频，店长照片等等");
//		var to_180_first=new TWEEN.Tween( obj.rotation )
//			.to( { y: 1*Math.PI }, 1000 )
//			.easing( TWEEN.Easing.Exponential.InOut )
//			.onUpdate(function(){
//				if(this.y-half_pi>0 && last_current_pi_sub<=0) {
//					console.log("1111");
//					element.children().hide();
//					element_reverse_side.show();
//					console.log(element_reverse_side.css("display"));
//				}
//				last_current_pi_sub=this.y-half_pi;
//				
//				
//			});
//			to_180_first.start();
//console.log(obj.rotation)
		var to_180_first=new TWEEN.Tween( obj.rotation )
			.to( { y: 0.5*Math.PI }, 1000 )
			.easing( TWEEN.Easing.Exponential.InOut )
			.onComplete(function(){
				element.children().toggle();
				//element_reverse_side.show();
				//console.log(obj.rotation)
				var to_180_second=new TWEEN.Tween( obj.rotation )
					.to( { y: 0 }, 1000 )
					.easing( TWEEN.Easing.Exponential.InOut )
					.onComplete(function(){
						//console.log(obj.rotation)
					}).start();
				
			});
		to_180_first.start();


	}
	
}