![Hackathon Logo](documentation/images/hackathon.png?raw=true "Hackathon Logo")

# Submission Boilerplate

Welcome to Sitecore Hackathon 2019.

The Hackathon site can be found at http://www.sitecorehackathon.org/sitecore-hackathon-2019/

The purpose of this repository is to provide a sample which shows how to structure the Hackathon submissions.


## Entry Submission Requirements 

All teams are required to submit the following as part of their entry submission on or before the end of the Hackathon on **Friday March 1st 2019 at 8PM EST**. The modules should be based on [Sitecore 9.1 (Initial Release)](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/91/Sitecore_Experience_Platform_91_Initial_Release.aspx).

**Failure to meet any of the requirements will result in automatic disqualification.** Please reach out to any of the organisers or judges if you require any clarification.

- Sitecore 9.1 (Initial Release) Module (Module install package)
   - An installation Sitecore Package (`.zip` or `.update`)

- Module code in a public Git source repository. We will be judging (amongst other things):
  - Cleanliness of code
  - Commenting where necessary
  - Code Structure
  - Standard coding standards & naming conventions

- Precise and Clear Installation Instructions document (1 – 2 pages)
- Module usage documentation on [Readme.md](documentation) file on the Git Repository (2 – 5 pages)
  - Module Purpose
  - Module Sitecore Hackathon Category
  - How does the end user use the Module?
  - Screenshots, etc.

- Create a 2 – 10 minutes video explaining the module’s functionality (A link to youtube video)

  - What problem was solved
  - How did you solve it
  - What is the end result


# Information

### Requirements

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

