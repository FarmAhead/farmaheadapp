# vagrant

### dependencies
- Hashicorp Vagrant
- VirtualBox
- Ansible

## prerequisites
- ~~GitHub deploy key for the private repo (make a new ssh key pair and send the `.pub` to Brett)~~ **repo is now public**

## assumptions
- ~~That your ssh folder is located at `~/.ssh` and that you have a folder inside called `farmahead` which contains your key pairs, named `deploy_key` and `deploy_key.pub`. **You need to make sure this folder and the deploy keys are world-readable `chmod 644 ~/.ssh/farmahead`** (the keys need only be copied once, so you can reset your permissions if you're actually serious about "best practices" (lol))~~ **repo is now public**
- That you have Ansible installed, either with `pip` or as a system package like `apt`

> NOTE: All these commands must be run from inside this folder

This will create a VM on your local machine and perform a complete install in *exactly* the same way that would be done on the Production machine.
```bash
$ vagrant up --provision
```

You can access the machine with 
```bash
$ vagrant ssh
```

To test a different branch than Master, replace the `git_branch` value in the vagrant hosts file
```bash
$ vim ../hosts/vagrant.ini
```

If you want to be really fancy, you can edit your hosts file to intercept the DNS lookup and spoof a domain name. Often, people will preface a real domain with `dev.`
```bash
$ sudo echo "77.77.77.7 dev.farmaheadapp.com" >> /etc/hosts
```
Now, assuming the Vagrant machine is up and running you can go to `http://dev.farmaheadapp.com` in a browser and you will be accessing your VM :)

To "hibernate" the Vagrant machine
```bash
$ vagrant suspend
```

To shutdown the Vagrant machine
```bash
$ vagrant halt
```

To restart the Vagrant machine and re-run the installation procedures
```bash
$ vagrant reload --provision
```
