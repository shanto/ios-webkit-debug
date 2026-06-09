param (
    [string]$Tag = "wpewebkit-2.50.6"
)
Write-Host "Checking out Webkit@$Tag. If another tag is preferred, then pass it as $0 -Tag <tag-spec>"
$env:PATH = ".\node_modules\.bin;$env:PATH"
rimraf WebKit HazyCora
git clone --filter=blob:none --depth=1 --sparse --no-checkout https://github.com/WebKit/WebKit.git WebKit
git -C WebKit sparse-checkout init --cone
git -C WebKit sparse-checkout set Source/WebInspectorUI/UserInterface
git -C WebKit fetch --depth=1 origin tag $Tag
git -C WebKit checkout $Tag -b $Tag
git submodule update --init
npm install
