{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
  };

  outputs = { self , nixpkgs ,... }: let
    # system should match the system you are running on
    system = "x86_64-linux";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [
          (self: super: rec {
            nodejs = super.nodejs_20;
            pnpm = super.nodePackages.pnpm;
            yarn = (super.yarn.override { inherit nodejs; });

            tsserver = super.nodePackages.typescript-language-server;
            vsserver = super.nodePackages.vscode-langservers-extracted;
            volar = super.nodePackages.volar;
          })
        ];
      };
    in pkgs.mkShell {
      name = "vue flake";

      # create an environment with nodejs-18_x, pnpm, and yarn
      packages = with pkgs; [
        nodePackages."@tailwindcss/language-server"
        node2nix
        nodejs
        pnpm
        tsserver
        vsserver
        volar
        yarn
      ];

      shellHook = ''
        echo "node `${pkgs.nodejs}/bin/node --version`"
        $SHELL
        exit
      '';
    };
  };
}
