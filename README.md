<p align="center">
    <img src="https://github.com/user-attachments/assets/efac0f50-a466-4474-b58f-70d6bd08a0d4">

# Lectio ++
A Lectio extension that improve the QOL of Lectio. This extension focuses on having a stable codebase to avoid random errors while still including the same features as other similar extensions. Any feature not present can be requested through a issue ticket marked as enhancement [here](https://github.com/silasm01/LectioPP/issues).

## Features
* Wide Lectio.
* Custom assignment filters.
* Assignment countdown w/ indicating colors.
* Reversable assignment list.
* Settings page to customize features.
* Solid startup script to ensure stability.
* More.

# Getting started
> ⚠️ Note: This extension is currently not available on any extension store as they either charge you money or have a two-factor in place that does not work. It might be added later but for now there will be instructions below to manually add it to Chrome and Firefox.

To get started you need to download the source. This can be done through git:
```
git clone https://github.com/silasm01/LectioPP
```
The next steps are different dependent on browser. 
## Chrome
Any chrome or chromium based browser should be able to be added by following some easy steps. 
The first step is to access the extension page and enabling the developer tools at the top. 

Next step is to click on the Load Unpacked button at the top and selecting the Lectio++ folder. Here it is important not to select the manifest or any sub file/folder but the main topmost folder.
After this step the extension should be properly installed and a quick reload of the webpages should enable it

## Firefox
For Firefox you can install an extension by going to the debug page at ```about:debugging```. After this go to ```This Firefox``` and hit Load Temporary Addon.

Here you need to select the manifest to install it. After doing that it should be installed but you will have to be aware that it will not be installed upon a restart of Firefox. This unfortunately seems to be unavoidable and I will try to add it to the Firefox Marketplace as soon as the two-factor is working.

# Usage
Most of the features are self explanitory through the settings menu. ~~The settings can be accessed by going to the ```Profil``` menu and ```Log``` submenu.~~ The settings can be accessed through the ```Lectio++``` menu in the menubar. Also be aware that some settings will only be visible once another setting has been enabled.
If any features are unclear feel free to ask through a Issue.
