{
  description = "A very basic flake";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let 
        nodejsVersion = 18;
        pkgs = import nixpkgs { inherit system; };
        packages-darwin = with pkgs; [
          # rustup
          libiconv
          darwin.apple_sdk.frameworks.AppKit
          darwin.apple_sdk.frameworks.WebKit
        ];
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodePackages.pnpm libiconv libsndfile ] ++ packages-darwin;
        };
      }
    );
}
