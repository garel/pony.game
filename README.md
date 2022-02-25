# What is P.O.N.Y

P.O.N.Y is a recruitment tool designed to attract talent attention through an online game

## Structure Of P.O.N.Y


- /.dist - Generated output folder, ready to ship
- /docker - Dummy environment and configuration files for local development and integtest
- /assets - Game asset library
- /src - contains the game code files

## Phaser

We are using the [Phaser game engine](https://phaser.io/). Please refer the online documentation for more information.
The project is based on the [Phaser 3 typescript template](https://github.com/photonstorm/phaser3-typescript-project-template)

## Tooling

- [Phaser](https://github.com/photonstorm/phaser): Open-source html5 game engine
- [Rollupjs](https://github.com/rollup/rollup): Bundler
- [Jest](https://github.com/facebook/jest): Test framework

## Common NPM Scripts

Each of these can be run from the command line with the following syntax:

```sh
npm run <script>
```

| Command         | Description                                                                       |
|-----------------|-----------------------------------------------------------------------------------|
| `npm install`   | Install project dependencies                                                      |
| `npm run watch` | Build project and open web server running project, watching for changes           |
| `npm run dev`   | Builds project and open web server, but do not watch for changes                  |
| `npm run test`  | Runs the unit tests                                                               |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Setting Up Your Local Dev Environment

This process sets up your environment so that you can run payoutgateway.admin and other services locally in a Docker container.

1. Set up SSH keys and have ssh-agent running.
    - To set up an ssh key and start your ssh-agent, see [Generating and Using an SSH Key](https://confluence.atg-corp.com/display/DEV/Generating+and+Using+an+SSH+Key)
1. Install Git.
    - To install Git, see [Getting Started with Git](https://confluence.atg-corp.com/display/DEV/Getting+Started+with+Git)
1. Install Docker.
    - Windows (Windows 10 required): https://docs.docker.com/docker-for-windows/
    - Mac: https://docs.docker.com/docker-for-mac/
    - **WARNING:** Docker settings need to know the location of your Git projects:
        - Right-click on the Docker icon, select Settings, Shared Drives (or File Sharing).
        - Mark the checkbox for the drive you use, Apply, and enter your user (ACC\youruser) and password.
    - Linux:
        - [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
        - [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
        - [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
        - [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
        - [Binaries](https://docs.docker.com/install/linux/docker-ce/binaries/)
        - [Optional post-install actions](https://docs.docker.com/install/linux/linux-postinstall/)
1. Run Docker.
    - Start Docker, this will run through required activation.
    - Windows:
        - This startup process may activate Hyper-V and restart Windows.
1. Install [Node.js](http://nodejs.org/) for your platform.
1. Clone this repo

   ```sh
   git clone https://stash.atg-corp.com/scm/~balazs.sarkozi/pony.game.git
   cd payoutgateway.admin
   ```

1. Ensure that you have an appropriate .npmrc file that specifies the Accretive NPM registry and authentication details. Alternatively you can manually setup your npm configuration per Confluence instructions for the [Internal NPM Registry](https://confluence.atg-corp.com/display/DEV/Internal+NPM+Registry)
1. **DO NOT** set https://dp.accretivetg.com as a proxy on your local box. TDSs do need the proxy but your workstation does not need it. If you set your proxy you can clear it by running:

   ```sh
   npm config rm proxy
   npm config rm https-proxy
   ```

1. Install dependencies.

   ```sh
   npm ci
   ```

1. Multiple IDEs are available with support for TypeScript, each with varying degrees of integration and extensibility. Some of the editors in use at ATG are listed below. You are welcome to use any editor that you feel comfortable with. Debugging guides are listed later in this document.
    - [PhpStorm](https://www.jetbrains.com/phpstorm/) by JetBrains. [License Configuration](https://confluence.atg-corp.com/display/IT/Register+PHPstorm+with+the+ATG+JetBrains+Licensing+Server)
    - [VSCode](https://code.visualstudio.com/)

## Setting Up A Local Docker-based Dev Environment

A Docker-based dev environment can be used for local development.

#### Step 1:
* Install Docker and install docker-compose.
#### Step 2:
* **If you want to depend on services running in integ:**
    1. Run docker-compose: `docker-compose up --build`
* **If you want to depend on services running on your host:**
    1. Start the parent docker-compose for PoG to create the "pog_net" docker network used by the docker-compose of this repo. Details: https://stash.atg-corp.com/projects/POG/repos/payoutgateway.parent/browse
    1. Run docker-compose: `docker-compose -f docker-compose-localnet.yml up`
#### Step 3:
* Access the service as <http://localhost:8080>
#### Step 4 (Optional):
* Use remote debugging on <localhost:9229>

## How to Debug Pony

Reference the [NodeJs Debugging Guide](https://confluence.atg-corp.com/display/CORE/Debugging+NodeJs+services) in confluence

### Viewing Service Logfiles

The logs are outputted to the locations defined in your ./config/logconfig(-localdev).yml.

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

You will find lots of comments inside the rollup config files to help you do this.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle. Times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.
