install:
	npm install -g
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test