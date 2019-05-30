import Config from '@/config/config';

export default {
    state: {
        user: {}
    },
    getters: {},
    mutations: {
        setUser(state, user) {
            let avatar = user.avatar;
            user.avatar = avatar ? Config.uploadUrl + avatar : '/static/images/avatar.jpg';
            state.user = user;
        }
    },
    actions: {}
};
