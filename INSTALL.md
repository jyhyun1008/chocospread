# Chocospread Wiki Installation Process

## 1. Fork the Chocospread Repository

![](https://for.stella.place/D1/34908398-1a80-4b84-afa9-03d93f58f915.png)

[Fork the Chocospread repository](https://github.com/jyhyun1008/chocospread/fork). Enter your desired name for the repository. If you're using GitHub Pages for the first time, it's a good idea to name it `(username).github.io`.

## 2. Modify the .env File

Modify the `.env` file located in the root directory of your forked repository.

```
# General Wiki Setting:
WIKI_TITLE = Your wiki title
FRONT_PAGE = Home page. The default is 'Home'.
WIKI_URL = The base domain of your wiki

# From your Google Spreadsheet URL:
SPREADSHEET = Google Spreadsheet ID

# From OAuth Client:
CLIENT_ID = OAuth 2.0 client ID

# From service account JSON file:
PRIVATE_KEY_ID = Service account Private Key ID
CLIENT_EMAIL = Service account email

# You need to put your PRIVATE_KEY from JSON file in Github secret.
```

Section 3 explains how to obtain the Google Spreadsheet ID, section 4 covers how to create an OAuth 2.0 Client ID, and section 5 explains how to download the service account JSON file.

Before that, fill in the first section, General Wiki Setting, with your values (no quotation marks, just the values).

## 3. Create a Google Spreadsheet

* [Create a Google Spreadsheet](http://docs.google.com/spreadsheets/u/0/create?usp=sheets_web). This link will use the Google account that is logged into your browser by default.
* Rename the file. It's easier to recognize later if you name it the same as the repository.
* Now, you'll see a URL in the address bar that looks like this:

```
https://docs.google.com/spreadsheets/d/{sheetId}/edit?gid=0#gid=0
```

* Copy the `{sheetId}` part and save it in the `SPREADSHEET` field.

## 4. Create an OAuth 2.0 Client ID

* Go to the [Google Cloud Console](console.cloud.google.com). If you don't have an account, you'll need to create one.
* Access the [API Dashboard](http://console.cloud.google.com/apis/dashboard).
* Click [Credentials](https://console.cloud.google.com/apis/credentials) from the left menu, or you can go directly via this link.
* Click [Configure consent screen](https://console.cloud.google.com/apis/credentials/consent).

![](https://for.stella.place/D1/02fe787d-a0cf-448f-8785-5623d217fffa.png)

* After creating everything, you should see a screen like this. Click **Publish App**.

![](https://for.stella.place/D1/58a8d527-39e3-4b9c-adff-77873e28d20a.webp)

* Go back to the [Credentials](https://console.cloud.google.com/apis/credentials) page. At the top, click `CREATE CREDENTIAL` and select `OAuth Client ID`.
* Configure it as shown below. Don't forget the `/signin/` in the `redirect URI`.

<img src="https://for.stella.place/D1/65869e7b-c942-462e-a593-79c1f850ec86.png" style="max-height: 500px;">

* Once saved, your Client ID will be generated. Copy and save it in the `CLIENT_ID` field.

## 5. Create a Service Account JSON File

* Go back to the [Credentials](https://console.cloud.google.com/apis/credentials) page. At the top, click `CREATE CREDENTIAL` and select `Service account`. Create a service account with minimal settings.
* After creation, go into the account, click the **KEY** tab, and generate a new key by selecting **ADD KEY - Create New Key**.

![](https://for.stella.place/D1/fb4f35c4-a459-4ee7-9aac-c44be6326031.webp)

* A JSON file will be automatically downloaded. Open the file and copy the `private_key_id` and `client_email`, then paste them into `PRIVATE_KEY_ID` and `CLIENT_EMAIL`. You can now commit (save) this `.env` file.
* For the `private_key`, you'll securely store it in the GitHub secret repository. In your repository, go to **Settings - Secrets and Variables - Actions** in the left menu.
* Click **New Repository Secret**. In the **Name** field, enter `PRIVATE_KEY`, and in the **Secret** field, copy and paste the `private_key` from the JSON file (be careful not to include quotation marks).
* Go back to your Google Spreadsheet, click **Share**, and give access to the `client_email` you just created. Allow the service account to access the spreadsheet.

## 6. Modify Other Files and Deploy

You can modify the theme color in the repository’s `static/css/main.css` file (and other things too!).

```
:root {
    --accent: (this part!!!);
    --bg: #f8f8f8;
    line-height: 1.6rem;
}
```

Now it's time to deploy.

* Go to the **Actions** tab in the repository. You’ll see a notification saying, "Workflows aren’t being run on this forked repository." Click the green button to enable the workflow.
* Go to **Deploy Nuxt site to Pages** and enable the workflow by clicking the **Enable Workflow** button.
* Click **Run Workflow** to start the workflow.
* Go to **Settings - Pages** in your repository, select **Build and deployment - Source - GitHub Actions**.
* You can link a custom domain in the **Custom domain** section.
* If you see a page like the one below when you visit your domain, congratulations! You've successfully deployed the site. Now, log in and create a home page. Keep in mind it may take about 10 minutes for the changes to reflect on the page (and clearing your cache might help).

![](https://for.stella.place/D1/d6f0c3d4-76b5-445c-abb4-325c0c25fb4b.png)