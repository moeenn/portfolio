---
title: "Basics of SystemD"
desc: "SystemD is the default service manager on most linux distos. It is capable of restarting services in case they crash. This makes it idea to running web server related processes on a VPS (among other things)."
category: "Linux"
tags: ["Fundamentals"]
---

## Types of services 

There are two types of services in SystemD
- System-level services: These live in directory `/etc/systemd/system/`
- User-level services: These live in directory `${HOME}/.config/systemd/user/`


## Create custom service

The configuration file for service must be defined in system-level or user-level config directory, the file extension will be `.service`.
Following is service config for a web application binary which needs to auto-run at system startup and restarted on crash. This is a config for user-level service.

```
[Unit]
Description=<service-name>
After=network.target

[Service]
ExecStart=%h/path/to/binary/or/script
WorkingDirectory=%h/path/to/dir/containing/binary/or/script
Type=simple
Restart=always

Environment="ENV_VAR_ONE=value-one"
Environment="ENV_VAR_TWO=value-two"

[Install]
WantedBy=default.target
```

Following should be noted about the config:

- When defining system-level services, all paths defined within the service must be complete absolute paths.
- `%h` can be used within user-level services, it signified the path to user's home directory.
- Environment variables can also be defined within service configs, as shown in the above example.


**Note**: Any time the service file for any service changes, services configs need to reloaded.

```bash
# reload system-level services
$ sudo systemctl daemon-reload

# reload user-level services
$ systemctl --user daemon-reload

# enable and start system-level service
$ sudo systemctl enable --now <service-name>

# enable and start user-level service
$ systemctl --user enable --now <service-name>

# read stdout / logs of running system-level service
$ sudo journalctl -fu <service-name>

# read stdout / logs of running user-level service
$ journalctl --user -fu <service-name>
```

