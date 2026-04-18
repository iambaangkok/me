# iambaangkok.me

# Install Hugo
## Prerequisites
- Install Git: https://github.com/git-guides/install-git
- Install Go: https://go.dev/dl/
## Install Hugo
- Download binaries: 
	- https://gohugo.io/installation/
	- or https://github.com/gohugoio/hugo/releases 
	- get the latest windows release
- Extract
- "Install" by copying to `C:\Program Files\Hugo` or wherever you want

# Development, Build, Publish
* set `baseUrl` in `hugo.toml`
* local-dev with `hugo server --disableFastRender`
* build with hugo: `hugo --destination docs`
* commit & push
  * github pages should be updated once the build is finished
