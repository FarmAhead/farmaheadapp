Ansible Deployment Instructions
=========

Ansible is a declarative-based configuration management tool that allows for the complete setup & installation of arbitrary software on a remote host, and works entirely over SSH meaning no agent is required.

Requirements
------------
- deploy key (public & private)
- remote host key
- IP address of remote host (*must update the value in `hosts/webserver.ini`*)

Role Variables
--------------
- `git_branch`: Which state of the repo to clone. Can be a branch or a specific commit hash.

These are the so-called sub-processes and their tags that can be specified on an either `don't do` or `only do` basis

- name: Copy deploy key(s) to server
  - `keys`
- name: Install base packages
  - `system`
- name: Set environment variables
  - `env`
- name: Create logging facilities
  - `logs`
- name: Configure Postgres
  - `database`
- name: Install frontend
  - `api`
- name: Install application
  - `app`
- name: Migrate database
  - `migrate`
- name: Configure Nginx server
  - `server`
- name: Test if site is accessable
  - `test`

Dependencies
------------

```bash
$ pip3 install ansible
ansible version
```

Examples
----------------

> NOTE: you can increase the verbosity level by including `-v` to the command. You can add up to 8 `v`'s, meaning that to log at the highest output level use `-vvvvvvvv`. Be warned that logging may bottleneck the operation at high enough levels.

`Complete installation`
```bash
$ ansible-playbook deploy.yml --inventory hosts/webserver.ini --extra-vars "git_branch=master"
```

`Update app`
```bash
$ ansible-playbook deploy.yml --inventory hosts/webserver.ini --extra-vars "git_branch=master" --tags "app, migrate, server, test"
```


