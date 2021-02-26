# Rollup Plugin for TOML
This [Rollup](https://rollupjs.org) plugin imports [TOML](https://toml.io) 
files into your JavaScript code.

[@iarna/toml](https://github.com/iarna/iarna-toml) is used to parse the TOML 
files. @iarna/toml (version 3.0.0) currently supports TOML 1.0.0-rc.1.

## Installation

````
npm install @fbraem/rollup-plugin-toml
````

## Usage

````js
// rollup.config.js
import toml from '@fbraem/rollup-toml-plugin';

// Add toml to the plugins
export default {
  plugins: [
    toml()
  ]
};
````
## Example

This TOML file

````toml
# This is a TOML document

title = 'TOML Example'

[owner]
name = "Tom Preston-Werner"
dob = 1969-03-09T10:00:00

[database]
enabled = true
ports = [ 8001, 8001, 8002 ]
data = [ ["delta", "phi"], [3.14] ]
temp_targets = { cpu = 79.5, case = 72.0 }

[servers]

[servers.alpha]
ip = "10.0.0.1"
role = "frontend"

[servers.beta]
ip = "10.0.0.2"
role = "backend"
````

will result in the following generated code

````js
    export const title = "TOML Example";
    export const owner = {
    	name: "Tom Preston-Werner",
    	dob: new Date(-25711200000)
    };
    export const database = {
    	enabled: true,
    	ports: [
    		8001,
    		8001,
    		8002
    	],
    	data: [
    		[
    			"delta",
    			"phi"
    		],
    		[
    			3.14
    		]
    	],
    	temp_targets: {
    		cpu: 79.5,
    		"case": 72
    	}
    };
    export const servers = {
    	alpha: {
    		ip: "10.0.0.1",
    		role: "frontend"
    	},
    	beta: {
    		ip: "10.0.0.2",
    		role: "backend"
    	}
    };
    export default {
    	title,
    	owner,
    	database,
    	servers
    };
````
