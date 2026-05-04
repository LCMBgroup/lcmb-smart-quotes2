# LCMB Smart Quotes - GitHub Pages Starter

This starter pack lets LCMB Group create branded quote landing pages using GitHub Pages without a developer.

## What this is

A simple static website for GitHub Pages with:

- a public quote centre landing page (`index.html`)
- a browser-based quote page generator (`quote-generator.html`)
- a demo quote page (`quotes/example-quote.html`)
- a ChatGPT prompt to help turn a ServiceM8 quote into page-ready copy (`prompt.md`)
- `robots.txt` and `noindex` tags to discourage search indexing

## Important privacy note

GitHub Pages is usually a public website. Do not publish sensitive customer details unless you are comfortable with that risk. For the first version, consider using first names only, suburb instead of full street address, and keep formal quote acceptance inside ServiceM8.

## Setup steps

1. Create a GitHub account or sign in.
2. Create a new repository called `lcmb-smart-quotes`.
3. Make the repository Public if you are using GitHub Free.
4. Upload all files from this folder into the repository.
5. Go to Settings -> Pages.
6. Under Build and deployment, choose: Deploy from a branch.
7. Select branch: `main`; folder: `/root`; click Save.
8. Wait a few minutes, then click Visit site.

Your site will look like:

`https://YOUR-GITHUB-USERNAME.github.io/lcmb-smart-quotes/`

Your example quote will look like:

`https://YOUR-GITHUB-USERNAME.github.io/lcmb-smart-quotes/quotes/example-quote.html`

## Optional custom domain

If you want `quotes.lcmbgroup.com.au`, add that custom domain in GitHub Pages settings, then add the required CNAME record at your domain/DNS provider. Do not upload `CNAME.example`; it is only a reminder file.

## How to create a quote page

1. In ServiceM8, create the quote as normal.
2. Copy the customer details, scope, line items, totals and payment terms.
3. Open `quote-generator.html` in your GitHub Pages site.
4. Fill in the form.
5. Click Preview Quote Page.
6. Click Download Quote HTML.
7. Upload the downloaded HTML file into the `quotes` folder in GitHub.
8. Wait a few minutes.
9. Open the URL and check the page.
10. Send the link to the customer from ServiceM8.

## ServiceM8 acceptance

Keep the official accept/approve process in ServiceM8. Use the ServiceM8 quote acceptance field `{document}` in your ServiceM8 email or SMS template. The GitHub quote page is the polished sales/proposal experience; ServiceM8 remains the source of truth for acceptance, booking, invoicing and job conversion.

## Files you may edit

- `assets/site.css`: visual styling for the site and generator
- `quote-generator.html`: the quote generator form
- `prompt.md`: the prompt you can paste into ChatGPT
- `index.html`: public quote centre landing page

## First live test

Before using this with real customers, do 5 dummy quotes using fake names and addresses. Check every link on mobile.
