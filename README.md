# Chocospread Wiki

> A cute and small-scale wiki for small groups and documents

## A Free-to-Run Wiki

Set up your wiki using **GitHub Pages** and store your data in **Google Spreadsheets**.

Chocospread Wiki is recommended to deploy using the GitHub Pages feature through GitHub Actions. Using it as a static page rather than uploading it to a server is faster...

## Document Search

You can search for documents in the wiki using the search feature at the top right. If you try to access a document that doesn't exist, a `404` page will be displayed.

## Login

Click the user icon at the top right to log in using your Google account. However, if you don't have access to the Google Spreadsheet itself, there won't be much difference in functionality. If your account has access, you can edit and create documents.

## Editing

![](https://for.stella.place/D1/9c5b19ae-ad3e-450c-9071-811aa90d559e.webp)

You can access the document editing page by clicking the `Edit` button at the bottom of the document.

The edits will be reflected in the Google Spreadsheet as soon as they are completed, but since you need to wait for the GitHub Action to run, there will be a delay of 5 to 10 minutes before the changes appear on the wiki. It's recommended to copy your content beforehand and edit all at once.

## Editing History

![](https://for.stella.place/D1/03743c70-90a8-46d6-b66a-6f6d232fd2b9.webp)

You can access the history page by clicking the `History` button at the bottom of the document.

Here, you can view and manage the history of the created documents. It's also possible to revert to previous versions whenever needed.

## Regarding the Exposure of Google Spreadsheet IDs

The Google Spreadsheet ID is taken from the shareable link, so it has the same effect as sharing the spreadsheet within the group.

Therefore, invited users can access the original spreadsheet directly using the spreadsheet ID and edit its content. If any misuse occurs, you can recover the original content using the version management feature within Google Spreadsheets and take action against the user accordingly.

## About Document Creation

The current version does not yet support document creation, so we recommend creating documents directly in the spreadsheet.