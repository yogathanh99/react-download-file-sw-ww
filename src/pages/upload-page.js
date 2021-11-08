import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { Button, Upload, message } from "antd";
import { ArrowLeftOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

import "./upload-page.css";

const UploadPage = () => {
  const [fileList, setFileList] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("imgSrc")) setLoading(true);
  }, []);

  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const props = {
    beforeUpload: (file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        message.error(`${file.name} is not a image file`);
      } else {
        (async () => {
          const data = await getBase64(file);
          setImgSrc(data);
          return true;
        })();
      }
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    customRequest: dummyRequest,
  };

  const handleImport = () => {
    localStorage.setItem("imgSrc", imgSrc);
    setLoading(false);
  };

  return (
    <>
      <div className="wrapper-upload">
        <Link to="/">
          <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
        </Link>
        <h1 className="upload-title">Upload</h1>
      </div>

      <div className="upload-file">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Support for image files</p>
        </Dragger>
      </div>
      <div className="upload-btn">
        <Button type="primary" shape="round" onClick={handleImport}>
          Download
        </Button>
      </div>
      <div style={{ paddingTop: "10px" }}>
        <img
          style={{ width: "50%", margin: "0 auto" }}
          src={loading ? localStorage.getItem("imgSrc") : imgSrc}
          alt=""
        />
      </div>
    </>
  );
};

export default UploadPage;
