install:
	npm install -g
publish:
	npm publish --dry-run
lint:
	eslint .
build-tests: 
	npm run build-tests