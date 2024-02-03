import React from 'react'
import styled from 'styled-components';

  // Copyright연도 자동지정
const thisYear = new Date().getFullYear(); // 2023 (올해년도 출력)

export default function Footer() {
  
  return (
    <footer>
      <p>©Copyright {thisYear}. Text to Png Magician. All rights reserved.</p>
      <p>developer : SimSeHoon</p>
      <p>github : https://github.com/YoHaiYo</p>
      <p>email : 12si47bun@naver.com</p>
    </footer>
  )
}

