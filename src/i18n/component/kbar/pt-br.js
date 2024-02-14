export default [
    {
        id: 'blog',
        name: 'Blog',
        shortcut: ['b'],
        keywords: ['blog', 'medium', 'posts'],
        icon: '/static/icons/svg/blog.svg',
        perform: () => (window.location.pathname = '/pt-br/blog/')
    },
    {
        id: 'github',
        name: 'GitHub',
        shortcut: ['g', 'h'],
        keywords: ['github', 'code', 'desenvolvimento', 'dev'],
        icon: '/static/icons/svg/github.svg',
        perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
    },
    {
        id: 'sobre',
        name: 'Sobre',
        shortcut: ['s'],
        keywords: ['sobre', 'robson junior', 'about'],
        icon: '/static/icons/svg/about.svg',
        perform: () => (window.location.pathname = '/pt-br/sobre/')
    }
];
