package com.mawujun.family;

public class ShopInfo {
	private String code;
	private String shopnm;
	private String details;
	private Integer ranking;
	private Integer col;
	private Integer row;
	
	private Integer num;
	private Double money;
	public String getShopnm() {
		return shopnm;
	}
	public void setShopnm(String shopnm) {
		this.shopnm = shopnm;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}

	public Integer getCol() {
		return col;
	}
	public void setCol(Integer col) {
		this.col = col;
	}
	public Integer getRow() {
		return row;
	}
	public void setRow(Integer row) {
		this.row = row;
	}
	public Integer getRanking() {
		return ranking;
	}
	public void setRanking(Integer ranking) {
		this.ranking = ranking;
	}
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

}
