{ pkgs ? import <nixpkgs> { } }:
mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
  ];
}
