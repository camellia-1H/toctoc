import * as httpRequest from '~/utils/httpRequest';

export const getVideoPopular = async () => {
    try {
        const res = await httpRequest.getVideoPopular('feed/list', {
            params: {
                region: 'VN',
            },
            headers: {
                'X-RapidAPI-Key': '6b44941691mshf4c5c8b63ac4464p12ac97jsnd757cb99e014',
                'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
