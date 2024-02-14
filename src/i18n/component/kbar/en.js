export default [
    {
        id: 'blog',
        name: 'Blog',
        shortcut: ['b'],
        keywords: ['blog', 'medium', 'posts'],
        icon: '/static/icons/svg/blog.svg',
        perform: () => (window.location.pathname = '/en/blog/')
    },
    {
        id: 'github',
        name: 'GitHub',
        shortcut: ['g', 'h'],
        keywords: ['github', 'code', 'developing', 'dev'],
        icon: '/static/icons/svg/github.svg',
        perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
    },
    {
        id: 'about',
        name: 'About',
        shortcut: ['a', 'me'],
        keywords: ['about', 'robson junior', 'me'],
        icon: '/static/icons/svg/about.svg',
        perform: () => (window.location.pathname = '/en/about/')
    }
];
