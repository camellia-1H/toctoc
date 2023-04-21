import classNames from 'classnames/bind';

import Content from './Content';
import styles from './MainContent.module.scss';
import * as videoPopularService from '~/services/videoPopularService';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

function MainContent() {
    // const [videoList, setVideoList] = useState([]);
    const { videoList } = UserAuth();
    console.log(videoList);
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await videoPopularService.getVideoPopular();
    //         setVideoList(result);
    //     };
    //     fetchApi();
    //     console.log(videoList);
    // }, []);

    return (
        <div className={cx('wrapper')}>
            {/* render các video */}
            {videoList.video_lists?.map((data) => {
                return <Content key={data.user.user_id} data={data} />;
            })}
        </div>
    );
}

export default MainContent;
