export const routes = {
    home: '/',
    following: '/following',
    // profile: `/@${nickName}`,
    profile: '/@:nickname',
    profileLink: (nickname) => `/@${nickname}`,
    upload: '/upload',
    search: '/search',
    live: '/live',
    signup: '/signup',
};
