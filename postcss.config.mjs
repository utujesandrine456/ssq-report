import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

const config = {
    plugins: {
        "@tailwindcss/postcss": {},
    },
};

