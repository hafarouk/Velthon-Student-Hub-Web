package com.velthon.studenthub;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

/** Open the shared Hub in the user's browser profile, including its encrypted offline vault. */
public final class HubActivity extends Activity {
    private static final Uri HUB = Uri.parse("https://hafarouk.github.io/Velthon-Student-Hub-Web/");

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        Intent tab = new Intent(Intent.ACTION_VIEW, HUB);
        Bundle extras = new Bundle();
        extras.putBinder("android.support.customtabs.extra.SESSION", null);
        tab.putExtras(extras);
        tab.putExtra("android.support.customtabs.extra.TOOLBAR_COLOR", 0xff193650);
        try {
            startActivity(tab);
            finish();
        } catch (ActivityNotFoundException unavailable) {
            new AlertDialog.Builder(this)
                .setMessage("Install or enable a web browser to open VELTHON Student Hub.")
                .setPositiveButton(android.R.string.ok, (dialog, which) -> finish())
                .setOnCancelListener(dialog -> finish()).show();
        }
    }
}
