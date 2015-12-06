function ClickController(){
	this.objects=[];
	this.stack=[];//点击的栈
	this.outDuration=2000;
	this.backDuration=1000;
	this.last_index=-1;//最后一次被点击的序号
	//this.isBacking=false;//有对象正在回退
	
	//当某个卡牌被点击的时候
	this.show=function(index){
		var self=this;
		if(this.last_index==index){
			this.rotateY180(index);
			return;
		}
		this.last_index=index;
		
		this.back();//把上一次弹出的返回
		
		var obj=this.objects[index];
		if(!obj){
			return;
		}

		var cilck_div_orgin= {
			position:{},
			scale:{},
			object:null
		};
		cilck_div_orgin.position.x=obj.position.x;
		cilck_div_orgin.position.y=obj.position.y;
		cilck_div_orgin.position.z=obj.position.z;
		cilck_div_orgin.scale.x=obj.scale.x;
		cilck_div_orgin.scale.y=obj.scale.y;
		cilck_div_orgin.scale.z=obj.scale.z;
		cilck_div_orgin.object=obj;
		this.stack.push(cilck_div_orgin);
		console.log(this.stack.length);
		
		var move_obj=new TWEEN.Tween(obj.position )
				.to( {x:controls.object.position.x,y:controls.object.position.y,z:5}, this.outDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
			
		var scale_obj=new TWEEN.Tween( obj.scale )
				.to( { y: 2,x:2 }, this.outDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
//				.onComplete( function () {
//					
//				});
		//move_obj.chain(scale_obj);	
		move_obj.start();
		scale_obj.start();
	}
	//私有方法
	this.back=function(){
		var lasted=this.stack.pop();
		if(!lasted){
			return;
		}
		var obj=lasted.object;
		//console.log(obj.position);
		//console.log(lasted.position);
		var move_obj=new TWEEN.Tween(obj.position )
				.to( lasted.position, this.backDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
			
		var scale_obj=new TWEEN.Tween( obj.scale )
				.to( lasted.scale,  this.backDuration )
				.easing( TWEEN.Easing.Exponential.InOut );
				//.onUpdate( function () {
					//self.isRunning=false;
				//});
		//move_obj.chain(scale_obj);	
		move_obj.start();
		scale_obj.start();
	}
	//旋转180度，就是翻转
	this.rotateY180=function(index){
		var obj=this.objects[index];
		alert("将会旋转180度，展示该门店的信息，报表，视频，店长照片等等");
	}
	
}