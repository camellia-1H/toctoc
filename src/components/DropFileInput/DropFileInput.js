import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './drop-file-input.module.scss';
import { ImageConfig } from '~/config/ImageConfig';
import uploadImg from '~/assets/DropFile/assets/cloud-upload-regular-240.png';

const DropFileInput = (props) => {
    const cx = classNames.bind(styles);
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    return (
        <div className={cx('wrapper')}>
            <div ref={wrapperRef} className={cx('drop-file-input')} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div className={cx('drop-file-input__label')}>
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" accept=".mp4" value="" onChange={onFileDrop} />
            </div>
            {fileList.length > 0 ? (
                <div className={cx('drop-file-preview')}>
                    <p className={cx('drop-file-preview__title')}>Ready to upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className={cx('drop-file-preview__item')}>
                            <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                            <div className={cx('drop-file-preview__item__info')}>
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span className={cx('drop-file-preview__item__del')} onClick={() => fileRemove(item)}>
                                x
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

export default DropFileInput;
