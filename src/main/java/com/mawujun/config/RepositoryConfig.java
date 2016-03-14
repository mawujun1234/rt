package com.mawujun.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.hibernate.SessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;

import com.alibaba.druid.pool.DruidDataSource;
import com.mawujun.repository.hibernate.MyH2Dialect;


@Configuration
@ComponentScan("com.mawujun")
public class RepositoryConfig {
	
	@Bean(name="sqlSessionFactory")
	public SqlSessionFactory getSqlSessionFactory() throws Exception{
		SqlSessionFactoryBean sqlSessionFactoryBean=new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(getDataSource());
		
		return sqlSessionFactoryBean.getObject();
	}
	
	@Bean
	public DataSource getDataSource(){
		//https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_DruidDataSource%E5%8F%82%E8%80%83%E9%85%8D%E7%BD%AE
		DruidDataSource datasource=new DruidDataSource();
		datasource.setDriverClassName("org.h2.Driver");
		datasource.setUrl("jdbc:h2:mem:BaseProject;DB_CLOSE_DELAY=-1;MVCC=TRUE");
		datasource.setUsername("sa");
		datasource.setPassword("");
		
		
		return datasource;
	}
	
	@Bean
	public MapperScannerConfigurer getMapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer=new MapperScannerConfigurer();
		mapperScannerConfigurer.setBasePackage("com.mawujun");
		mapperScannerConfigurer.setAnnotationClass(org.springframework.stereotype.Repository.class);
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
		return mapperScannerConfigurer;
	}
	
	@Bean
	public SessionFactory getLocalSessionFactoryBean(){
		LocalSessionFactoryBean localSessionFactoryBean=new LocalSessionFactoryBean();
		localSessionFactoryBean.setDataSource(getDataSource());
		localSessionFactoryBean.setPackagesToScan("com.mawujun");
		
		Properties hibernateProperties=new Properties();
		hibernateProperties.put("hibernate.hbm2ddl.auto", "update");
		hibernateProperties.put("hibernate.dialect", MyH2Dialect.class.getName());
//		hibernateProperties.put("", );
//		hibernateProperties.put("", );
//		hibernateProperties.put("", );
//		hibernateProperties.put("", );
		localSessionFactoryBean.setHibernateProperties(hibernateProperties);
		
		return (SessionFactory)localSessionFactoryBean.getObject();
	}

}
