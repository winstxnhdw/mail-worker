import { build } from 'esbuild'
import { rm, mkdir, cp } from 'fs/promises'

const build_directory = 'dist'
const external_modules: string[] = []

async function main(args: string[]) {
  await rm(build_directory, { recursive: true, force: true })
  await mkdir(build_directory)

  for (const module of external_modules) {
    await cp(`node_modules/${module}`, `${build_directory}/node_modules/${module}`, {
      recursive: true
    })
  }

  await build({
    entryPoints: ['src/index.ts'],
    outfile: `${build_directory}/index.js`,
    bundle: true,
    minify: args.slice(2)[0] !== 'test',
    platform: 'node',
    external: external_modules
  })
}

main(process.argv)
