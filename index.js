#!/usr/bin/env node

"use strict";
const meow = require("meow");
const lqip = require("lqip");
const chalk = require("chalk");
const ncp = require("copy-paste");

// CLI helpers
const cli = meow(
  `
	Usage
	  $ lqip <path|glob>
	Options
	  --no-copy to disable copying the Base64 string to clipboard
	Examples
    $ lqip ./images/banner.jpeg
    $ lqip ./images/banner.jpeg --no-copy
    `,
  {
    flags: {
      copy: {
        type: 'boolean',
        default: true
      },
    }
  }
);

// make sure a file was specified in cli
if (cli.input.length === 0) {
  console.error("You need to specify at least 1 image");
  process.exit(1);
}

// WIP only 1 file supported -- sorry!
const promise = lqip.base64(cli.input[0]);

// WIP only 1 file supported -- sorry!
promise.then(
  base64 => {
    console.log("\n" + chalk.green("✅ Success") + "\n");
    console.log(chalk.green(base64) + "\n");
    if (cli.flags.copy) {
      ncp.copy(base64, () => {
        console.log(
          chalk.yellow("✨ The Base64 above has been copied to your clipboard")
        );
      });
    }
  },
  error => {
    console.log(chalk.red(error) + "\n");
    console.log(
      chalk.red(
        "😿 We are sorry that error has happened, please file an issue for us at: https://github.com/zouhir/lqip-cli"
      )
    );
  }
);
