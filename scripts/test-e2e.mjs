import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { createServer } from 'vite'

const require = createRequire(import.meta.url)
const server = await createServer({ server: { host: '127.0.0.1', port: 4173, strictPort: true } })
let code = 1

try {
  await server.listen()
  code = await new Promise((resolve, reject) => {
    const test = spawn(process.execPath, [require.resolve('@playwright/test/cli'), 'test', ...process.argv.slice(2)], { stdio: 'inherit' })
    test.once('error', reject)
    test.once('exit', exitCode => resolve(exitCode ?? 1))
  })
} finally {
  await server.close()
}

process.exitCode = code
