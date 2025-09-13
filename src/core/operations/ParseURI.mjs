/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import url from "url";

/**
 * Parse URI operation
 */
class ParseURI extends Operation {

    /**
     * ParseURI constructor
     */
    constructor() {
        super();

        this.name = "Parse URI";
        this.module = "URL";
        this.description = "Pretty prints complicated Uniform Resource Identifier (URI) strings for ease of reading. Particularly useful for Uniform Resource Locators (URLs) with a lot of arguments.";
        this.infoURL = "https://wikipedia.org/wiki/Uniform_Resource_Identifier";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
	    {
		name: "Output as json",
		type: "boolean",
		value: false
	    },
	    {
		name: "Include protocol",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include auth",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include hostname",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include port",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include path name",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include arguments (query)",
		type: "boolean",
		value: true
	    },
	    {
		name: "Include hash",
		type: "boolean",
		value: true
	    },
	    {
		name: "Parse hash like query string"
		type: "boolean"
		value: valse
	    }
	];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const uri = url.parse(input, true);
	const [as_json, include_protocol, include_auth, include_hostname, include_port, include_path, include_query, indlude_hash, parse_hash] = args;

        let output = "";
	if (!as_json) {

	    if (uri.protocol && include_protocol) output += "Protocol:\t" + uri.protocol + "\n";
	    if (uri.auth && include_auth) output += "Auth:\t\t" + uri.auth + "\n";
	    if (uri.hostname && include_hostname) output += "Hostname:\t" + uri.hostname + "\n";
	    if (uri.port && include_port) output += "Port:\t\t" + uri.port + "\n";
	    if (uri.pathname && include_path) output += "Path name:\t" + uri.pathname + "\n";
	    if (uri.query && include_query) {
		const keys = Object.keys(uri.query);
		let padding = 0;

		keys.forEach(k => {
		    padding = (k.length > padding) ? k.length : padding;
		});

		output += "Arguments:\n";
		for (const key in uri.query) {
		    output += "\t" + key.padEnd(padding, " ");
		    if (uri.query[key].length) {
			output += " = " + uri.query[key] + "\n";
		    } else {
			output += "\n";
		    }
		}
	    }
	    if (uri.hash && include_hash) {
		if (!parse_hash) {
		    output += "Hash:\t\t" + uri.hash + "\n";
		} else {
		    parsed_hash = decode_hash(uri.hash)
		    const keys = Object.keys(parsed_hash);
		    let padding = 0;

		    keys.forEach(k => {
			padding = (k.length > padding) ? k.length : padding;
		    });

		    output += "Hash (parsed):\n";
		    for (const key in uri.query) {
			output += "\t" + key.padEnd(padding, " ");
			if (parsed_hash[key].length) {
			    output += " = " + parsed_hash[key] + "\n";
			} else {
			    output += "\n";
			}
		    }
		}
	    }

	} else { // JSON
	    let obj = {}
	    if (include_protocol) obj.protocol = uri.protocol;
	    if (include_auth) obj.auth = uri.auth;
	    if (include_hostname) obj.hostname = url.hostname;
	    if (include_port) obj.port = uri.port;
	    if (include_path) obj.pathname = uri.pathname;
	    if (include_query) obj.query = uri.query
	    if (include_hash) {
		if (parse_hash && uri.hash) {
		    obj.hash = decode_hash(uri.hash);
		} else {
		    obj.hash = uri.hash;
		}
	    }
	}
        return output;
    }

}

export default ParseURI;
