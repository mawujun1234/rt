(function () {
    require.config({
        paths: {
            echarts: '../echarts-2.2.7/build/dist'
        }
        ,packages: [
            {
                name: 'BMap',
                location: '.',
                main: 'main'
            }
        ]
    });
	
	window.shopData_geoCoord=null;	
	window.regnData_geoCoord= null;
	window.init_obj={
		shopData_geoCoord:null,
		shopData_makepoint:null,
		regnData_geoCoord:null,
		regnData_makeline:null,
		regnData_makepoint:null
	};
	window.init_index=0;
	$.getJSON("/map/geoCoord_shop.do",function(result){
		
		window.init_obj.shopData_geoCoord=result.shopData_geoCoord;
		window.init_obj.shopData_makepoint=result.shopData_makepoint;
		window.init_index++;
		
		//console.log(window.init_obj.shopData_geoCoord);
		
		if(window.init_index==2){
			show();
		}
	});
	$.getJSON("/map/geoCoord_regn.do",function(result){
		
		window.init_obj.regnData_geoCoord=result.regnData_geoCoord;
		//console.log(window.init_obj.regnData_geoCoord);
		window.init_obj.regnData_makeline=result.regnData_makeline;
		window.init_obj.regnData_makepoint=result.regnData_makepoint;
		window.init_index++;
		
		//
		if(window.init_index==2){
			show();
		}
	});
function show(){
    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {
		//alert(window.init_obj.shopData_makepoint);
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });

        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 118.885654,//104.703318,
            y: 35.635474
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 5);
        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        map.setMapStyle({
            styleJson: [
                  {
                       "featureType": "water",
                       "elementType": "all",
                       "stylers": {
                            "color": "#044161"
                       }
                  },
                  {
                       "featureType": "land",
                       "elementType": "all",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#064f85"
                       }
                  },
                  {
                       "featureType": "railway",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "labels",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#00508b"
                       }
                  },
                  {
                       "featureType": "poi",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "green",
                       "elementType": "all",
                       "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "subway",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "manmade",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "local",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "labels",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#029fd4"
                       }
                  },
                  {
                       "featureType": "building",
                       "elementType": "all",
                       "stylers": {
                            "color": "#1a5787"
                       }
                  },
                  {
                       "featureType": "label",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  }
            ]
        });
		
		

        option = {
            color: ['gold','aqua','lime'],
            title : {
                text: '货品迁徙，销售(实时销售,实时物流单据)',
                subtext:'数据纯属虚构',
                x:'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function (v) {
					//console.log(v[1]);
                    return v[1].replace(':', ' > ');
                }
            },
