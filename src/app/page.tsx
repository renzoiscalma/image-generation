"use client";
import React, { useState } from "react";
import templateImg from "../assets/Template.png";
import styles from "./page.module.css";

export default function Home() {
  const [qrImg, setQrImg] = useState<HTMLImageElement>();
  const [url, setUrl] = useState<string>("");

  const handleUrlInputChange = (event: React.FormEvent) => {
    const val = (event.target as HTMLInputElement).value;
    setUrl(val);
  };

  const handleImgChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;
    let fileImage = new Image();
    if (files && files.length > 0) {
      fileImage.src = URL.createObjectURL(files[0]);
      setQrImg(fileImage);
    }
  };

  const downloadCanvas = () => {
    if (!qrImg && !url) return;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const templateBg = new Image();
    templateBg.src = templateImg.src;
    templateBg.onload = function () {
      if (ctx && qrImg && url) {
        ctx.canvas.width = templateBg.width;
        ctx.canvas.height = templateBg.height;
        ctx.drawImage(templateBg, 0, 0);

        let qrSize = 300;
        ctx.drawImage(qrImg, 350, 460, qrSize, qrSize);

        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(url, canvas.width / 2, 850);
      }
      // programatically create an anchor element
      // and simulate that a download link has been clicked
      let link = document.createElement("a");
      link.download = "filename.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  };
  return (
    <main className={styles.main}>
      <div>
        Input URL: <input type="text" onChange={handleUrlInputChange} />
      </div>
      <div>
        <input
          type="file"
          id="qr-img"
          accept="image/png, image/jpeg"
          onChange={handleImgChange}
        />
      </div>
      <div>
        <input type="button" onClick={downloadCanvas} value="download" />
      </div>
    </main>
  );
}
