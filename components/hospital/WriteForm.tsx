import React from 'react';
import styled from '@emotion/styled'

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  border:1px solid red;
`;

const WriteForm = () => {
    return (
        <Form>
            <label>userID</label>
            <input type={"text"} />
            <label>병원이름</label>
            <input type={"text"}/>
            <label>병원주소</label>
            <input type={"text"}/>
            <label>진료과목</label>
            <select>
                <option>소아과</option>
            </select>
            <label>병원 연락처</label>
            <input type={"text"} />
            <label>
                업로드
            </label>
            <input />
        </Form>
    )
}

export default WriteForm
