<div align="center">

[![TrustScanner](https://raw.githubusercontent.com/Suchti18/TrustScanner/main/.github/banner.svg)](#TrustScanner)

</div>

# TrustScanner

A Tampermonkey userscript that checks websites for dangerous categories (malware, phishing) and displays a warning banner if a threat is detected.

The script queries the current domain via the FishFish API: [https://fishfish.gg/](https://fishfish.gg/).

## Usage

- Install an extension for userscripts like Tampermonkey: [https://www.tampermonkey.net/](https://www.tampermonkey.net/).
- Install the script in Tampermonkey: [https://greasyfork.org/en/scripts/540218-trustscanner](https://greasyfork.org/en/scripts/540218-trustscanner).
- Make sure to allow the permission for `cross-origin resource` in Tampermonkey settings.
- If the site is flagged, a red warning banner appears at the top of the page.

> [!NOTE]
> If a Website was not found in the FishFish Database and you think its dangerous? Visit https://fishfish.gg/ to report it.

## Example

[![TrustScanner example](https://raw.githubusercontent.com/Suchti18/TrustScanner/main/.github/TrustScannerExample.png)](#Usage)
Here is a list of all flagged websites: https://api.fishfish.gg/v1/domains

## AI

This project was developed with AI assistance in following areas:
* Debugging 
* README creation.