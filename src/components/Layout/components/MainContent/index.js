import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Content from './Content';
import styles from './MainContent.module.scss';

const cx = classNames.bind(styles);

function MainContent() {
    // lấy dữ liệu user và truyền qua prop data
    // state [data]
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=572905640dcafac9058f6de342985608&language=en-US&page=1')
            .then((response) => response.json())
            .then((data) => {
                const results = data.results;
                setDataUser(results);
                // console.log(dataUser);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* render các video */}
            {dataUser.map((data) => {
                return <Content key={data.id} data={data} />;
            })}
        </div>
    );
}

export default MainContent;
