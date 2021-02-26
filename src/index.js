import TOML from '@iarna/toml';
import { createFilter, dataToEsm } from '@rollup/pluginutils';

const ext = /\.toml$/;

export default function toml(options = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'toml',
        transform(content, id) {
            if (!ext.test(id)) return null;
            if (!filter(id)) return null;

            try {
                const data = TOML.parse(content);
                const code = dataToEsm(
                    data,
                    {
                        preferConst: true,
                        objectShorthand: true
                    }
                );
                return {
                    code,
                    map: { mappings: '' }
                }
            } catch(tomlError) {
                this.error(`plugin-toml - Invalid TOML found in ${id}:\n${tomlError.message}`);
            }
        }
    }
}
