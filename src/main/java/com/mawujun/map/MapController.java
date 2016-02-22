package com.mawujun.map;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

@Controller
public class MapController {
	private JSONObject coord_shop=null;
	private JSONObject coord_regn=null;
	
	public void initCoord_shop(HttpServletRequest request) throws IOException{
		String path=request.getSession().getServletContext().getRealPath("/");
		File file=new File(path+"map"+File.separator+"shopGeoCoord.json");
		BufferedReader reader=new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
		
		StringBuilder builder=new StringBuilder();
		String s;
		while((s=reader.readLine())!=null) {
			builder.append(s);
		} 
		reader.close();
		
		coord_shop=JSON.parseObject(builder.toString());
		
		
		
	}
	public void initCoord_regn(HttpServletRequest request) throws IOException {
		String path=request.getSession().getServletContext().getRealPath("/");
		// 初始化regn的json
		StringBuilder builder = new StringBuilder();
		File file = new File(path + File.separator + "map" + File.separator + "regnGeoCoord.json");
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
		builder = new StringBuilder();
		String s;
		while ((s = reader.readLine()) != null) {
			builder.append(s);
		}
		reader.close();
		coord_regn = JSON.parseObject(builder.toString());
	}
	
	@RequestMapping("/map/geoCoord_shop.do")
	public void geoCoord_shop(HttpServletRequest request,Model model) throws IOException{
		if(coord_shop==null){
			initCoord_shop(request);
		}
		//编辑哪些店铺显示在网页上
		Set<Entry<String,Object>> array=coord_shop.entrySet();
		List<Map<String,Object>> shopData_makepoint=new ArrayList<Map<String,Object>>();
		int i=0;
		for(Entry<String,Object> entry:array){
			Map<String,Object> makepoint=new HashMap<String,Object>();
			makepoint.put("name", entry.getKey());
			makepoint.put("value", i);
			shopData_makepoint.add(makepoint);
			i++;
		}

		model.addAttribute("shopData_makepoint", shopData_makepoint);
		model.addAttribute("shopData_geoCoord", coord_shop);
		//return coord_shop;
		
	}
	
	
	@RequestMapping("/map/geoCoord_regn.do")
	public void geoCoord_regn(HttpServletRequest request,Model model) throws IOException{
		if(coord_regn==null){
			initCoord_regn(request);
		}
		//编辑哪些店铺显示在网页上
		Set<Entry<String,Object>> array=coord_regn.entrySet();
		int i=0;
		List<Map<String,Object>> regnData_makepoint=new ArrayList<Map<String,Object>>();
		List<List<Map<String,Object>>> regnData_makeline=new ArrayList<List<Map<String,Object>>>();
		Map<String,Object> makepoint_start=new HashMap<String,Object>();
		makepoint_start.put("name", "宁波");
		for(Entry<String,Object> entry:array) {
			//builder.append("{name:'"+entry.getKey()+"',value:"+i+"}");
			Map<String,Object> makepoint=new HashMap<String,Object>();
			makepoint.put("name", entry.getKey());
			makepoint.put("value", i);
			regnData_makepoint.add(makepoint);
        	
			List<Map<String,Object>> aa=new ArrayList<Map<String,Object>>();
			aa.add(makepoint_start);
			aa.add(makepoint);
			regnData_makeline.add(aa);
        	i++;
		}
		model.addAttribute("regnData_makepoint", regnData_makepoint);
		model.addAttribute("regnData_makeline", regnData_makeline);
		model.addAttribute("regnData_geoCoord", coord_regn);
		
		//return coord_regn;
	}
	
	
	
	@RequestMapping("/map/getShopGeoCoord.do")
	public void getShopGeoCoord(HttpServletRequest request,Model model) throws IOException{
		if(coord_shop==null) {
			initCoord_shop(request);
		}
		//编辑哪些店铺显示在网页上
		Set<Entry<String,Object>> array=coord_shop.entrySet();
		List<Map<String,Object>> shopData_makepoint=new ArrayList<Map<String,Object>>();
		int i=0;
		for(Entry<String,Object> entry:array){
			Map<String,Object> makepoint=new HashMap<String,Object>();
			makepoint.put("name", entry.getKey());
			makepoint.put("value", i);
			makepoint.put("geoCoord", entry.getValue());
		
			shopData_makepoint.add(makepoint);
			i++;
		}

		model.addAttribute("shopData_makepoint", shopData_makepoint);
		//model.addAttribute("shopData_geoCoord", coord_shop);
		//return coord_shop;
		
		
		if(coord_regn==null){
			initCoord_regn(request);
		}
		//编辑哪些店铺显示在网页上
		Set<Entry<String,Object>> array_regn=coord_regn.entrySet();
		List<Map<String,Object>> regnData_makepoint=new ArrayList<Map<String,Object>>();
		i=0;
		for(Entry<String,Object> entry:array_regn) {
			//builder.append("{name:'"+entry.getKey()+"',value:"+i+"}");
			Map<String,Object> makepoint=new HashMap<String,Object>();
			makepoint.put("name", entry.getKey());
			makepoint.put("value", i);
			makepoint.put("geoCoord", entry.getValue());
			regnData_makepoint.add(makepoint);
        	
        	i++;
		}
		model.addAttribute("regnData_makepoint", regnData_makepoint);
		
	}
	


}
