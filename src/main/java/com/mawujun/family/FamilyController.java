package com.mawujun.family;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FamilyController {
	@RequestMapping("/family/getShop.do")
	public List<ShopInfo> getShop(){
		List<ShopInfo> list=new ArrayList<ShopInfo>(0);
		for (int i=0;i<100;i++){
			ShopInfo info=new ShopInfo();
			info.setCode("code"+i);
			info.setShopnm("展销中心");
			info.setDetails("展销中心");
			info.setRanking(i);
			info.setCol(i%20+1);
			info.setRow(i/20+1);
			
			info.setNum(new Double((Math.random()*400)+"").intValue());
			info.setMoney(Math.ceil(Math.random()*1000*100)/100);
			
			list.add(info);
		}
		return list;
	}

}
