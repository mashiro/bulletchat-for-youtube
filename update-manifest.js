const fs = require('fs')
const manifestPath = './build/manifest.json'

let manifest = fs.readFileSync(manifestPath, 'utf-8')
const assetManifest = require('./build/asset-manifest')

Object.entries(assetManifest.files).forEach(([name, value]) => {
  const placeholder = `%${name}%`
  manifest = manifest.replace(placeholder, value)
})

fs.writeFileSync(manifestPath, manifest)