//            legend: {
//                orient: 'vertical',
//                x:'left',
//                data:['北京', '上海', '广州'],
//                selectedMode: 'single',
//                selected:{
//                    '上海' : false,
//                    '广州' : false
//                },
//                textStyle : {
//                    color: '#fff'
//                }
//            },
//            toolbox: {
//                show : true,
//                orient : 'vertical',
//                x: 'right',
//                y: 'center',
//                feature : {
//                    mark : {show: true},
//                    dataView : {show: true, readOnly: false},
//                    restore : {show: true},
//                    saveAsImage : {show: true}
//                }
//            },
//            dataRange: {//过滤掉界面上一定范围的数值，例如销售大于多少的，就在假面上进行展示
//                min : 0,
//                max : 100,
//                x: 'right',
//                calculable : true,
//                color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
//                textStyle:{
//                    color:'#fff'
//                }
//            },
            series : [
                {
                    name:'全国',
                    type:'map',
                    mapType: 'none',
                    data:[],
					geoCoord:window.init_obj.shopData_geoCoord,//{'九江九方':[115.84203547109,29.640229926977]},
                    markPoint : {
                        //symbol:'pin',
                        symbolSize : 3,
						large:true,
                        effect : {
                            show: false,
                            shadowBlur : 0
                        },
                        itemStyle:{
							
                            normal:{
								color:"yellow",
                                label:{show:false}
                            }
                        },
                        data :window.init_obj.shopData_makepoint
                    }

                }
                ,
				{
					name:'仓库或分公司',
                    type:'map',
                    mapType: 'none',
                    data:[],
					geoCoord:window.init_obj.regnData_geoCoord,
					markLine : {
                        smooth:true,
                        effect : {
                            show: false,
                            scaleSize: 1,
                            period: 30,
                            color: '#fff',
                            shadowBlur: 10
                        },
                        itemStyle : {
                            normal: {
								label:{show:false},
                                borderWidth:1,
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 10
                                }
                            }
                        },
                        data : window.init_obj.regnData_makeline
                    },
                    markPoint : {
                        symbol:'pin',
                        symbolSize :3,
                        effect : {
                            show: false,
                            shadowBlur : 0
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : window.init_obj.regnData_makepoint
                    }
				}
                ,{
                    name:'炫光series',
                    type:'map',
                    mapType: 'none',
                    data:[],
                    markLine : {
                        smooth:true,
                        effect : {
                            show: true,
                            scaleSize: 4,
							loop: false,
                            period: 20,
                            color: '#fff',
                            shadowBlur: 10
                        },
                        itemStyle : {
                            normal: {
                                borderWidth:1,
								label:{show:false},
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 10
                                }
                            }
                        },
                        data : [
                            [{name:'宁波'},{name:'长春',value:95}],
							[{name:'宁波'},{name:'包头',value:95}],
							[{name:'宁波'},{name:'拉萨',value:95}],
							[{name:'宁波'},{name:'长沙',value:95}]
                        ]
                    },
                    markPoint : {
                        symbol:'emptyCircle',
                        symbolSize : function (v){
                            return 10 + v/10
                        },
                        effect : {
                            show: true,
                            shadowBlur : 5
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : [
                           // {name:'水晶梦店_特卖',value:95}
                        ]
                    }	
				}
            ]
        };

        var myChart = BMapExt.initECharts(container);
        BMapExt.setOption(option);
		
		window.shopNames=[];
//		setInterval(function(){
//			//删除标注
//			for(var i=0;i<window.shopNames.length;i++){
//				myChart.delMarkPoint(2,window.shopNames[i].name)
//			}
//			window.shopNames=[];
//			
//			
//			var randoms=[];
//			for(var i=0;i<5;i++){
//				var random=parseInt(Math.random()*3000+1);
//				randoms.push(random);
//			}
//			
//			var index=0;
//			var name=null;
//			for (x in window.init_obj.shopData_geoCoord)  
//			{ 
//				for(var i=0;i<randoms.length;i++){
//					if(index==randoms[i]){
//						var shop={
//							name:x,
//							value:1
//						}
//						window.shopNames.push(shop);
//					} 
//				}
//				
//				index++;
//			}  
//			//alert(name);
//			
//			//添加一个实时销售
//			myChart.addMarkPoint(2,{
//            	data : window.shopNames
//             });
//
//		},5000);
//		
//		window.markLines=[];
//		setInterval(function(){
//			 //============================================
//			 //添加一个实时物流单据
//			 //删除标注
//			for(var i=0;i<window.markLines.length;i++){//北京 > 上海
//				myChart.delMarkLine(2,window.markLines[i][0].name+" > "+window.markLines[i][1].name)
//			}
//			window.markLines=[];
//			var random=parseInt(Math.random()*20);
//			var index=0;
//			var name=null;
//			for (x in window.init_obj.regnData_geoCoord)  
//			{ 
//				if(index==random){
//					name=x;
//					break;
//				} 
//				index++;
//			}  
//			var line=[{name:'宁波'},{name:name,value:95}]
//			window.markLines.push(line);
//			myChart.addMarkLine(2,{
//            	data : window.markLines
//            });
//			
//			 
//		},10000);
		
    }
	
);//require
}//show
})();