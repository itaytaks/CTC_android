package com.thebox.ctc;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.DownloadListener;


public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		
		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html", 10000);
		
		appView.setDownloadListener(new DownloadListener() 
        { 
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long size) 
            { 
                Intent viewIntent = new Intent(Intent.ACTION_VIEW); 
                viewIntent.setDataAndType(Uri.parse(url), mimeType); 
                try 
                { 
                    startActivity(viewIntent); 
                } 
                catch (ActivityNotFoundException ex) 
                { 
                    Log.w("YourLogTag", "Couldn't find activity to view mimetype: " + mimeType); 
                } 
            } 
        });
	}


}
