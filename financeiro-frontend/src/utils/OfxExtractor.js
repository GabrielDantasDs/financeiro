import { XMLParser } from 'fast-xml-parser';

/**
 * OFXParser - A class to parse OFX (Open Financial Exchange) files and convert them to JSON
 */
export default class OFXParser {
  parse(content) {
    try {
      // Remove OFX header (everything before <OFX>)
      const ofxStart = content.indexOf('<OFX>');
      if (ofxStart === -1) {
        throw new Error('Invalid OFX file format');
      }

      // Clean up the content and properly close tags
      let cleanContent = content.substring(ofxStart)
        .replace(/>\s+</g, '><')
        .replace(/\s+</g, '<')
        .replace(/>\s+/g, '>')
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        // Close unclosed tags
        .replace(/<([^>]+)>([^<]+)(?!\s*<\/)/g, '<$1>$2</$1>');

      const parser = new XMLParser({
        ignoreAttributes: false,
        parseAttributeValue: true,
        trimValues: true,
        parseTagValue: true,
        allowBooleanAttributes: true,
        cdataPropName: '__cdata',
        ignoreDeclaration: true,
        removeNSPrefix: true
      });

      const parsed = parser.parse(cleanContent);

      // Validate the parsed structure
      if (!parsed.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN) {
        throw new Error('Invalid OFX structure: Missing transaction data');
      }

      // Ensure STMTTRN is always an array
      const transactions = parsed.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
      if (!Array.isArray(transactions)) {
        parsed.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN = [transactions];
      }

      return parsed;
    } catch (error) {
      console.error('OFX Parse Error:', error);
      console.error('Content:', content);
      throw new Error(`Failed to parse OFX file: ${error.message}`);
    }
  }
}

/**
 * Utility class to work with OFX files
 */
class OFXConverter {
	/**
	 * Convert OFX file content to JSON
	 * @param {string} ofxContent - The content of the OFX file
	 * @returns {Object} Parsed OFX data as a JavaScript object
	 */
	static ofxToJson(ofxContent) {
		const parser = new OFXParser();
		return parser.parse(ofxContent);
	}

	/**
	 * Read an OFX file and convert it to JSON
	 * @param {string} filePath - Path to the OFX file
	 * @returns {Promise<Object>} Promise resolving to parsed OFX data
	 */
	static async readAndConvert(filePath) {
		try {
			// Node.js environment
			if (typeof require === "function") {
				const fs = require("fs").promises;
				const content = await fs.readFile(filePath, { encoding: "utf-8" });
				return OFXConverter.ofxToJson(content);
			}
			// Browser environment
			else {
				const response = await fetch(filePath);
				const content = await response.text();
				return OFXConverter.ofxToJson(content);
			}
		} catch (error) {
			throw new Error(`Failed to read or parse OFX file: ${error.message}`);
		}
	}

	/**
	 * Save JSON data to a file
	 * @param {Object} data - The data to save
	 * @param {string} outputPath - The path to save the file to
	 * @returns {Promise<void>}
	 */
	static async saveJson(data, outputPath) {
		const jsonString = JSON.stringify(data, null, 2);

		try {
			// Node.js environment
			if (typeof require === "function") {
				const fs = require("fs").promises;
				await fs.writeFile(outputPath, jsonString, "utf-8");
				console.log(`JSON data saved to ${outputPath}`);
			}
			// Browser environment
			else {
				// Create a download link
				const blob = new Blob([jsonString], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = outputPath;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
				console.log(`JSON data prepared for download as ${outputPath}`);
			}
		} catch (error) {
			throw new Error(`Failed to save JSON file: ${error.message}`);
		}
	}
}
