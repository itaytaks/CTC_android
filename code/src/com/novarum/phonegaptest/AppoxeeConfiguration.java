package com.novarum.phonegaptest;

public class AppoxeeConfiguration extends com.appoxee.Configuration  
{

	public AppoxeeConfiguration()
	{
		//"Application Appoxee SDK Key" from your Application Settings 
		SetAppSDKKey("5278d7a87a40f0.84063532");
		//"Application Appoxee Secret Key" from your Application Settings 
		SetAppSecretKey("5278d7a87a42e4.00110956");
		//If your app have an inbox, use true, if not, use false 
		SetAppoxeeInboxEnable(true);
		//This is the Activity which will be launch after your receive push notification or after the inbox is closed.
		SetAppDefaultActivityClass("com.novarum.phonegaptest.phonegaptest");
	}

}
