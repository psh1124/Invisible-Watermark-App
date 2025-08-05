package com.hackertonapp;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // 반드시 있어야 함
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // 이것도 있어야 함
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "hackertonapp"; // ✅ 앱 이름 정확히 입력
  }
}
