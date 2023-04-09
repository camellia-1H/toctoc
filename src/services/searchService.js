import * as httpRequest from '~/utils/httpRequest';

export const search = async (keywords) => {
    try {
        const res = await httpRequest.get('user/search', {    
            params: {
                keywords,
            },
            headers: {
                'X-RapidAPI-Key': '6b44941691mshf4c5c8b63ac4464p12ac97jsnd757cb99e014',
                'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
            }    
        });    
        return res.user_list;
    } catch (error) {
        console.log(error);
    }
};
