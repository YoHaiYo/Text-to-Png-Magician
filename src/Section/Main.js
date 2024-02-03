import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import * as clipboard from 'clipboard-polyfill';
import { ClipboardItem } from 'clipboard-polyfill';
import fontdata from '../Data/fontdata'
import colordata from '../Data/colordata';


const Main = () => {
  const [textContent, setTextContent] = useState("MyLogo");
  const [textColor, setTextColor] = useState("black");
  const [textSize, setTextSize] = useState(50);
  const [textFamily, setTextFamily] = useState('sans-serif');
  const [isCopy, setIsCopy] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // 흔들림 상태 관리


  const ref = useRef(null);

  // 다음변수들이 변경될 때마다 isCopy를 초기화하여 check 아이콘이 copy 아이콘으로 바뀜
  useEffect(() => {
    setIsCopy(false);
  }, [textContent, textColor, textSize, textFamily]);

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

   // 스타일 랜덤 적용 함수
   const applyRandomStyles = () => {
    const randomColor = colordata[Math.floor(Math.random() * colordata.length)].color;
    const randomSize = Math.floor(Math.random() * 96) + 25; // 25에서 120 사이의 크기 랜덤 선택
    const randomFontFamily = fontdata[Math.floor(Math.random() * fontdata.length)].fontfamily;

    setTextColor(randomColor);
    setTextSize(randomSize);
    setTextFamily(randomFontFamily);

     // 아이콘을 흔들도록 클래스 추가 및 제거
     setIsShaking(true);
     setTimeout(() => {
       setIsShaking(false);
     }, 1250); // 1초 후 흔들림 효과 제거
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
        link.download = `${textContent}.png`;
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
    // const newSize = parseInt(event.target.value, 10);
    setTextSize(event.target.value);
   
  };

  const handleFontChange = (family) => {
    setTextFamily(family);
  
  };

  return (
    <main className='d-lg-flex justify-content-center align-item-center mt-lg-5 mb-lg-5'>    
      <section>

        {/* text color btns */}
        <div className='d-lg-flex align-items-center'>
          <label className='mybasic myoption ' htmlFor="textColor">Color</label>
          <div>            
            {
              colordata.map((el,idx)=>{
                return(
                  <React.Fragment key={idx}>
                    <button className="mycolorbtn" style={{backgroundColor: `${el.color}`}} onClick={() => setTextColor(`${el.color}`)}/>
                  </React.Fragment>
                )
              })
            }
            <input className='' type="color" id="textColor" value={textColor} onChange={handleColorChange} />
          </div>
        </div>

        {/* test size btns */}
        <div className='d-lg-flex align-items-center '>
          <label className='mybasic myoption ' htmlFor="textSize">Size</label>
          <div>
            <button className={`mybasic mybtn__white`} 
            onClick={() => {setTextSize(25);}}>25px</button>
            <button className="mybasic mybtn__white " onClick={() => setTextSize(50)}>50px</button>
            <button className="mybasic mybtn__white " onClick={() => setTextSize(75)}>75px</button>
            <button className="mybasic mybtn__white " onClick={() => setTextSize(100)}>100px</button>
            <button className="mybasic mybtn__white " onClick={() => setTextSize(120)}>120px</button>
            <input type="number" id="textSize" value={textSize} onChange={handleSizeChange} />
            <span>px</span>
          </div>
        </div>

        {/* font family btns */}
        <div className='d-lg-flex align-items-center'>
          {/* `ssh 얘는 넣을게 많으니 배열로 빼서 map으로 처리하기 */}
          <div className='fontwrap'>
          <label className='mybasic myoption '>Font</label>      
            {
              fontdata.map((el, idx)=> {
                return (
                  <button key={idx} className={`mybasic__fontfamily mybtn__white`}
                    style={{fontFamily: el.fontfamily}}
                    onClick={() => handleFontChange(el.fontfamily)}
                  > {el.viewname} </button>
                )
              })
            }
          </div>
        </div>

        {/* magician btns */}
        <div className='d-lg-flex justify-content-end align-items-center'>
          <img className={`${isShaking ? 'opacity-100 magician_twinkle-down' : 'opacity-0'}`} src='./img/twinkle.png' style={{ width: 30}} // 클릭시 반짝 효과
          /> 
          <button className={`mybasic mybtn__puple text-white ${isShaking ? 'magician_shake' : ''}`} // 흔들림 클래스 추가
           onClick={() => applyRandomStyles()}>
          <img src='./img/Text_to_Png_Magician_icon.png' style={{ width: 30}}/>
          Style Magician          
          </button>
          <img className={`${isShaking ? 'opacity-100 magician_twinkle-up' : 'opacity-0'}`} src='./img/twinkle.png' style={{ width: 30}} // 클릭시 반짝 효과
          /> 
          
        </div>

       {/* input output box */}
        <div className='mt-4 d-lg-flex'>
          <div className='inputbox mx-1'>
            <label className='d-block' htmlFor="textContent"><span className='mytap'>Text</span></label>
              <input type="text" id="textContent" className='myboxsize' value={textContent} onChange={handleTextChange} />
          </div>
          <div className='outputbox mx-1'>
            <span className='mytap'>PNG</span>
            <div className='previewbox myboxsize d-flex justify-content-center align-items-center'>
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

        {/* copy buttons */}
        <div className='text-align-end d-lg-flex justify-content-center justify-content-lg-end mt-2'> 
          <button className='mybasic mybtn__red fw-bold' 
          onClick={()=>{
              clipboardHandler()
              setIsCopy(true)
            }}>
          Copy to PNG<i className={`mx-2 ${isCopy ? "bi bi-check-lg" : "bi bi-copy"}`}></i></button>
          
          <button className='mybasic mybtn__red fw-bold '  onClick={saveImageHandler}>
            Save to PNG<i className="bi bi-printer mx-2"></i></button>
        </div>
      </section>
    </main>
  );
};

export default Main;
