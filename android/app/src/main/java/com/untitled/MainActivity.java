package com.untitled;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.support.v4.view.ViewCompat;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;import top.mcablylx.common.utils.StatusBarUtil;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     private static final int COLOR_DEFAULT = Color.parseColor("#20000000");


    @Override
    protected String getMainComponentName() {
        return "untitled";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        StatusBarUtil.setRootViewFitsSystemWindows(this,false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    Window window1 = getWindow();
                    // Translucent status bar
                    window1.setFlags(
                            WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS,
                            WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                }
        //setStatusBarColor(this,getResources().getColor(R.color.orange));
       /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                   View decorView = this.getWindow().getDecorView();
                   decorView.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
                       @Override
                       public WindowInsets onApplyWindowInsets(View v, WindowInsets insets) {
                           WindowInsets defaultInsets = v.onApplyWindowInsets(insets);
                           return defaultInsets.replaceSystemWindowInsets(
                                   defaultInsets.getSystemWindowInsetLeft(),
                                   0,
                                   defaultInsets.getSystemWindowInsetRight(),
                                   defaultInsets.getSystemWindowInsetBottom());
                       }

                   });
                   ViewCompat.requestApplyInsets(decorView);
               }
               */
    }
    public static void setStatusBarColor(Activity activity, int statusColor) {
            Window window = activity.getWindow();
            ViewGroup mContentView = (ViewGroup) activity.findViewById(Window.ID_ANDROID_CONTENT);

            if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT) {
                //First translucent status bar.
                window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
                    //After LOLLIPOP not translucent status bar
                    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                    //Then call setStatusBarColor.
                    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                    window.setStatusBarColor(statusColor);
                    //set child View not fill the system window
                    View mChildView = mContentView.getChildAt(0);
                    if (mChildView != null) {
                        ViewCompat.setFitsSystemWindows(mChildView, true);
                    }
                } else {
                    ViewGroup mDecorView = (ViewGroup) window.getDecorView();
                    if (mDecorView.getTag() != null && mDecorView.getTag() instanceof Boolean && (Boolean) mDecorView.getTag()) {
                        //if has add fake status bar view
                        View mStatusBarView = mDecorView.getChildAt(0);
                        if (mStatusBarView != null) {
                            mStatusBarView.setBackgroundColor(statusColor);
                        }
                    } else {
                        int statusBarHeight = getStatusBarHeight(activity);
                        //add margin
                        View mContentChild = mContentView.getChildAt(0);
                        if (mContentChild != null) {
                            ViewCompat.setFitsSystemWindows(mContentChild, false);
                            FrameLayout.LayoutParams lp = (FrameLayout.LayoutParams) mContentChild.getLayoutParams();
                            lp.topMargin += statusBarHeight;
                            mContentChild.setLayoutParams(lp);
                        }
                        //add fake status bar view
                        View mStatusBarView = new View(activity);
                        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, statusBarHeight);
                        layoutParams.gravity = Gravity.TOP;
                        mStatusBarView.setLayoutParams(layoutParams);
                        mStatusBarView.setBackgroundColor(statusColor);
                        mDecorView.addView(mStatusBarView, 0);
                        mDecorView.setTag(true);
                    }
                }
            } else if (Build.VERSION.SDK_INT == Build.VERSION_CODES.KITKAT) {
                Window _KITKATWindow = activity.getWindow();
                // Translucent status bar
                _KITKATWindow.setFlags(
                        WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS,
                        WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                int color = COLOR_DEFAULT;
                ViewGroup contentView = (ViewGroup) activity.findViewById(android.R.id.content);
                if (statusColor != -1) {
                    color = statusColor;
                }
                View statusBarView = new View(activity);
                ViewGroup.LayoutParams lp = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, getStatusBarHeight(activity));
                statusBarView.setBackgroundColor(color);
                contentView.addView(statusBarView, lp);
            }
        }

            //Get status bar height
            public static int getStatusBarHeight(Context context) {
                int result = 0;
                int resId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
                if (resId > 0) {
                    result = context.getResources().getDimensionPixelOffset(resId);
                }
                return result;
            }
}
