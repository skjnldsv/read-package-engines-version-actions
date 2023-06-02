# Read node and npm versions from engines field in package.json

Output node and npm version numbers from `package.json`

## Example workflow

`package.json`
```json

{
  "name": "your-package",
  "engines": {
    "node": "12.13.x",
    "npm": "^6.1.3"
  }
}
```

`.github/workflow/test.yml`
```yml
name: Get node and npm versions from package.json

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Read node and npm versions from package.json
        uses: skjnldsv/read-package-engines-version-actions@v2
        id: package-engines-versions

      - name: Show node version number
        run: echo "Node version is ${{ steps.package-engines-versions.outputs.nodeVersion }}"
        # Version is 12.13.x

      - name: Show npm version number
        run: echo "Npm version is ${{ steps.package-engines-versions.outputs.npmVersion }}"
        # Version is ^6.1.3
```

## Inputs
### path

Path of `package.json`, `./` by default.

`path/to/package.json`
```json

{
  "name": "your-package",
  "engines": {
    "node": "12.13.x",
    "npm": "^6.1.3"
  }
}
```

```yml
name: Get node and npm versions from package.json

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Read node and npm versions from package.json
        uses: skjnldsv/read-package-engines-version-actions@v2
        with: 
          path: "./path/to/package.json"
        id: package-engines-versions

      - name: Show node version number
        run: echo "Node version is ${{ steps.package-engines-versions.outputs.nodeVersion }}"
        # Version is 12.13.x

      - name: Show npm version number
        run: echo "Npm version is ${{ steps.package-engines-versions.outputs.npmVersion }}"
        # Version is ^6.1.3
```
### fallbackNode, fallbackNpm

`fallbackNode` and `fallbackNpm` allows you to define a fallback value if not defined

```json

{
  "name": "your-package",
  "engines": {
  }
}
```

```yml
name: Get node and npm versions from package.json

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Read node and npm versions from package.json
        uses: skjnldsv/read-package-engines-version-actions@v2
        with: 
          fallbackNode: '^14'
          fallbackNpm: '^6'
        id: package-engines-versions

      - name: Show node version number
        run: echo "Node version is ${{ steps.package-engines-versions.outputs.nodeVersion }}"
        # Version is ^14

      - name: Show npm version number
        run: echo "Npm version is ${{ steps.package-engines-versions.outputs.npmVersion }}"
        # Version is ^6
```

## Share between jobs

This action will also write two environment variables: `NODE_VERSION` and `NPM_VERSION`

`.github/workflow/test.yml`
```yml
name: Get node and npm versions from package.json

on: push

jobs:
  init:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Read node and npm versions from package.json
        uses: skjnldsv/read-package-engines-version-actions@v2
  
  job2:
    runs-on: ubuntu-latest

    steps:
      - name: Set up node ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v3
        with:
          cache: 'npm'
          node-version: ${{ env.NODE_VERSION }}

      - name: Set up npm ${{ env.NPM_VERSION }}
        run: npm i -g npm@"${{ env.NPM_VERSION }}"
```

# License

MIT
