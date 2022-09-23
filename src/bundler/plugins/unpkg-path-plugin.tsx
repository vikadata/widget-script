import * as esbuild from 'esbuild-wasm'
import { CDN_URL } from '../index';

const RESOLVE_NAMESPACE = "script-plugin";

export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// 处理入口文件
			build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
				return { 
					path: 'index.js', 
					namespace: RESOLVE_NAMESPACE 
				};
			});

			// 处理相对路径
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				const url = new URL(args.path, `${CDN_URL}${args.resolveDir}/`)

				return {
					path: url.href,
					namespace: RESOLVE_NAMESPACE,
				};
			});

			// 处理引入的文件
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: RESOLVE_NAMESPACE,
					path: `${CDN_URL}/${args.path}`,
				};
			});
		},
	}
}
