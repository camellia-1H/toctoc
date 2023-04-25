import { createContext, useContext, useReducer } from 'react';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { userInfo } = UserAuth();
    const INITIAL_STATE = {
        chatId: 'null',
        userData: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    userData: action.payload,
                    // chatId: user.username > action.payload.username ? user.username + action.payload.username : action.payload.username + user.username,
                    chatId:
                        userInfo.username > action.payload.username
                            ? userInfo.username + action.payload.username
                            : action.payload.username + userInfo.username,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
export const UserChat = () => {
    return useContext(ChatContext);
};
