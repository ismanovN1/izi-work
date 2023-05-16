/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';

import { checkObjValue } from 'helpers/common';
import View from '../View';
import './index.scss';
import Image from '../Image';
import DeleteIcon from 'assets/icons/bin.svg';
import DeleteWhiteIcon from 'assets/icons/bin-white.svg';
import { useEffect } from 'react';

type propsType = {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  onChange?: (file?: any) => void;
  value?: any;
  deleteIconColor?: 'WHITE' | 'BLACK';
};

const UploadFileArea: React.FC<propsType> = ({ width, deleteIconColor, value, height, children, onChange }) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<any>(value);
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (typeof file !== 'string') onChange?.(file);
  }, [file]);

  function handleFiles(files: any) {
    if ('image/png, image/gif, image/jpeg'.includes(files[0].type)) {
      setFile(files[0]);
    }
  }

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <View
      class_name={`upload-area ${dragActive ? 'drag-active' : ''}`}
      {...checkObjValue({ width, height })}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {file ? <Image fit="cover" {...checkObjValue({ width, height })} src={file} /> : children}
      {file && (
        <View class_name="delete-button" onClick={() => setFile(undefined)}>
          {deleteIconColor === 'WHITE' ? <DeleteWhiteIcon /> : <DeleteIcon />}
        </View>
      )}
      {!file && (
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleChange}
          accept="image/png, image/gif, image/jpeg"
        />
      )}
    </View>
  );
};

export default UploadFileArea;
