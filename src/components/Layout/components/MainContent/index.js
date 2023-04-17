import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Content from './Content';
import styles from './MainContent.module.scss';
import * as videoPopularService from '~/services/videoPopularService';

const cx = classNames.bind(styles);

function MainContent() {
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoPopularService.getVideoPopular();
            setVideoList(result);
        };
        fetchApi();
        console.log(videoList);
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* render các video */}
            {videoList?.map((data) => {
                return <Content key={data.aweme_id} data={data} />;
            })}
        </div>
    );
}

export default MainContent;
