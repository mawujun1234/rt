$(function(){
	showMap();
	
	
	
});
function showMap() {
	window.map = new BMap.Map('map_canvas');
	
//	var centerPoint= new BMap.Point(48,48)
//	map.centerAndZoom("宁波", 14); 
	map.setMapStyle({style:'light'});
	
	map.enableScrollWheelZoom();
	map.centerAndZoom(new BMap.Point(104.703318, 37.698382), 6);
}