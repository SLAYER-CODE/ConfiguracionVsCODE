package com.apptesttypescripta3;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AppTestTypescriptA3";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  //  @Override
  // protected JSIModulePackage getJSIModulePackage() {
  //   return new ExampleJSIPackage(); // <-- el nombre de su paquete
  // }
}
