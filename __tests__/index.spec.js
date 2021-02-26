import { rollup } from 'rollup';
import tmp from 'tmp';
import fs from 'fs';

import toml from '../src/index.js';

const bundle = async (rollupConfig) => {
    const bundle = await rollup(rollupConfig);
    const { output } = await bundle.generate({ format: 'esm' });
    const [{ code }] = output;
    return code;
}

process.chdir(__dirname);

it('can transform TOML to JavaScript', async () => {
    const code = await bundle({
        input: './fixtures/test.toml',
        plugins: [ toml() ]
    });

    const tmpFile = tmp.fileSync({ postfix: '.js' });
    fs.writeFileSync(tmpFile.name, code);
    const { default: result } = await import(tmpFile.name);
    expect(result).toMatchObject({
        title: 'TOML Example',
        owner: {
            name: 'Tom Preston-Werner'
        }
    });
});

/*
it('throws an error for invalid TOML', async () => {
    const code = await bundle({
        input: './fixtures/invalid.toml',
        plugins: [toml()]
    });
});
*/
