export const routes = {
    home: '/',
    following: '/following',
    profile: '/:username',
    // profile: '/*',
    profileLink: (username) => `/${username}`,
    upload: '/upload',
    search: '/search',
    live: '/live',
    signup: '/signup',
    messages: '/messages',
};
