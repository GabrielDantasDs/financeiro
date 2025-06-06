import { XMLParser } from "fast-xml-parser";

export default class OFXParser {
	parse(content) {
		try {
			const ofxStart = content.indexOf("<OFX>");
			if (ofxStart === -1) throw new Error("Invalid OFX file format");

			let cleanContent = content
				.substring(ofxStart)
				.replace(/>\s+</g, "><")
				.replace(/\s+</g, "<")
				.replace(/>\s+/g, ">")
				.replace(/\n/g, "")
				.replace(/\r/g, "")
				.replace(/<([^>]+)>([^<]+)(?!\s*<\/)/g, "<$1>$2</$1>");

			const parser = new XMLParser({
				ignoreAttributes: false,
				parseAttributeValue: true,
				trimValues: true,
				parseTagValue: true,
				allowBooleanAttributes: true,
				cdataPropName: "__cdata",
				ignoreDeclaration: true,
				removeNSPrefix: true,
			});

			const parsed = parser.parse(cleanContent);

			const transactions = parsed.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN;
			if (!transactions) {
				throw new Error("Invalid OFX structure: Missing transaction data");
			}

			// Garante que é array
			if (!Array.isArray(transactions)) {
				parsed.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN = [transactions];
			}

			return parsed;
		} catch (error) {
			console.error("OFX Parse Error:", error);
			throw new Error(`Failed to parse OFX file: ${error.message}`);
		}
	}
}
