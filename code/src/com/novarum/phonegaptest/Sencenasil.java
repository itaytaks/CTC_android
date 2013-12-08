package com.novarum.phonegaptest;

import android.app.Application;

import com.appoxee.Appoxee;

public class Sencenasil extends Application 
{
	
	@Override
	public void onCreate()
	{
	  super.onCreate();
	  Appoxee.Setup(this, new AppoxeeConfiguration());
	}
	
	

}
