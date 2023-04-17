import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/Search/AccountItem';
import { useDeboubce } from '~/hooks';
import * as searchServices from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDeboubce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounceValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounceValue]);

    const hanleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideSearchResult = () => {
        setShowSearchResult(false);
    };

    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!!!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // tránh lỗi waring cho tippy
        // Using a wrapper <div> tag around the reference
        // element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showSearchResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideSearchResult}>
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChangeInput}
                        onFocus={() => setShowSearchResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={hanleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
