#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'

import { promote } from './promote'
import { upload } from './upload'

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
)

const argv = yargs
  .usage('Usage: $0 [options]')
  .version(pkg.version)
  .option('key', {
    alias: 'k',
    config: true,
    demandOption: true
  })
  .option('file', {
    alias: 'f',
    describe:
      'Paths to an APK or AAB. OBBs and a deobfuscation mappings file for the package can be included by adding a comma separated list after the main file.',
    type: 'array'
  })
  .config(
    'key',
    'Path to a JSON file that contains the private key and client email (can be specified via APKUP_KEY env variable)',
    (configPath) => {
      return { auth: JSON.parse(fs.readFileSync(configPath, 'utf-8')) }
    }
  )
  .command(promote)
  .command(upload)
  .env('APKUP')
  .help('help')
  .alias('help', 'h').argv
