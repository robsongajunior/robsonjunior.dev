const groupPagesByLang = (pages) =>
        pages.reduce((pages, page) => {
            const lang = page.slug.split('/')[0];

            if (!pages[lang]) {
                pages[lang] = [];
            }

            pages[lang].push(page);

            return pages;
        }, {}
    );

const getPageByLangCollection = (collection, lang) => {
    return groupPagesByLang(collection)[lang] || [];
}

export { groupPagesByLang, getPageByLangCollection };
