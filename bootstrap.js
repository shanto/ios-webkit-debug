const { $ } = require("zx");
const yargs = require("yargs");

const argv = yargs(process.argv.slice(2))
	.usage("Usage: $0 [-t wpewebkit-2.50.6]")
	.option("tag", {
		type: "string",
		alias: ["t"],
		describe: "WebKit Tag",
		default: "wpewebkit-2.50.6",
	})
	.help("help")
	.parse();

console.info(`Checking out Webkit@${argv.tag}. If another tag is preferred, then pass it as -tag <tag-spec>`);
$.stdio = "inherit";
$.sync`
rm -rf WebKit HazyCora
git clone --filter=blob:none --depth=1 --sparse --no-checkout https://github.com/WebKit/WebKit.git WebKit
git -C WebKit sparse-checkout init --cone
git -C WebKit sparse-checkout set Source/WebInspectorUI/UserInterface
git -C WebKit fetch --depth=1 origin tag ${argv.tag}
git -C WebKit checkout ${argv.tag} -b ${argv.tag}
git submodule update --init
`;
