# Documentation

The documentation for this years Hackathon must be provided as a readme in Markdown format as part of your submission. 

You can find a very good reference to Github flavoured markdown reference in [this cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). If you want something a bit more WYSIWYG for editing then could use [StackEdit](https://stackedit.io/app) which provides a more user friendly interface for generating the Markdown code. Those of you who are [VS Code fans](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) can edit/preview directly in that interface too.

Examples of things to include are the following.

## Summary

**Category:** Enhancement to JSS to change a JSS component rendering behavior based on user's session data.

The module aims to bring user experience of the Sitecore website to the new level. 
Using verbal communication channel with Alexa application the components on the website can reflect the requests of the user.

## Pre-requisites

* VirtualBox 5.2.4+ - https://www.virtualbox.org/wiki/Downloads
* VirtualBox Extension Pack
* Vagrant 2.0.1+ - https://www.vagrantup.com/downloads.html
* Vagrant plugin vagrant-hostmanager
    ```vagrant plugin install vagrant-hostmanager```
* Visual Studio 2017 Professional
* Resharper
* StyleCop for ReSharper - https://github.com/StyleCop/StyleCop.ReSharper
* NodeJS 8+/npm 5+ - https://nodejs.org/en/

### Installation

1. Run `vagrant up` under the *(gitroot)* folder with administrator privileges. It will download the box image and configure the enviroment.
1. Install Sitecore JavaScript Services package - https://jss.sitecore.net/#/setup/jss-server-install?id=jss-server-install
1. Install Node.JS
1. Open shared folder (`\\sc9.local\c$\`) with file explorer and save credentials. You can check them in Control Panel\User Accounts\Credential Manager under Windows Credentials tab.
*Creds*: vagrant/vagrant
1. Copy Sitecore licence to *(gitroot)* folder
1. Run `./build.ps1` in PowerShell with administrator privileges. It is required only for first time to download cake. The next deployments can be done from Visual Studio.
1. Republish Sitecore content (Unicorn should publish synced data but in case of any issues better to republish).

## Configuration

How do you configure your module once it is installed? Are there items that need to be updated with settings, or maybe config files need to have keys updated?

Remember you are using Markdown, you can provide code samples too:

```xml
<?xml version="1.0"?>
<!--
  Purpose: Configuration settings for my hackathon module
-->
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <settings>
      <setting name="MyModule.Setting" value="Hackathon" />
    </settings>
  </sitecore>
</configuration>
```

## Usage

Provide documentation  about your module, how do the users use your module, where are things located, what do icons mean, are there any secret shortcuts etc.

Please include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](images/hackathon.png?raw=true "Hackathon Logo")

You can embed images of different formats too:

![Deal With It](images/deal-with-it.gif?raw=true "Deal With It")

And you can embed external images too:

![Random](https://placeimg.com/480/240/any "Random")

## Video

Please provide a video highlighing your Hackathon module submission and provide a link to the video. Either a [direct link](https://www.youtube.com/watch?v=EpNhxW4pNKk) to the video, upload it to this documentation folder or maybe upload it to Youtube...

[![Sitecore Hackathon Video Embedding Alt Text](https://img.youtube.com/vi/EpNhxW4pNKk/0.jpg)](https://www.youtube.com/watch?v=EpNhxW4pNKk)
