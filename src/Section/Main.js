import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import * as clipboard from 'clipboard-polyfill';
import { ClipboardItem } from 'clipboard-polyfill';
// import { ColorButton } from '../Component/Button';

const Main = () => {
  const [textContent, setTextContent] = useState("MyLogo");
  const [textColor, setTextColor] = useState("black");
  const [textSize, setTextSize] = useState(50);
  const [textFamily, setTextFamily] = useState('sans-serif');

  const ref = useRef(null);

  const copyStyles = (source, target) => {
    Array.from(source.style).forEach((styleName) => {
      target.style[styleName] = source.style[styleName];
    });
  };

  const clipboardHandler = () => {
    if (ref.current) {
      const clipboardStyle = {
        border: 'none',
      };

      html2canvas(ref.current, {
        backgroundColor: 'transparent',
        logging: false,
        onclone: (document) => {
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
      const saveImageStyle = {
        border: 'none',
      };

      html2canvas(ref.current, {
        backgroundColor: 'transparent',
        logging: false,
        onclone: (document) => {
          const saveImageStyleScript = document.createElement('script');
          saveImageStyleScript.innerHTML = `
            document.querySelector('.preview').style.border = "${saveImageStyle.border}";
          `;
          document.head.appendChild(saveImageStyleScript);
        },
      }).then((canvas) => {
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

  const handleFontChange = (family) => {
    setTextFamily(family);
  };

  return (
    <main>    
      <section>
        <div>
          <label className='mybasic myoption' htmlFor="textColor">Text Color:</label>
          <button className="mycolorbtn" style={{backgroundColor: "#F01D1D"}} onClick={() => setTextColor('#F01D1D')}/>
          <button className="mycolorbtn" style={{backgroundColor: "#F09C1D"}} onClick={() => setTextColor('#F09C1D')}/>
          <button className="mycolorbtn" style={{backgroundColor: "#F0E81D"}} onClick={() => setTextColor('#F0E81D')}/>
          <button className="mycolorbtn" style={{backgroundColor: "#54F01D"}} onClick={() => setTextColor('#54F01D')}/>
          <button className="mycolorbtn" style={{backgroundColor: "#3B1DF0"}} onClick={() => setTextColor('#3B1DF0')}/>
          <input className='' type="color" id="textColor" value={textColor} onChange={handleColorChange} />
        </div>
        <div>
          <label className='mybasic myoption' htmlFor="textSize">Text Size:</label>
          <button className="mybasic mybtn__white " onClick={() => setTextSize(50)}>50px</button>
          <button className="mybasic mybtn__white " onClick={() => setTextSize(100)}>100px</button>
          <button className="mybasic mybtn__white " onClick={() => setTextSize(150)}>150px</button>
          <input type="number" id="textSize" value={textSize} onChange={handleSizeChange} />
          <span>px</span>
        </div>
        <div>
          <label className='mybasic myoption'>Font Family</label>
          <button
            className={`mybasic mybtn__white ${textFamily === 'sans-serif' ? 'selected' : ''}`}
            onClick={() => handleFontChange('sans-serif')}
          >
            Sans-serif
          </button>
          <button
            className={`mybasic mybtn__white ${textFamily === 'serif' ? 'selected' : ''}`}
            onClick={() => handleFontChange('serif')}
          >
            Serif
          </button>
          <button
            className={`mybasic mybtn__white ${textFamily === 'monospace' ? 'selected' : ''}`}
            onClick={() => handleFontChange('monospace')}
          >
            Monospace
          </button>
        </div>
        <div className='d-flex mx-3'>
          <div className='inputbox mx-1'>
            <label className='d-block' htmlFor="textContent"><span className='mytap'>Text</span></label>
            <input type="text" id="textContent" value={textContent} onChange={handleTextChange} />
          </div>
          <div className='outputbox mx-1'>
            <span className='mytap'>PNG</span>
            <div className='previewbox'>
              <div
                className='preview'
                ref={ref}
                style={{
                  color: textColor,
                  fontSize: `${textSize}px`,
                  fontFamily: textFamily,
                }}
              >
                <p>{textContent}</p>
              </div>
            </div>
          </div>
        </div>
        <button className='mybasic mybtn__red' onClick={clipboardHandler}>Copy PNG</button>
        <button className='mybasic mybtn__red'  onClick={saveImageHandler}>Save PNG</button>
      </section>
    </main>
  );
};

export default Main;
