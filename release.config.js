/* eslint-disable max-len */
module.exports = {
	branches : ['main'],
	plugins  : [
		'@semantic-release/ ',
		'@semantic-release/release-notes-generator',
		// version
		['@semantic-release/exec', {
			prepareCmd: `
				pnpm version --commit-hooks false --git-tag-version false \${nextRelease.version} &&
				(cd packages/maps && pnpm version --commit-hooks false --git-tag-version false \${nextRelease.version}) &&
				(cd packages/product && pnpm version --commit-hooks false --git-tag-version false \${nextRelease.version})
			`,
		}],
		// build
		['@semantic-release/exec', {
			prepareCmd: `
				pnpm --filter @cogoport/maps run build &&
				pnpm --filter @cogoport/maps run build:themes &&
				pnpm --filter @cogoport/product run build
			`,
		}],
		// publish
		['@semantic-release/exec', {
			prepareCmd: `
				pnpm --filter @cogoport/maps publish --no-git-checks &&
				pnpm --filter @cogoport/product run release
            `,
		}],
		// post publish
		['@semantic-release/git', {
			assets: [
				'package.json',
				'packages/maps/package.json',
				'packages/product/package.json',
			],
		}],
		'@semantic-release/github',
	],
};
