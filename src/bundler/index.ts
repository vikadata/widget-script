import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: any;

export const CDN_URL = 'https://unpkg.com';

const initEsbuild = async () => {
	try {
		if (!service) {
			service = esbuild.initialize({
				wasmURL: `${CDN_URL}/esbuild-wasm@0.14.42/esbuild.wasm`,
			});
		}
		await service;
	} catch (err) {
		throw err;
	}
}

export const bundler = async(code: string) => {
  if (!code) return '';
  
  try {
    console.time('Bundling time spent')
    await initEsbuild();

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(code),
        fetchPlugin(code)
      ],
      format: 'cjs',
      minify: true,
      target: 'es2016',
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    const res = result.outputFiles?.[0].text || '';
    console.timeEnd('Bundling time spent')
    return res;
  } catch (error) {
    console.log(error);
  }
	return '';
}
