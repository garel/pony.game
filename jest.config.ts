import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '\\.test\\.[jt]sx?$',
};

export default config;