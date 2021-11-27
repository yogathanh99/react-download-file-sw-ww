import React, { useEffect, useState } from "react";
import { Upload, message, Row, Col, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { decryptData, encryptData } from "../utils/encryptAndDecryptData";
import Compressor from "compressorjs";
import JSZip from "jszip";
import WebWorker from "../workerSetup";
import webWorker from "../worker";
import axios from "axios";

const { Dragger } = Upload;
const zip = new JSZip();

import "./upload-page.css";

const UploadPage = () => {
  const [fileList, setFileList] = useState(null);
  const [images, setImages] = useState([]);
  const [worker, setWorker] = useState("");

  useEffect(() => {
    setWorker(new WebWorker(webWorker));
  }, []);

  useEffect(() => {
    if (worker) {
      worker.postMessage("GetUploads");

      worker.addEventListener("message", (e) => {
        const ciphertext = e.data.uploads;
        const decryptedData = decryptData(ciphertext);
        setImages(decryptedData);
      });
      // worker.postMessage("GetUploads");

      // worker.addEventListener("message", (e) => {
      //   const ciphertext = e.data.uploads;
      //   const decryptedData = decryptData(ciphertext);
      //   console.log(decryptedData);
      //   decryptedData.forEach((el) => {
      //     el.src = `http://localhost:1234/${el.src.split("\\").join("/")}`;
      //   });
      // decryptedData.forEach(async (el) => {
      //   const { data } = await axios.get(el.src);
      //   if (el.src.includes("jpg")) {
      //   } else {
      //     JSZip.loadAsync(data).then(function (zip) {
      //       Object.keys(zip.files).forEach(function (filename) {
      //         zip.files[filename].async("string").then(function (fileData) {
      //           // console.log(fileData); // These are your file contents
      //         });
      //       });
      //     });
      //   }
      // });
      //   setImages(decryptedData);
      // });
    }
  }, [worker]);

  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const props = {
    beforeUpload: (file) => {
      (async () => {
        const fileData = new FormData();
        if (file.type.includes("image")) {
          new Compressor(file, {
            quality: 0.5,
            async success(result) {
              // zip.file(result.name, result);
              // zip.generateAsync({ type: "blob" }).then(async (content) => {
              fileData.append("file", result, result.name);
              const dataCipher = await axios.post(
                "http://localhost:1234/api/data/upload",
                fileData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              const decryptedData = decryptData(dataCipher.data);
              setImages(decryptedData);
              // });
            },
            error(err) {
              console.log(err.message);
            },
          });
        } else {
          zip.file(file.name, file);
          zip.generateAsync({ type: "blob" }).then(async (content) => {
            fileData.append("file", content, `${file.name}.zip`);
            const dataCipher = await axios.post(
              "http://localhost:1234/api/data/upload",
              fileData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const decryptedData = decryptData(dataCipher.data);
            setImages(decryptedData);
          });
        }
        return true;
      })();
    },

    onChange(info) {
      setFileList(info.fileList);
    },
    customRequest: dummyRequest,
  };

  const handleDownload = (src, title) => async () => {
    let fileData = "";
    if (!src.includes(".txt")) {
      const { data } = await axios({
        url: src,
        method: "GET",
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      fileData = data;
    } else {
      const { data } = axios.get(src);
      const zip = JSZip.loadAsync(data);
      Object.keys(zip.files).forEach((filename) => {
        zip.files[filename].async("string").then(async (dataFile) => {
          fileData = await dataFile;
        });
      });
    }

    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="wrapper-upload">
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

      <div style={{ paddingTop: "10px" }}>
        <Row>
          {images.map((image) => (
            <Col span={8} key={image._id} style={{ paddingTop: "10px" }}>
              {image.type.includes("image") ? (
                <img
                  style={{ width: "80%", margin: "0 auto", cursor: "pointer" }}
                  src={`http://localhost:1234/${image.src
                    .split("\\")
                    .join("/")}`}
                  alt={image.name}
                  onClick={handleDownload(
                    `http://localhost:1234/${image.src.split("\\").join("/")}`,
                    image.name
                  )}
                />
              ) : (
                <Card
                  style={{ width: 300 }}
                  onClick={handleDownload(
                    `http://localhost:1234/${image.src.split("\\").join("/")}`,
                    image.name.replace(".zip", "")
                  )}
                >
                  {image.name.replace(".zip", "")}
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default UploadPage;
