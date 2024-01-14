// App.js
import React from 'react';
import styled from 'styled-components';


// 커스텀 버튼만들기
const CustomButton = styled.button`
// A||B : true면 A, false면 B 출력. B를 디폴트값으로 쓸때 유용
background-color: ${(props) => props.bg || "#E1F1FF"}; 
border: none;
border-radius: 10px;
font-size: 20px;
color: #000;
margin: .5rem;
padding: 5px;
width: 30px;
height: 30px;
box-shadow: 3px 5px 10px 0px rgba(0,0,0,0.75);
cursor: pointer;
`;

export const ColorButton = (props) => {
  return (
    <>
      <CustomButton bg={props.bg} >{props.children}</CustomButton>
    </>
  );
};

// 스타일드컴포넌트로 버튼 사용하니 COPY 오류 발생. 폐기하려다 color버튼으로 활용