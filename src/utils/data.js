export function mapDefaultExports(modules) {
    let exportMap = {};

    for (const [path, module] of Object.entries(modules)) {
        exportMap = module.default;
    }

    return exportMap;
}

const getData = {
    components: {
        header: mapDefaultExports(import.meta.glob('../i18n/component/header/index.js', { eager: true }))
    }
};

export { getData };
