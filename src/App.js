import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import * as clipboard from 'clipboard-polyfill';
import { ClipboardItem } from 'clipboard-polyfill';
import './App.css'; // 예시에서는 App.css 파일을 사용합니다.

const App = () => {
  const [textContent, setTextContent] = useState("MyLogo");
  const [textColor, setTextColor] = useState("black");
  const [textSize, setTextSize] = useState(50);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(150);

  const ref = useRef(null);

  const copyStyles = (source, target) => {
    Array.from(source.style).forEach((styleName) => {
      target.style[styleName] = source.style[styleName];
    });
  };

  const clipboardHandler = () => {
    if (ref.current) {
      // 클립보드 복사 시에만 적용되는 스타일을 정의합니다.
      const clipboardStyle = {
        border: 'none',
      };

      html2canvas(ref.current, {
        backgroundColor: 'transparent',
        width: imageWidth,
        height: imageHeight,
        logging: false, // 로그 출력을 끄기
        onclone: (document) => {
          // 복사 시에만 clipboardStyle을 적용하는 스크립트를 추가합니다.
          const clipboardStyleScript = document.createElement('script');
          clipboardStyleScript.innerHTML = `
            document.querySelector('.preview').style.border = "${clipboardStyle.border}";
          `;
          document.head.appendChild(clipboardStyleScript);
        },
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          }
        });
      });
    }
  };

  const saveImageHandler = () => {
    if (ref.current) {
      // 저장 시에만 적용되는 스타일을 정의합니다.
      const saveImageStyle = {
        border: 'none',
      };

      html2canvas(ref.current, {
        backgroundColor: 'transparent',
        width: imageWidth,
        height: imageHeight,
        logging: false, // 로그 출력을 끄기
        onclone: (document) => {
          // 저장 시에만 saveImageStyle을 적용하는 스크립트를 추가합니다.
          const saveImageStyleScript = document.createElement('script');
          saveImageStyleScript.innerHTML = `
            document.querySelector('.preview').style.border = "${saveImageStyle.border}";
          `;
          document.head.appendChild(saveImageStyleScript);
        },
      }).then((canvas) => {
        // 복사와 동일한 스타일을 적용하기 위해 원래 스타일로 되돌립니다.
        copyStyles(ref.current, document.querySelector('.preview'));

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'my_logo.png';
        link.click();
      });
    }
  };

  const handleTextChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setTextSize(isNaN(newSize) ? 16 : newSize);
  };

  const handleImageWidthChange = (event) => {
    const newWidth = parseInt(event.target.value, 10);
    setImageWidth(isNaN(newWidth) ? 300 : newWidth);
  };

  const handleImageHeightChange = (event) => {
    const newHeight = parseInt(event.target.value, 10);
    setImageHeight(isNaN(newHeight) ? 100 : newHeight);
  };

  return (
    <div>
      <div>
        <label htmlFor="textContent">Text Content:</label>
        <input type="text" id="textContent" value={textContent} onChange={handleTextChange} />
      </div>

      <div>
        <label htmlFor="textColor">Text Color:</label>
        <input type="color" id="textColor" value={textColor} onChange={handleColorChange} />
      </div>

      <div>
        <label htmlFor="textSize">Text Size:</label>
        <input type="number" id="textSize" value={textSize} onChange={handleSizeChange} />
      </div>

      <div>
        <label htmlFor="imageWidth">Image Width:</label>
        <input type="number" id="imageWidth" value={imageWidth} onChange={handleImageWidthChange} />
      </div>

      <div>
        <label htmlFor="imageHeight">Image Height:</label>
        <input type="number" id="imageHeight" value={imageHeight} onChange={handleImageHeightChange} />
      </div>

      <div className='previewbox'>
        <div
          className='preview'
          ref={ref}
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
        >
          <p>{textContent}</p>
        </div>
      </div>

      <button onClick={clipboardHandler}>Copy to Clipboard</button>
      <button onClick={saveImageHandler}>Save Image</button>
    </div>
  );
};

export default App;
